// hidden timestamp field - records the moment the form was loaded
document.querySelector("#timestamp").value = new Date().toISOString();

// modal open/close behavior
const triggers = document.querySelectorAll(".modal-trigger");
triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = document.querySelector(`#${btn.dataset.modal}`);
        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll(".modal-close");
closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});

// clicking outside the dialog box (on the backdrop) also closes it
document.querySelectorAll(".member-modal").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        const clickedInDialog =
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width;
        if (!clickedInDialog) {
            dialog.close();
        }
    });
});

// hamburger menu
const menuBtn = document.querySelector("#menu");
const nav = document.querySelector("#nav");
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// footer year / last modified
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Updated: ${document.lastModified}`;