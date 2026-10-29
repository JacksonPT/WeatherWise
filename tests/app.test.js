const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { URLSearchParams } = require("node:url");
const vm = require("node:vm");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

class MockElement {
  constructor(id = "") {
    this.id = id;
    this.hidden = false;
    this.disabled = false;
    this.checked = false;
    this.value = "";
    this._textContent = "";
    this.className = "";
    this.style = {};
    this.attributes = {};
    this.children = [];
    this.listeners = {};
  }

  get textContent() {
    return this._textContent;
  }

  set textContent(value) {
    this._textContent = value == null ? "" : String(value);
  }

  addEventListener(type, callback) {
    this.listeners[type] = callback;
  }

  dispatch(type, event = {}) {
    if (this.disabled) return;
    const handler = this.listeners[type];
    if (handler) handler({ preventDefault() {}, ...event });
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name] ?? null;
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  replaceChildren(...children) {
    this.children = children;
  }

  querySelector(selector) {
    if (selector === ".theme-icon") return this.themeIcon;
    return null;
  }
}

const elementIds = [
  "searchForm", "cityInput", "searchBtn", "geoBtn", "loader", "loaderText",
  "error", "errorMsg", "errorClose", "currentCard", "forecastCard", "favoritesCard",
  "forecastStatus", "favoriteStatus", "saveFavoriteBtn", "cityName", "cityDate",
  "tempValue", "unitLabel", "weatherIcon", "weatherDesc", "feelsLike", "humidity",
  "wind", "unitToggle", "themeToggle", "forecastList", "favList", "clearFavs",
];

function createStorage(seed = {}, unavailable = false) {
  const values = new Map(Object.entries(seed));
  return {
    values,
    getItem(key) {
      if (unavailable) throw new Error("Storage blocked");
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      if (unavailable) throw new Error("Storage blocked");
      values.set(key, String(value));
    },
  };
}

function createApp({ fetchImpl, storage, geolocation, demoMode = false } = {}) {
  const elements = Object.fromEntries(elementIds.map((id) => [id, new MockElement(id)]));
  for (const id of ["loader", "error", "currentCard", "forecastCard", "favoritesCard", "forecastStatus"]) {
    elements[id].hidden = true;
  }
  const themeIcon = new MockElement("theme-icon");
  elements.themeToggle.themeIcon = themeIcon;
  const rootAttributes = {};
  const document = {
    getElementById(id) {
      return elements[id];
    },
    createElement() {
      return new MockElement();
    },
    documentElement: {
      setAttribute(name, value) {
        rootAttributes[name] = value;
      },
    },
  };
  const requests = [];
  const context = {
    document,
    window: {
      CONFIG: { BASE_URL: "https://weather.example", API_KEY: "test-key" },
      WEATHERWISE_DEMO: demoMode,
    },
    navigator: geolocation === undefined ? {} : { geolocation },
    localStorage: storage || createStorage(),
    URLSearchParams,
    fetch: fetchImpl || (async (url) => {
      requests.push(url);
      return { ok: true, status: 200, json: async () => ({}) };
    }),
    __requests: requests,
    __rootAttributes: rootAttributes,
  };
  if (fetchImpl) {
    context.fetch = async (url) => {
      requests.push(url);
      return fetchImpl(url);
    };
  }
  vm.createContext(context);
  vm.runInContext(appSource, context, { filename: "app.js" });
  return { elements, context, requests, storage: context.localStorage, rootAttributes };
}

function weatherResponse() {
  return {
    name: "Paris",
    sys: { country: "FR" },
    dt: Date.UTC(2026, 0, 1, 12) / 1000,
    main: { temp: 10, feels_like: 9, humidity: 50 },
    wind: { speed: 5 },
    weather: [{ description: "clear sky", icon: "01d" }],
  };
}

function forecastEntry(utcHour, tempMax, tempMin, description, icon) {
  return {
    dt: Date.UTC(2026, 0, 1, utcHour) / 1000,
    main: { temp_max: tempMax, temp_min: tempMin },
    weather: [{ description, icon }],
  };
}

function forecastResponse() {
  return {
    city: { timezone: 3600 },
    list: [
      forecastEntry(3, 10, 1, "light rain", "10d"),
      forecastEntry(11, 18, -2, "few clouds", "02d"),
      forecastEntry(15, 14, 0, "overcast clouds", "04d"),
      {
        dt: Date.UTC(2026, 0, 1, 23) / 1000,
        main: { temp_max: 7, temp_min: 2 },
        weather: [{ description: "mist", icon: "50d" }],
      },
    ],
  };
}

function successfulFetch({ failForecast = false } = {}) {
  return async (url) => {
    if (url.includes("/forecast") && failForecast) {
      return { ok: false, status: 503, json: async () => ({}) };
    }
    const data = url.includes("/forecast") ? forecastResponse() : weatherResponse();
    return { ok: true, status: 200, json: async () => data };
  };
}

async function settle() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

test("empty city submission does not request weather", () => {
  const app = createApp();
  app.elements.searchForm.dispatch("submit");
  assert.equal(app.requests.length, 0);
  assert.equal(app.elements.currentCard.hidden, true);
});

test("demo starts with sample New York weather and search shows the API-key notice", () => {
  let locationRequests = 0;
  const app = createApp({
    demoMode: true,
    fetchImpl: successfulFetch(),
    storage: createStorage({ ww_favorites: JSON.stringify(["Boston"]) }),
    geolocation: { getCurrentPosition() { locationRequests += 1; } },
  });
  assert.equal(app.elements.currentCard.hidden, false);
  assert.equal(app.elements.cityName.textContent, "New York, US");
  assert.equal(app.elements.tempValue.textContent, "18");
  assert.equal(app.elements.forecastList.children.length, 5);
  assert.equal(app.requests.length, 0);

  app.elements.cityInput.value = "Chicago";
  app.elements.searchForm.dispatch("submit");
  assert.equal(app.elements.errorMsg.textContent, "API key required — this is only a demo.");
  assert.equal(app.elements.error.hidden, false);
  assert.equal(app.requests.length, 0);

  app.elements.geoBtn.dispatch("click");
  assert.equal(app.elements.errorMsg.textContent, "API key required — this is only a demo.");
  assert.equal(locationRequests, 0);

  app.elements.favList.children[0].children[0].dispatch("click");
  assert.equal(app.elements.errorMsg.textContent, "API key required — this is only a demo.");
  assert.equal(app.requests.length, 0);
});

test("city search shows loading, current conditions, and daily forecast", async () => {
  const app = createApp({ fetchImpl: successfulFetch() });
  app.elements.cityInput.value = " Paris ";
  app.elements.searchForm.dispatch("submit");
  assert.equal(app.elements.loader.hidden, false);
  await settle();

  assert.equal(app.requests.length, 2);
  assert.equal(app.elements.loader.hidden, true);
  assert.equal(app.elements.cityName.textContent, "Paris, FR");
  assert.equal(app.elements.tempValue.textContent, "10");
  assert.equal(app.elements.forecastList.children.length, 2);
  assert.equal(app.elements.forecastList.children[0].children[3].textContent, "High 18 °C / Low -2 °C");
  assert.equal(app.elements.forecastList.children[0].children[2].textContent, "few clouds");
});

test("forecast failure leaves current weather visible and announces retry", async () => {
  const app = createApp({ fetchImpl: successfulFetch({ failForecast: true }) });
  app.elements.cityInput.value = "Paris";
  app.elements.searchForm.dispatch("submit");
  await settle();

  assert.equal(app.elements.currentCard.hidden, false);
  assert.equal(app.elements.cityName.textContent, "Paris, FR");
  assert.equal(app.elements.forecastCard.hidden, true);
  assert.match(app.elements.forecastStatus.textContent, /unavailable/i);
  assert.equal(app.elements.error.hidden, true);
});

test("current-weather failure is actionable and always ends loading", async () => {
  const app = createApp({ fetchImpl: async (url) => {
    if (url.includes("/weather")) return { ok: false, status: 404, json: async () => ({}) };
    return { ok: true, status: 200, json: async () => forecastResponse() };
  } });
  app.elements.cityInput.value = "Atlantis";
  app.elements.searchForm.dispatch("submit");
  await settle();

  assert.match(app.elements.errorMsg.textContent, /Atlantis.*not found/i);
  assert.equal(app.elements.error.hidden, false);
  assert.equal(app.elements.loader.hidden, true);
});

test("unit changes rerender current and forecast values without another request", async () => {
  const app = createApp({ fetchImpl: successfulFetch() });
  app.elements.cityInput.value = "Paris";
  app.elements.searchForm.dispatch("submit");
  await settle();
  app.elements.unitToggle.checked = true;
  app.elements.unitToggle.dispatch("change");

  assert.equal(app.elements.tempValue.textContent, "50");
  assert.equal(app.elements.unitLabel.textContent, "°F");
  assert.equal(app.elements.forecastList.children[0].children[3].textContent, "High 64 °F / Low 28 °F");
  assert.equal(app.requests.length, 2);
  assert.equal(app.storage.values.get("ww_isMetric"), "false");
});

test("geolocation uses coordinates for a transient weather request", async () => {
  let success;
  const geolocation = { getCurrentPosition(callback) { success = callback; } };
  const app = createApp({ fetchImpl: successfulFetch(), geolocation });
  app.elements.geoBtn.dispatch("click");
  assert.equal(app.elements.loader.hidden, false);
  success({ coords: { latitude: 40.7, longitude: -74 } });
  await settle();

  assert.ok(app.requests.some((url) => url.includes("lat=40.7") && url.includes("lon=-74")));
  assert.equal(app.elements.cityName.textContent, "Paris, FR");
  assert.equal([...app.storage.values.values()].some((value) => /40\.7|-74/.test(value)), false);
});

test("denied geolocation ends loading and keeps city search available", () => {
  const geolocation = {
    getCurrentPosition(success, error) {
      error({ code: 1 });
    },
  };
  const app = createApp({ geolocation });
  app.elements.geoBtn.dispatch("click");
  assert.equal(app.elements.loader.hidden, true);
  assert.match(app.elements.errorMsg.textContent, /denied/i);
  assert.match(app.elements.errorMsg.textContent, /search by city/i);
  assert.equal(typeof app.elements.searchForm.listeners.submit, "function");
});

test("unsupported, unavailable, and timed-out geolocation fail gracefully", () => {
  const unsupported = createApp();
  unsupported.elements.geoBtn.dispatch("click");
  assert.match(unsupported.elements.errorMsg.textContent, /not supported/i);
  assert.equal(unsupported.elements.loader.hidden, true);

  for (const [code, expected] of [[2, /unavailable/i], [3, /timed out/i]]) {
    const app = createApp({
      geolocation: {
        getCurrentPosition(success, error) {
          error({ code });
        },
      },
    });
    app.elements.geoBtn.dispatch("click");
    assert.match(app.elements.errorMsg.textContent, expected);
    assert.equal(app.elements.loader.hidden, true);
  }
});

test("favorites are explicit, capped, persistent, and use separate view/remove controls", async () => {
  const app = createApp({ fetchImpl: successfulFetch() });
  app.elements.cityInput.value = "Paris";
  app.elements.searchForm.dispatch("submit");
  await settle();

  assert.equal(app.elements.favList.children.length, 0);
  app.elements.saveFavoriteBtn.dispatch("click");
  assert.equal(app.elements.favList.children.length, 1);
  assert.equal(app.elements.favList.children[0].children.length, 2);
  assert.equal(JSON.parse(app.storage.values.get("ww_favorites"))[0], "Paris, FR");

  for (const city of ["London, GB", "Tokyo, JP", "Rome, IT", "Oslo, NO"]) {
    app.context.addFavorite(city);
  }
  app.context.addFavorite("london, gb");
  assert.match(app.elements.favoriteStatus.textContent, /already saved/i);
  assert.equal(app.elements.favList.children.length, 5);
  app.context.addFavorite("Stockholm, SE");
  assert.equal(app.elements.favList.children.length, 5);
  assert.match(app.elements.favoriteStatus.textContent, /five locations/i);

  const requestCount = app.requests.length;
  app.elements.favList.children[0].children[0].dispatch("click");
  await settle();
  assert.equal(app.requests.length, requestCount + 2);

  app.elements.favList.children[0].children[1].dispatch("click");
  assert.equal(app.elements.favList.children.length, 4);
  assert.equal(JSON.parse(app.storage.values.get("ww_favorites")).includes("Paris, FR"), false);
});

test("malformed and unavailable storage do not prevent startup or theme changes", async () => {
  const malformed = createStorage({ ww_favorites: "not-json", ww_isDark: "invalid" });
  const app = createApp({ storage: malformed });
  assert.equal(app.elements.favList.children.length, 0);
  app.elements.themeToggle.dispatch("click");
  assert.equal(app.rootAttributes["data-theme"], "dark");
  assert.equal(app.elements.themeToggle.getAttribute("aria-pressed"), "true");
  assert.equal(malformed.values.get("ww_isDark"), "true");

  const blocked = createApp({ storage: createStorage({}, true), fetchImpl: successfulFetch() });
  assert.doesNotThrow(() => blocked.elements.themeToggle.dispatch("click"));
  assert.equal(blocked.rootAttributes["data-theme"], "dark");
  blocked.elements.cityInput.value = "Paris";
  blocked.elements.searchForm.dispatch("submit");
  await settle();
  assert.doesNotThrow(() => blocked.elements.saveFavoriteBtn.dispatch("click"));
  assert.equal(blocked.elements.favList.children.length, 1);
  assert.match(blocked.elements.favoriteStatus.textContent, /this session/i);
});

test("valid saved preferences and favorites are restored and bounded", () => {
  const storage = createStorage({
    ww_isDark: "true",
    ww_isMetric: "false",
    ww_favorites: JSON.stringify([" London ", "london", "Tokyo", "Rome", "Oslo", "Lima", "Paris"]),
  });
  const app = createApp({ storage });
  assert.equal(app.rootAttributes["data-theme"], "dark");
  assert.equal(app.elements.themeToggle.getAttribute("aria-pressed"), "true");
  assert.equal(app.elements.unitToggle.checked, true);
  assert.equal(app.elements.favList.children.length, 5);
  assert.equal(app.elements.favList.children[0].children[0].textContent, "London");
});

test("page markup and styles expose accessible status, focus, and responsive rules", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");
  assert.match(html, /id="forecastStatus" role="status" aria-live="polite"/);
  assert.match(html, /id="themeToggle"[^>]*aria-pressed="false"/);
  assert.match(html, /<ul class="fav-list" id="favList">/);
  assert.match(html, /window\.WEATHERWISE_DEMO = true/);
  assert.match(html, /sample New York weather/);
  assert.doesNotMatch(html, /src="config\.js"/);
  assert.doesNotMatch(appSource, /innerHTML/);
  assert.match(css, /\*:focus-visible\s*\{/);
  assert.match(css, /@media \(max-width: 480px\)/);
  assert.match(css, /--focus:\s*#93c5fd/);
});
