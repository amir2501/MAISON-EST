const navBar = document.getElementById("nav-bar");
let scrollTimeout;

/* =========================
   NAV — QUIET SCROLL BEHAVIOR
   ========================= */

document.addEventListener("scroll", () => {
    // While scrolling: subtle glass effect
    navBar.style.background = "rgba(246, 245, 243, 0.92)";
    navBar.style.backdropFilter = "blur(6px)";
    navBar.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.12)";

    clearTimeout(scrollTimeout);

    // After scroll stops: calm, solid
    scrollTimeout = setTimeout(() => {
        navBar.style.background = "rgb(246, 245, 243)";
        navBar.style.backdropFilter = "blur(0px)";
        navBar.style.boxShadow = "none";
    }, 140);
});

/* =========================
   IMAGE LAZY LOADING — SILENT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img.lazy");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const img = entry.target;
                const highRes = new Image();
                highRes.src = img.dataset.src;

                highRes.onload = () => {
                    img.src = img.dataset.src;
                    img.style.filter = "blur(0px)";
                    img.style.transition = "filter 600ms ease";
                    img.classList.remove("lazy");
                };

                observer.unobserve(img);
            });
        },
        { rootMargin: "200px" }
    );

    images.forEach(img => observer.observe(img));
});