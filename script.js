/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
    });
});


/* =========================
   DARK MODE
========================= */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("calipso-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

function updateThemeIcon() {
    themeToggle.textContent = document.body.classList.contains("dark")
        ? "☀"
        : "☾";
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("calipso-theme", theme);
    updateThemeIcon();
});


/* =========================
   LANGUAGE
========================= */

const languageToggle = document.getElementById("language-toggle");

let currentLanguage = localStorage.getItem("calipso-language") || "en";

function updateLanguage() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-en]").forEach(element => {
        element.textContent = element.dataset[currentLanguage];
    });

    languageToggle.textContent = currentLanguage === "en" ? "ES" : "EN";
}

updateLanguage();

languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "es" : "en";
    localStorage.setItem("calipso-language", currentLanguage);
    updateLanguage();
});


/* =========================
   GALLERIES
========================= */

const galleries = {
    property: [
        "images/hotel_01.jpg",
        "images/hotel_02.jpg",
        "images/hotel_03.jpg",
        "images/hotel_04.jpg",
        "images/hotel_05.jpg",
        "images/hotel_06.jpg",
        "images/hotel_07.jpg",
        "images/hotel_08.jpg",
        "images/hotel_09.jpg",
        "images/hotel_10.jpg",
        "images/hotel_11.jpg",
        "images/hotel_12.jpg",
        "images/hotel_13.jpg"
    ],

    rooms: [
        "images/room_a.jpg",
        "images/room_b.jpg",
        "images/room_c.jpg",
        "images/room_d.jpg",
        "images/room_e.jpg",
        "images/room_f.jpg",
        "images/room_g.jpg",
        "images/room_h.jpg"
    ],

    activities: [
        "images/surf01.jpg",
        "images/yoga01.jpg"
    ]
};


const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let currentGallery = [];
let currentIndex = 0;


function showImage(index) {
    currentIndex = index;

    lightboxImage.src = currentGallery[currentIndex];

    lightboxCounter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;
}


function openLightbox(galleryName, index) {
    currentGallery = galleries[galleryName];
    showImage(index);

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
        const galleryName = item.dataset.gallery;
        const index = Number(item.dataset.index);

        openLightbox(galleryName, index);
    });
});


lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", () => {
    const newIndex =
        (currentIndex - 1 + currentGallery.length) %
        currentGallery.length;

    showImage(newIndex);
});


lightboxNext.addEventListener("click", () => {
    const newIndex =
        (currentIndex + 1) %
        currentGallery.length;

    showImage(newIndex);
});


lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        lightboxPrev.click();
    }

    if (event.key === "ArrowRight") {
        lightboxNext.click();
    }
});


/* =========================
   TOUCH SWIPE
========================= */

let touchStartX = 0;

lightbox.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
});


lightbox.addEventListener("touchend", event => {

    const touchEndX = event.changedTouches[0].screenX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {
        lightboxNext.click();
    } else {
        lightboxPrev.click();
    }
});