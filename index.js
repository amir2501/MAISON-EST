/* =========================
   DOM REFERENCES
   ========================= */

const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");
const heroImage = document.getElementById("hero-image");
const sectionTitle = document.getElementById("section-title");
const productGrid = document.getElementById("product-grid");
const home = document.getElementById("home");

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

/* =========================
   DEVICE CHECK
   ========================= */

const isTouchDevice = window.matchMedia("(hover: none)").matches;

/* =========================
   HAMBURGER
   ========================= */

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open");
});

/* =========================
   IMAGE HELPERS
   ========================= */

function rangeImages(path, prefix, count) {
    return Array.from({length: count}, (_, i) => ({
        img: `${path}/${prefix}${i + 1}.png`,
        price: ""
    }));
}

/* =========================
   PAGE DATA
   ========================= */

const pages = {
    home: {
        title: "Designed for Quiet Confidence",
        subtitle: "Tailoring, refined.",
        hero: "./img/hero.png",
        section: "New Arrivals",
        products: [
            {
                img: "./img/org/suit.png",
                name: "Tailored Blazer",
                price: "$720"
            },
            {
                img: "./img/org/silkLight.png",
                name: "Silk Evening Dress",
                price: "$1,550"
            },
            {
                img: "./img/org/eveningLight.png",
                name: "Evening Dress",
                price: "$990"
            },
            {
                img: "./img/org/coat.png",
                name: "Structured Wool Coat",
                price: "$875"
            }
        ]
    },

    coats: {
        title: "Outerwear, Defined",
        subtitle: "Structure. Weight. Presence.",
        hero: "./img/coat/coatHero.png",
        section: "Coats",
        products: rangeImages("./img/coat", "coat", 10)
    },

    suits: {
        title: "Tailoring with Precision",
        subtitle: "Form, refined.",
        hero: "./img/suits/suitHero.png",
        section: "Suits",
        products: rangeImages("./img/suits", "suit", 10)
    },

    dresses: {
        title: "Evening, Reduced",
        subtitle: "Silhouette over excess.",
        hero: "./img/Dresses/dressHero.png",
        section: "Dresses",
        products: rangeImages("./img/Dresses", "dress", 10)
    },

    outfits: {
        title: "Complete Expression",
        subtitle: "Composed, not styled.",
        hero: "./img/outfits/outfitHero.png",
        section: "Outfits",
        products: rangeImages("./img/outfits", "outfit", 10)
    }
};

/* =========================
   RENDER
   ========================= */

function renderPage(key) {
    const data = pages[key] || pages.home;

    heroTitle.textContent = data.title;
    heroSubtitle.textContent = data.subtitle;
    heroImage.src = data.hero;
    sectionTitle.textContent = data.section;

    productGrid.innerHTML = "";

    data.products.forEach(p => {
        productGrid.innerHTML += `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name || ""}">

            ${p.name ? `<div class="name">${p.name}</div>` : ""}
            ${p.price ? `<span class="price">${p.price}</span>` : ""}
        </div>
    `;
    });

    observeProducts();
}

/* =========================
   NAVIGATION — DESKTOP
   ========================= */

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.dataset.page;
        history.pushState({page}, "", `/${page}`);
        renderPage(page);
    });
});

/* =========================
   NAVIGATION — MOBILE
   ========================= */

mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.dataset.page;
        history.pushState({page}, "", `/${page}`);
        renderPage(page);
        mobileMenu.classList.remove("open");
    });
});

/* =========================
   HOME (LOGO)
   ========================= */

home.addEventListener("click", e => {
    e.preventDefault();
    history.pushState({page: "home"}, "", `/`);
    renderPage("home");
});

/* =========================
   BACK / FORWARD
   ========================= */

window.addEventListener("popstate", e => {
    renderPage(e.state?.page || "home");
});

/* =========================
   INTERSECTION OBSERVER
   ========================= */

let observer;

function observeProducts() {
    if (!isTouchDevice) return;

    if (observer) observer.disconnect();

    const cards = document.querySelectorAll(".product-card");

    const options = {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.25, 0.5, 0.75]
    };

    observer = new IntersectionObserver(entries => {
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisible = entry.target;
            }
        });

        if (mostVisible) {
            cards.forEach(c => c.classList.remove("is-focused"));
            mostVisible.classList.add("is-focused");
        }
    }, options);

    cards.forEach(card => observer.observe(card));
}

/* =========================
   INIT
   ========================= */

const initialPage = location.pathname.replace("/", "") || "home";
renderPage(initialPage);