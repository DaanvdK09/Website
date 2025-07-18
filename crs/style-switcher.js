const styleSwitcherToggele = document.querySelector(".style-switcher-toggler");
styleSwitcherToggele.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
            localStorage.setItem("activeStyle", color); 
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-moon");
    dayNight.querySelector("i").classList.toggle("fa-sun");
    document.body.classList.toggle("light");
    updateLogo(); // Updates logo bases on the current mode
    updateHomepageImage(); // Updates homepage image based on the current mode
    
    if (document.body.classList.contains("light")) {
        localStorage.setItem("lightMode", "enabled");
    } else {
        localStorage.setItem("lightMode", "disabled");
    }
});

window.addEventListener("load", () => {
    const savedStyle = localStorage.getItem("activeStyle");
    if (savedStyle) {
        setActiveStyle(savedStyle);
    }

    const lightMode = localStorage.getItem("lightMode");
    const icon = dayNight.querySelector("i");
    if (lightMode === "enabled") {
        document.body.classList.add("light");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    } else {
        document.body.classList.remove("light");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
});