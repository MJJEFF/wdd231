// thankyou.js
// Reads the form values passed via the GET query string and displays
// the required fields back to the applicant as a confirmation.

const params = new URLSearchParams(window.location.search);

const fieldsToShow = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Mobile Phone" },
    { key: "businessName", label: "Business/Organization Name" },
    { key: "timestamp", label: "Submitted On" },
];

const detailsEl = document.querySelector("#submission-details");

fieldsToShow.forEach((field) => {
    const value = params.get(field.key);
    if (value) {
        const dt = document.createElement("dt");
        dt.textContent = field.label;

        const dd = document.createElement("dd");
        // format the timestamp value into something readable
        if (field.key === "timestamp") {
            const parsed = new Date(value);
            dd.textContent = isNaN(parsed) ? value : parsed.toLocaleString();
        } else {
            dd.textContent = value;
        }

        detailsEl.appendChild(dt);
        detailsEl.appendChild(dd);
    }
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