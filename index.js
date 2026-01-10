const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");
const heroImage = document.getElementById("hero-image");
const sectionTitle = document.getElementById("section-title");
const productGrid = document.getElementById("product-grid");
const home = document.getElementById("home");

/* =========================
   IMAGE HELPERS
   ========================= */

function rangeImages(path, prefix, count) {
    return Array.from({ length: count }, (_, i) => ({
        img: `${path}/${prefix}${i + 1}.png`,
        name: prefix.replace(/^\w/, c => c.toUpperCase()),
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
            { img: "./img/org/suit.png", name: "Tailored Blazer", price: "$720" },
            { img: "./img/org/silkLight.png", name: "Silk Evening Dress", price: "$1,550" },
            { img: "./img/org/eveningLight.png", name: "Evening Dress", price: "$990" },
            { img: "./img/org/coat.png", name: "Structured Wool Coat", price: "$875" }
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
        title: "A Complete Expression",
        subtitle: "Composed, not styled.",
        hero: "./img/org/suit.png",
        section: "Outfits",
        products: []
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
                <img src="${p.img}" alt="">
<!--                <p class="name">${p.name}</p>-->
                ${p.price ? `<span class="price">${p.price}</span>` : ""}
            </div>
        `;
    });
}

/* =========================
   NAVIGATION
   ========================= */

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.dataset.page;
        history.pushState({ page }, "", `/${page}`);
        renderPage(page);
    });
});

home.addEventListener("click", e => {
    e.preventDefault();
    renderPage(home);
})

window.addEventListener("popstate", e => {
    renderPage(e.state?.page || "home");
});

/* =========================
   INIT
   ========================= */

const initial = location.pathname.replace("/", "") || "home";
renderPage(initial);