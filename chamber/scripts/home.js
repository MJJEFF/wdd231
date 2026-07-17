// home.js
// Handles two dynamic pieces of the landing page:
//   1. Current weather + 3-day forecast for Asaba (OpenWeatherMap)
//   2. Random gold/silver member "spotlight" cards pulled from members.json

// ---------- WEATHER ----------
// Sign up for a free key at https://openweathermap.org/api and paste it below.
const WEATHER_API_KEY = "8c6f516b9675877c25a15a943b7f9a8f";
const LAT = 6.2059;
const LON = 6.7305;

async function getWeather() {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl),
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error("Weather fetch failed");
        }

        const current = await currentRes.json();
        const forecast = await forecastRes.json();

        displayCurrentWeather(current);
        displayForecast(forecast);
    } catch (err) {
        document.querySelector("#current-weather").innerHTML =
            "<p>Weather is unavailable right now.</p>";
        document.querySelector("#forecast").innerHTML = "";
        console.error("Weather error:", err);
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;

    document.querySelector("#current-weather").innerHTML = `
    <p class="temp">${temp}&deg;C</p>
    <p class="desc">${desc}</p>
  `;
}

function displayForecast(data) {
    // the free /forecast endpoint returns data in 3-hour chunks, so grab
    // one reading per day (the one closest to noon) for the next 3 days
    const daily = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
    const nextThree = daily.slice(0, 3);

    const forecastEl = document.querySelector("#forecast");
    forecastEl.innerHTML = "";

    nextThree.forEach((day) => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);

        const card = document.createElement("div");
        card.classList.add("forecast-day");
        card.innerHTML = `
      <p class="day-name">${dayName}</p>
      <p class="day-temp">${temp}&deg;C</p>
    `;
        forecastEl.appendChild(card);
    });
}

getWeather();

// ---------- MEMBER SPOTLIGHTS ----------
async function getSpotlightMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();

        // only gold (3) and silver (2) members qualify for a spotlight
        const eligible = data.members.filter((m) => m.level === 2 || m.level === 3);

        // shuffle then grab 3 (or fewer if there aren't that many eligible)
        const shuffled = eligible.sort(() => Math.random() - 0.5);
        const chosen = shuffled.slice(0, 3);

        displaySpotlights(chosen);
    } catch (err) {
        document.querySelector("#spotlights").innerHTML =
            "<p>Spotlights are unavailable right now.</p>";
        console.error("Problem loading spotlight members:", err);
    }
}

function tierLabel(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

function displaySpotlights(members) {
    const spotlightEl = document.querySelector("#spotlights");
    spotlightEl.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");
        card.innerHTML = `
      <span class="tier-badge tier-${member.level}">${tierLabel(member.level)}</span>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a class="visit" href="${member.url}" target="_blank" rel="noopener">Visit website →</a>
    `;
        spotlightEl.appendChild(card);
    });
}

getSpotlightMembers();

// ---------- SHARED HEADER / FOOTER BEHAVIOR ----------
const menuBtn = document.querySelector("#menu");
const nav = document.querySelector("#nav");
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Updated: ${document.lastModified}`;