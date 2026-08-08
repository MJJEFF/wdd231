// workouts.js — data fetching, dynamic rendering, filtering, modal, favorites
import { toggleFavorite, isFavorite } from "./storage.js";

const grid = document.querySelector("#exerciseGrid");
const filterBar = document.querySelector("#filterBar");
const modal = document.querySelector("#exerciseModal");
const modalBody = document.querySelector("#modalBody");
const modalClose = document.querySelector("#modalClose");
const statusEl = document.querySelector("#loadStatus");

let exercises = [];
let activeFilter = "All";

async function loadExercises() {
    try {
        const response = await fetch("data/exercises.json");
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();
        exercises = data;
        buildFilters(exercises);
        renderExercises(exercises);
        statusEl.textContent = `${exercises.length} exercises loaded.`;
    } catch (error) {
        console.error("Failed to load exercise data:", error);
        statusEl.textContent =
            "Sorry — we couldn't load the exercise library right now. Please refresh the page.";
    }
}

function buildFilters(items) {
    const categories = ["All", ...new Set(items.map((item) => item.category))];

    filterBar.innerHTML = categories
        .map(
            (cat) => `
      <button type="button" data-filter="${cat}" aria-pressed="${cat === "All"}">
        ${cat}
      </button>`
        )
        .join("");

    filterBar.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            activeFilter = btn.dataset.filter;
            filterBar
                .querySelectorAll("button")
                .forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
            const filtered =
                activeFilter === "All"
                    ? exercises
                    : exercises.filter((ex) => ex.category === activeFilter);
            renderExercises(filtered);
        });
    });
}

function renderExercises(items) {
    grid.innerHTML = items
        .map((ex) => {
            const favActive = isFavorite(ex.id) ? "★" : "☆";
            return `
      <div class="exercise-card-wrap" style="position:relative;">
        <button type="button" class="exercise-card" data-id="${ex.id}">
          <span class="tag">${ex.category}</span>
          <h3>${ex.name}</h3>
          <p class="meta">${ex.difficulty} · ${ex.equipment}</p>
        </button>
        <button type="button" class="fav" data-fav="${ex.id}" style="position:absolute; top:1rem; right:1rem;" aria-label="Toggle favorite for ${ex.name}">${favActive}</button>
      </div>`;
        })
        .join("");

    grid.querySelectorAll(".exercise-card").forEach((card) => {
        card.addEventListener("click", () => openModal(Number(card.dataset.id)));
    });

    grid.querySelectorAll("[data-fav]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = Number(btn.dataset.fav);
            toggleFavorite(id);
            btn.textContent = isFavorite(id) ? "★" : "☆";
        });
    });
}

function openModal(id) {
    const ex = exercises.find((item) => item.id === id);
    if (!ex) return;

    modalBody.innerHTML = `
    <span class="tag">${ex.category}</span>
    <h2>${ex.name}</h2>
    <p class="meta">${ex.difficulty} &middot; Equipment: ${ex.equipment}</p>
    <p>${ex.description}</p>
  `;
    modal.showModal();
}

modalClose.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
});

loadExercises();