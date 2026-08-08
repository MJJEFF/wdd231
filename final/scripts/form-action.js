// form-action.js — read URL Search Params and display submitted form data
const params = new URLSearchParams(window.location.search);
const list = document.querySelector("#submissionList");

const fieldLabels = {
    name: "Name",
    email: "Email",
    goal: "Primary Goal",
    level: "Fitness Level",
    message: "Message",
};

if ([...params].length === 0) {
    list.innerHTML = `<li>No submission data found. Please fill out the <a href="contact.html">form</a> first.</li>`;
} else {
    list.innerHTML = [...params.entries()]
        .map(([key, value]) => {
            const label = fieldLabels[key] || key;
            return `<li><strong>${label}:</strong> ${value}</li>`;
        })
        .join("");
}