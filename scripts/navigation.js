const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menu.addEventListener("click", () => {

    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menu.innerHTML = "&times;";
    } else {
        menu.innerHTML = "&#9776;";
    }

});