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
let isMetric = JSON.parse(localStorage.getItem("ww_isMetric")) ?? true;
let favorites = JSON.parse(localStorage.getItem("ww_favorites")) || [];
let isDark = JSON.parse(localStorage.getItem("ww_isDark")) ?? false;

/* --- Theme init --- */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  unitToggle.checked = !isMetric; // UI shows °F when not metric
}

/* --- Unit helpers --- */
function formatTemp(celsius) {
  return isMetric ? Math.round(celsius) : Math.round(celsius * 1.8 + 32);
}
function formatUnitLabel() {
  return isMetric ? "°C" : "°F";
}

/* --- Loading / Error UI --- */
function showLoading(msg = "Loading weather…") {
  loader.style.display = "flex";
  loaderText.textContent = msg;
  hideError();
}
function hideLoading() {
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

/* --- Render current weather --- */
function renderCurrent(data) {
  const dt = new Date(data.dt * 1000);
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  cityDateEl.textContent = dt.toLocaleDateString(undefined, options);
  tempValueEl.textContent = formatTemp(data.main.temp);
  unitLabelEl.textContent = formatUnitLabel();
  weatherDescEl.textContent = data.weather[0].description;
  feelsLikeEl.textContent = `${formatTemp(data.main.feels_like)} ${formatUnitLabel()}`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${Math.round(data.wind.speed)} ${isMetric ? "m/s" : "mph"}`;

  const iconCode = data.weather[0].icon;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconEl.alt = data.weather[0].description;

  currentCard.hidden = false;
}

/* --- Render 5-day forecast --- */
function renderForecast(list) {
  forecastList.innerHTML = "";
  // One Call / 5-day returns 3-hourly entries; pick one per day (midday ~12:00)
  const daily = [];
  const seenDates = new Set();
  for (const entry of list) {
    const d = new Date(entry.dt * 1000);
    const dateKey = d.toDateString();
    if (seenDates.has(dateKey)) continue;
    seenDates.add(dateKey);
    daily.push(entry);
    if (daily.length === 5) break;
  }

  daily.forEach((entry) => {
    const d = new Date(entry.dt * 1000);
    const dayName = d.toLocaleDateString(undefined, { weekday: "short" });
    const high = formatTemp(entry.main.temp_max);
    const low = formatTemp(entry.main.temp_min);
    const icon = entry.weather[0].icon;

    const card = document.createElement("article");
    card.className = "forecast-day";
    card.innerHTML = `
      <div class="day">${dayName}</div>
      <img class="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${entry.weather[0].description}" width="48" height="48">
      <div class="temps"><span class="high">${high}</span><span class="low"> / ${low}</span></div>
    `;
    forecastList.appendChild(card);
  });

  forecastCard.hidden = false;
}

/* --- Render favorites --- */
function renderFavorites() {
  favList.innerHTML = "";
  if (favorites.length === 0) {
    favoritesCard.hidden = true;
    return;
  }
  favorites.forEach((city, index) => {
    const chip = document.createElement("button");
    chip.className = "fav-chip";
    chip.type = "button";
    chip.setAttribute("aria-label", `View weather for ${city}`);
    chip.innerHTML = `${city} <button class="remove" type="button" aria-label="Remove ${city}">×</button>`;
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      fetchWeather(city);
    });
    chip.querySelector(".remove").addEventListener("click", (e) => {
      e.stopPropagation();
      removeFavorite(city);
    });
    favList.appendChild(chip);
  });
  favoritesCard.hidden = false;
}

function addFavorite(city) {
  if (!favorites.includes(city) && favorites.length < 5) {
    favorites.push(city);
    saveFavorites();
  }
}

function removeFavorite(city) {
  favorites = favorites.filter((c) => c !== city);
  saveFavorites();
}

function saveFavorites() {
  localStorage.setItem("ww_favorites", JSON.stringify(favorites));
  renderFavorites();
}

/* --- API fetch --- */
async function fetchWeather(city) {
  showLoading(`Fetching weather for ${city}…`);
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${CONFIG.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=metric`),
      fetch(`${CONFIG.BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=metric`),
    ]);

    if (!currentRes.ok) {
      if (currentRes.status === 404) throw new Error(`"${city}" not found. Try another city.`);
      throw new Error("Weather service error. Please try again later.");
    }
    if (!forecastRes.ok) throw new Error("Unable to load forecast.");

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    hideError();
    renderCurrent(currentData);
    renderForecast(forecastData.list);
    addFavorite(currentData.name);
  } catch (err) {
    showError(err.message || "Something went wrong. Please try again.");
  } finally {
    hideLoading();
  }
}

/* --- Geolocation --- */
function useGeolocation() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }
  showLoading("Locating you…");
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const [currentRes, forecastRes] = await Promise.all([
          fetch(`${CONFIG.BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${CONFIG.API_KEY}&units=metric`),
          fetch(`${CONFIG.BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${CONFIG.API_KEY}&units=metric`),
        ]);
        if (!currentRes.ok) throw new Error("Unable to fetch weather for your location.");
        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();
        hideError();
        renderCurrent(currentData);
        renderForecast(forecastData.list);
        addFavorite(currentData.name);
      } catch (err) {
        showError(err.message);
      } finally {
        hideLoading();
      }
    },
    (err) => {
      hideLoading();
      let msg = "Location access denied.";
      if (err.code === err.POSITION_UNAVAILABLE) msg = "Location information is unavailable.";
      else if (err.code === err.TIMEOUT) msg = "Location request timed out.";
      showError(msg + " You can still search by city name.");
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
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

unitToggle.addEventListener("change", () => {
  isMetric = !unitToggle.checked;
  localStorage.setItem("ww_isMetric", JSON.stringify(isMetric));
  unitLabelEl.textContent = formatUnitLabel();
  feelsLikeEl.textContent = `${formatTemp(parseFloat(feelsLikeEl.textContent))} ${formatUnitLabel()}`;
  // Re-render temps in current card
  const rawC = isMetric
    ? (parseFloat(tempValueEl.textContent) - 32) / 1.8
    : parseFloat(tempValueEl.textContent);
  tempValueEl.textContent = formatTemp(rawC);
  windEl.textContent = `${Math.round(isMetric ? parseFloat(windEl.textContent) : parseFloat(windEl.textContent) * 0.44704)} ${isMetric ? "m/s" : "mph"}`;
});

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("ww_isDark", JSON.stringify(isDark));
  applyTheme();
});

clearFavs.addEventListener("click", () => {
  favorites = [];
  saveFavorites();
});

errorClose.addEventListener("click", hideError);

/* --- Boot --- */
applyTheme();
renderFavorites();

// Optional: seed a default city on first load
if (!localStorage.getItem("ww_seeded")) {
  localStorage.setItem("ww_seeded", "true");
  // Uncomment to auto-load a default city:
  // fetchWeather(CONFIG.DEFAULT_CITY);
}
