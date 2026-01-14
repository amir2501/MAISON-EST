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
                price: "2 000 000 UZS"
            },
            {
                img: "./img/org/silkLight.png",
                name: "Silk Evening Dress",
                price: "850 000 UZS"
            },
            {
                img: "./img/org/eveningLight.png",
                name: "Evening Dress",
                price: "900 000 UZS"
            },
            {
                img: "./img/org/coat.png",
                name: "Structured Wool Coat",
                price: "3 000 000 UZS"
            }
        ]
    },

    coats: {
        title: "Outerwear, Defined",
        subtitle: "Structure. Weight. Presence.",
        hero: "./img/coat/coatHero.png",
        section: "Coats",
        products: [
            {
                img: "./img/coat/coat1.png",
                name: "Ivory Tailored Coat",
                price: "2 000 000 UZS"
            },
            {
                img: "./img/coat/coat3.png",
                name: "Midnight Wool Coat",
                price: "2 100 000 UZS"
            },
            {
                img: "./img/coat/coat6.png",
                name: "Pearl Lightweight Coat",
                price: "1 500 000 UZS"
            },
            {
                img: "./img/coat/coat8.png",
                name: "Architectural Wool Overcoat",
                price: "3 000 000 UZS"
            }
        ]
    },

    suits: {
        title: "Tailoring with Precision",
        subtitle: "Form, refined.",
        hero: "./img/suits/suitHero.png",
        section: "Suits",
        products: [
            {
                img: "./img/suits/suit1.png",
                name: "Ivory Tailored Suit",
                price: "2 000 000 UZS"
            },
            {
                img: "./img/suits/suit2.png",
                name: "Midnight single-breasted Statement Suit",
                price: "2 100 000 UZS"
            },
            {
                img: "./img/suits/suit9.png",
                name: "Pearl double-breasted Structured Suit",
                price: "1 500 000 UZS"
            }
        ]
    },

    dresses: {
        title: "Evening, Reduced",
        subtitle: "Silhouette over excess.",
        hero: "./img/Dresses/dressHero.png",
        section: "Dresses",
        products: [
            {
                img: "./img/Dresses/dress1.png",
                name: "Ivory Minimal Dress",
                price: "800 000 UZS"
            },
            {
                img: "./img/Dresses/dress2.png",
                name: "Midnight Evening Dress",
                price: "900 000 UZS"
            },
            {
                img: "./img/Dresses/dress5.png",
                name: "Soft Grey Day Dress",
                price: "700 000 UZS"
            }
        ]
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

    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");

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
