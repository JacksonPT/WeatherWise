// ============================================================
// WeatherWise — Configuration
// ============================================================
// OpenWeatherMap API key.
// Get a free key at: https://home.openweathermap.org/api_keys
//
// NOTE: For this student/scrum project the key lives here for
// convenience. In a production app, never commit real API keys
// to a public repo — use environment variables and a backend proxy.
const CONFIG = {
  API_KEY: "YOUR_OPENWEATHERMAP_API_KEY_HERE",
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  UNITS: "metric", // metric | imperial
  DEFAULT_CITY: "New York",
};

window.CONFIG = CONFIG;
