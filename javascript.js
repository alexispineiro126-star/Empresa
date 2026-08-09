const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("nav_list");

if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
        navList.classList.toggle("active");
        const expanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", String(!expanded));
    });
}