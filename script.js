```javascript
// MOBILE MENU

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav?.classList.remove("open");
    });
});


// DARK MODE

const themeToggle = document.querySelector("#theme-toggle");

if (themeToggle) {
    const savedTheme = localStorage.getItem("calipso-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        localStorage.setItem(
            "calipso-theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
    });
}


// LANGUAGE TOGGLE

const languageToggle = document.querySelector("#language-toggle");

if (languageToggle) {
    const savedLanguage = localStorage.getItem("calipso-language") || "en";

    function setLanguage(language) {
        document.querySelectorAll("[data-en]").forEach(element => {
            if (language === "en") {
                element.textContent = element.dataset.en;
            } else if (element.dataset.es) {
                element.textContent = element.dataset.es;
            }
        });

        languageToggle.textContent = language === "en" ? "ES" : "EN";
        localStorage.setItem("calipso-language", language);
    }

    languageToggle.addEventListener("click", () => {
        const currentLanguage =
            localStorage.getItem("calipso-language") || "en";

        setLanguage(currentLanguage === "en" ? "es" : "en");
    });

    setLanguage(savedLanguage);
}


// OCTORATE BOOKING BUTTONS

document.querySelectorAll(".booking-trigger").forEach(button => {
    button.addEventListener("click", () => {
        const bookingSection = document.querySelector("#octorate-booking");

        if (bookingSection) {
            bookingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// GALLERIES

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


// LIGHTBOX

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-content img");
const lightboxCounter = document.querySelector(".lightbox-counter");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentGallery = null;
let currentIndex = 0;

function openLightbox(galleryName, index) {
    if (!lightbox || !lightboxImage || !galleries[galleryName]) {
        return;
    }

    currentGallery = galleryName;
    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function updateLightbox() {
    const images = galleries[currentGallery];

    if (!images) {
        return;
    }

    lightboxImage.src = images[currentIndex];

    if (lightboxCounter) {
        lightboxCounter.textContent =
            `${currentIndex + 1} / ${images.length}`;
    }
}

function closeLightbox() {
    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function showPrevious() {
    if (!currentGallery) {
        return;
    }

    const images = galleries[currentGallery];

    currentIndex =
        (currentIndex - 1 + images.length) % images.length;

    updateLightbox();
}

function showNext() {
    if (!currentGallery) {
        return;
    }

    const images = galleries[currentGallery];

    currentIndex =
        (currentIndex + 1) % images.length;

    updateLightbox();
}


// GALLERY THUMBNAILS

document.querySelectorAll("[data-gallery]").forEach(item => {
    item.addEventListener("click", () => {
        const galleryName = item.dataset.gallery;
        const index = Number(item.dataset.index) || 0;

        openLightbox(galleryName, index);
    });
});


// VIEW FULL GALLERY LINKS

document.querySelectorAll(".gallery-view-link").forEach(link => {
    link.addEventListener("click", () => {
        const galleryName = link.dataset.gallery;

        if (galleryName && galleries[galleryName]) {
            openLightbox(galleryName, 0);
        }
    });
});


// LIGHTBOX CONTROLS

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", showPrevious);
lightboxNext?.addEventListener("click", showNext);

lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


// KEYBOARD CONTROLS

document.addEventListener("keydown", event => {
    if (!lightbox?.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }

    if (event.key === "ArrowRight") {
        showNext();
    }
});


// TOUCH SWIPE

let touchStartX = 0;
let touchEndX = 0;

lightbox?.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
});

lightbox?.addEventListener("touchend", event => {
    touchEndX = event.changedTouches[0].screenX;

    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance > 0) {
        showPrevious();
    } else {
        showNext();
    }
});
```
