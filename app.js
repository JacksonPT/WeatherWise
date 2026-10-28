// ============================================================
// WeatherWise — Application Logic
// Sprint 1: current weather + unit toggle + errors + loading
// Sprint 2: 5-day forecast + geolocation + favorites + dark mode
// ============================================================

/* --- DOM elements --- */
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");

const loader = document.getElementById("loader");
const loaderText = document.getElementById("loaderText");
const errorEl = document.getElementById("error");
const errorMsg = document.getElementById("errorMsg");
const errorClose = document.getElementById("errorClose");

const currentCard = document.getElementById("currentCard");
const forecastCard = document.getElementById("forecastCard");
const favoritesCard = document.getElementById("favoritesCard");
const forecastStatus = document.getElementById("forecastStatus");
const favoriteStatus = document.getElementById("favoriteStatus");
const saveFavoriteBtn = document.getElementById("saveFavoriteBtn");

const cityNameEl = document.getElementById("cityName");
const cityDateEl = document.getElementById("cityDate");
const tempValueEl = document.getElementById("tempValue");
const unitLabelEl = document.getElementById("unitLabel");
const weatherIconEl = document.getElementById("weatherIcon");
const weatherDescEl = document.getElementById("weatherDesc");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

const unitToggle = document.getElementById("unitToggle");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

const forecastList = document.getElementById("forecastList");
const favList = document.getElementById("favList");
const clearFavs = document.getElementById("clearFavs");

/* --- State --- */
function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function readStoredBoolean(key, fallback) {
  try {
    const value = JSON.parse(readStorage(key));
    return typeof value === "boolean" ? value : fallback;
  } catch {
    return fallback;
  }
}

function readStoredFavorites() {
  try {
    const value = JSON.parse(readStorage("ww_favorites"));
    if (!Array.isArray(value)) return [];
    const seen = new Set();
    return value
      .filter((city) => typeof city === "string")
      .map((city) => city.trim())
      .filter((city) => {
        const normalized = city.toLocaleLowerCase();
        if (!city || seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      })
      .slice(0, 5);
  } catch {
    return [];
  }
}

let isMetric = readStoredBoolean("ww_isMetric", true);
let favorites = readStoredFavorites();
let isDark = readStoredBoolean("ww_isDark", false);
let currentWeatherData = null;
let forecastEntries = [];
let forecastTimezoneOffset = 0;

/* --- Theme init --- */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  unitToggle.checked = !isMetric; // UI shows °F when not metric
}

/* --- Unit helpers --- */
function formatTemp(celsius) {
  return isMetric ? Math.round(celsius) : Math.round(celsius * 1.8 + 32);
}
function formatUnitLabel() {
  return isMetric ? "°C" : "°F";
}

function formatWind(metersPerSecond) {
  const speed = isMetric ? metersPerSecond : metersPerSecond * 2.23694;
  return `${Math.round(speed)} ${isMetric ? "m/s" : "mph"}`;
}

/* --- Loading / Error UI --- */
function showLoading(msg = "Loading weather…") {
  loader.hidden = false;
  loader.style.display = "flex";
  loaderText.textContent = msg;
  hideError();
  hideForecastStatus();
}
function hideLoading() {
  loader.hidden = true;
  loader.style.display = "none";
}
function showError(msg) {
  hideLoading();
  errorMsg.textContent = msg;
  errorEl.hidden = false;
  errorEl.style.display = "block";
}
function hideError() {
  errorEl.hidden = true;
  errorEl.style.display = "none";
}

function showForecastStatus(message) {
  forecastStatus.textContent = message;
  forecastStatus.hidden = false;
}

function hideForecastStatus() {
  forecastStatus.textContent = "";
  forecastStatus.hidden = true;
}

function showFavoriteStatus(message) {
  favoriteStatus.textContent = message;
}

/* --- Render current weather --- */
function renderCurrent(data) {
  currentWeatherData = data;
  const dt = new Date(data.dt * 1000);
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  cityDateEl.textContent = dt.toLocaleDateString(undefined, options);
  tempValueEl.textContent = formatTemp(data.main.temp);
  unitLabelEl.textContent = formatUnitLabel();
  weatherDescEl.textContent = data.weather[0].description;
  feelsLikeEl.textContent = `${formatTemp(data.main.feels_like)} ${formatUnitLabel()}`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = formatWind(data.wind.speed);

  const iconCode = data.weather[0].icon;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${encodeURIComponent(iconCode)}@2x.png`;
  weatherIconEl.alt = data.weather[0].description;

  currentCard.hidden = false;
  updateSaveFavoriteButton();
}

/* --- Render 5-day forecast --- */
function renderForecast(list, timezoneOffset = 0) {
  forecastEntries = Array.isArray(list) ? list : [];
  forecastTimezoneOffset = Number(timezoneOffset) || 0;
  forecastList.replaceChildren();

  const grouped = new Map();
  for (const entry of forecastEntries) {
    if (!entry?.main || !Number.isFinite(entry.dt)) continue;
    const localDate = new Date((entry.dt + forecastTimezoneOffset) * 1000);
    const dateKey = localDate.toISOString().slice(0, 10);
    const localHour = localDate.getUTCHours();
    const condition = entry.weather?.[0] || {};
    const group = grouped.get(dateKey);

    if (!group) {
      grouped.set(dateKey, {
        dateKey,
        high: entry.main.temp_max,
        low: entry.main.temp_min,
        representative: entry,
        middayDistance: Math.abs(localHour - 12),
      });
      continue;
    }

    group.high = Math.max(group.high, entry.main.temp_max);
    group.low = Math.min(group.low, entry.main.temp_min);
    const distance = Math.abs(localHour - 12);
    if (distance < group.middayDistance) {
      group.representative = entry;
      group.middayDistance = distance;
    }
    // Keep the group shape stable even when a provider omits an optional condition.
    if (!condition.description && !group.representative.weather?.[0]?.description) {
      group.representative = entry;
    }
  }

  const daily = [...grouped.values()].slice(0, 5);
  if (daily.length === 0) {
    forecastCard.hidden = true;
    showForecastStatus("Forecast data is currently unavailable. Submit the search again to retry.");
    return;
  }

  for (const day of daily) {
    const date = new Date(`${day.dateKey}T12:00:00Z`);
    const condition = day.representative.weather?.[0] || {};
    const card = document.createElement("article");
    card.className = "forecast-day";

    const dateLabel = document.createElement("div");
    dateLabel.className = "day";
    dateLabel.textContent = date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    card.appendChild(dateLabel);

    if (condition.icon) {
      const icon = document.createElement("img");
      icon.className = "icon";
      icon.src = `https://openweathermap.org/img/wn/${encodeURIComponent(condition.icon)}@2x.png`;
      icon.alt = condition.description || "Weather condition";
      icon.width = 48;
      icon.height = 48;
      card.appendChild(icon);
    }

    const description = document.createElement("p");
    description.className = "forecast-description";
    description.textContent = condition.description || "Conditions unavailable";
    card.appendChild(description);

    const temperatures = document.createElement("p");
    temperatures.className = "temps";
    temperatures.textContent = `High ${formatTemp(day.high)} ${formatUnitLabel()} / Low ${formatTemp(day.low)} ${formatUnitLabel()}`;
    card.appendChild(temperatures);
    forecastList.appendChild(card);
  }

  hideForecastStatus();
  forecastCard.hidden = false;
}

/* --- Render favorites --- */
function renderFavorites() {
  favList.replaceChildren();
  if (favorites.length === 0) {
    favoritesCard.hidden = true;
    updateSaveFavoriteButton();
    return;
  }
  favorites.forEach((city) => {
    const item = document.createElement("li");
    item.className = "favorite-item";

    const viewButton = document.createElement("button");
    viewButton.className = "fav-chip";
    viewButton.type = "button";
    viewButton.textContent = city;
    viewButton.setAttribute("aria-label", `View weather for ${city}`);
    viewButton.addEventListener("click", () => fetchWeather(city));

    const removeButton = document.createElement("button");
    removeButton.className = "remove-favorite";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${city} from saved locations`);
    removeButton.addEventListener("click", () => removeFavorite(city));

    item.appendChild(viewButton);
    item.appendChild(removeButton);
    favList.appendChild(item);
  });
  favoritesCard.hidden = false;
  updateSaveFavoriteButton();
}

function addFavorite(city) {
  const normalized = city.toLocaleLowerCase();
  if (favorites.some((favorite) => favorite.toLocaleLowerCase() === normalized)) {
    showFavoriteStatus(`${city} is already saved.`);
    return false;
  }
  if (favorites.length >= 5) {
    showFavoriteStatus("You can save up to five locations. Remove one before adding another.");
    return false;
  }
  favorites.push(city);
  const persisted = saveFavorites();
  showFavoriteStatus(persisted ? `${city} saved.` : `${city} saved for this session; browser storage is unavailable.`);
  return true;
}

function removeFavorite(city) {
  favorites = favorites.filter((c) => c !== city);
  saveFavorites();
  showFavoriteStatus(`${city} removed from saved locations.`);
}

function saveFavorites() {
  const persisted = writeStorage("ww_favorites", JSON.stringify(favorites));
  renderFavorites();
  return persisted;
}

function updateSaveFavoriteButton() {
  if (!saveFavoriteBtn) return;
  const city = currentWeatherData ? `${currentWeatherData.name}, ${currentWeatherData.sys.country}` : "";
  const alreadySaved = favorites.some((favorite) => favorite.toLocaleLowerCase() === city.toLocaleLowerCase());
  saveFavoriteBtn.disabled = !city || alreadySaved || favorites.length >= 5;
  saveFavoriteBtn.textContent = alreadySaved ? "Location saved" : "Save location";
  if (city && favorites.length >= 5 && !alreadySaved) {
    saveFavoriteBtn.disabled = false;
    saveFavoriteBtn.setAttribute("aria-label", "Save location; five-location limit reached");
  } else {
    saveFavoriteBtn.setAttribute("aria-label", alreadySaved ? `${city} is saved` : "Save the displayed location");
  }
}

/* --- API fetch --- */
class UserFacingWeatherError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserFacingWeatherError";
  }
}

function getConfig() {
  const config = window.CONFIG;
  if (!config || !config.BASE_URL || !config.API_KEY || config.API_KEY === "YOUR_OPENWEATHERMAP_API_KEY_HERE") {
    throw new UserFacingWeatherError(
      "Weather API key is not configured. Copy .env.example to .env, add your key, and run the config generator."
    );
  }
  return config;
}

async function requestWeatherJson(url, city, isCurrentWeather) {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new UserFacingWeatherError(
      "Unable to reach the weather service. Check your connection and try again."
    );
  }

  if (!response.ok) {
    if (isCurrentWeather && response.status === 404) {
      throw new UserFacingWeatherError(`"${city}" not found. Try another city.`);
    }
    if (response.status === 401) {
      throw new UserFacingWeatherError(
        "The weather API key is invalid or not active yet. Check .env, regenerate config.js, and try again."
      );
    }
    throw new UserFacingWeatherError("The weather service is unavailable. Please try again later.");
  }

  try {
    return await response.json();
  } catch {
    throw new UserFacingWeatherError("The weather service returned an invalid response. Please try again.");
  }
}

async function fetchWeatherData(query, city) {
  const config = getConfig();
  const params = new URLSearchParams({
    ...query,
    appid: config.API_KEY,
    units: "metric",
  });
  const [currentResult, forecastResult] = await Promise.allSettled([
    requestWeatherJson(`${config.BASE_URL}/weather?${params}`, city, true),
    requestWeatherJson(`${config.BASE_URL}/forecast?${params}`, city, false),
  ]);
  if (currentResult.status === "rejected") throw currentResult.reason;
  return {
    currentData: currentResult.value,
    forecastData: forecastResult.status === "fulfilled" ? forecastResult.value : null,
  };
}

function renderWeatherResults(currentData, forecastData) {
  hideError();
  renderCurrent(currentData);
  renderForecast(forecastData?.list, forecastData?.city?.timezone || 0);
}

async function fetchWeatherForQuery(query, label) {
  showLoading(`Fetching weather for ${label}…`);
  try {
    const { currentData, forecastData } = await fetchWeatherData(query, label);
    renderWeatherResults(currentData, forecastData);
  } catch (err) {
    const message = err instanceof UserFacingWeatherError
      ? err.message
      : "Unable to load weather right now. Please try again.";
    showError(message);
  } finally {
    hideLoading();
  }
}

function fetchWeather(city) {
  return fetchWeatherForQuery({ q: city }, city);
}

/* --- Geolocation --- */
function useGeolocation() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }
  showLoading("Locating you…");
  try {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherForQuery(
          { lat: String(latitude), lon: String(longitude) },
          "your location"
        );
      },
      (err) => {
        hideLoading();
        const messages = {
          1: "Location access was denied.",
          2: "Your location is unavailable.",
          3: "The location request timed out.",
        };
        showError(`${messages[err.code] || "Unable to determine your location."} You can still search by city name.`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } catch {
    hideLoading();
    showError("Unable to request your location. You can still search by city name.");
  }
}

/* --- Event listeners --- */
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(city);
  cityInput.value = "";
});

geoBtn.addEventListener("click", useGeolocation);

saveFavoriteBtn.addEventListener("click", () => {
  if (!currentWeatherData) return;
  addFavorite(`${currentWeatherData.name}, ${currentWeatherData.sys.country}`);
});

unitToggle.addEventListener("change", () => {
  isMetric = !unitToggle.checked;
  writeStorage("ww_isMetric", JSON.stringify(isMetric));
  if (currentWeatherData) renderCurrent(currentWeatherData);
  if (forecastEntries.length > 0) renderForecast(forecastEntries, forecastTimezoneOffset);
});

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  writeStorage("ww_isDark", JSON.stringify(isDark));
  applyTheme();
});

clearFavs.addEventListener("click", () => {
  favorites = [];
  saveFavorites();
  showFavoriteStatus("All saved locations removed.");
});

errorClose.addEventListener("click", hideError);

/* --- Boot --- */
applyTheme();
renderFavorites();
hideForecastStatus();
updateSaveFavoriteButton();
