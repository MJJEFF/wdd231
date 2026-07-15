// directory.js
// Pulls member info from members.json and renders it as either
// a grid of cards or a single-column list, depending on what the user picks.

const directoryEl = document.querySelector("#directory");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (err) {
        directoryEl.innerHTML = `<p>Sorry, the member directory couldn't be loaded right now.</p>`;
        console.error("Problem fetching members.json:", err);
    }
}

function tierLabel(level) {
    // membership levels: 1 = member, 2 = silver, 3 = gold
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

function displayMembers(members) {
    directoryEl.innerHTML = "";
    const countEl = document.querySelector("#member-count");
    if (countEl) {
        countEl.textContent = `${members.length} member businesses`;
    }

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
      <span class="tier-badge tier-${member.level}">${tierLabel(member.level)}</span>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.tagline}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a class="visit" href="${member.url}" target="_blank" rel="noopener">Visit website →</a>
    `;

        directoryEl.appendChild(card);
    });
}

// grid / list toggle
gridBtn.addEventListener("click", () => {
    directoryEl.classList.remove("list");
    directoryEl.classList.add("grid");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    directoryEl.classList.remove("grid");
    directoryEl.classList.add("list");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

getMembers();

// hamburger menu toggle (mirrors navigation.js on the home page)
const menuBtn = document.querySelector("#menu");
const nav = document.querySelector("#nav");
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// footer: current year + last modified date
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Updated: ${document.lastModified}`;