// discover.js (ES module)
import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");

function buildCards(items) {
    items.forEach((item) => {
        const card = document.createElement("section");
        card.classList.add("discover-card");
        card.style.gridArea = `a${item.id}`;

        card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="learn-more" type="button">Learn More</button>
    `;

        discoverGrid.appendChild(card);
    });
}

buildCards(discoverItems);

// simple "learn more" interaction - expands/collapses the description
discoverGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("learn-more")) {
        const card = e.target.closest(".discover-card");
        card.classList.toggle("expanded");
        e.target.textContent = card.classList.contains("expanded") ? "Show Less" : "Learn More";
    }
});

// ---------- last visit message (localStorage) ----------
const messageEl = document.querySelector("#visit-message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysBetween < 1) {
        messageEl.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        messageEl.textContent = "You last visited 1 day ago.";
    } else {
        messageEl.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);

// ---------- shared header/footer behavior ----------
const menuBtn = document.querySelector("#menu");
const nav = document.querySelector("#nav");
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Updated: ${document.lastModified}`;