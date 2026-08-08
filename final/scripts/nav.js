// nav.js — responsive hamburger navigation
export function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector("#primary-nav");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // close menu when a link is chosen (mobile)
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}