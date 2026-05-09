document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // MOBILE MENU
    // =========================================
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }


    // =========================================
    // HEADER EFFECT
    // =========================================
    const header = document.getElementById("main-header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            header.classList.add("shadow-sm");
            header.classList.remove("bg-brandLight/80");
            header.classList.add("bg-brandLight/95");

        } else {

            header.classList.remove("shadow-sm");
            header.classList.remove("bg-brandLight/95");
            header.classList.add("bg-brandLight/80");
        }
    });


    // =========================================
    // LANGUAGE TOGGLE
    // =========================================
    const langBtn = document.getElementById("lang-toggle");
    const langText = document.getElementById("lang-text");

    let currentLang = "vn";

    function updateLanguage(lang) {

        const elements = document.querySelectorAll("[data-vn]");

        elements.forEach((element) => {

            if (lang === "en") {

                element.innerHTML = element.dataset.en;

            } else {

                element.innerHTML = element.dataset.vn;
            }
        });


        // đổi chữ nút
        if (lang === "en") {

            langText.textContent = "English";

        } else {

            langText.textContent = "Tiếng Việt";
        }
    }


    // CLICK BUTTON
    if (langBtn) {

        langBtn.addEventListener("click", () => {

            currentLang = currentLang === "vn" ? "en" : "vn";

            updateLanguage(currentLang);
        });
    }

});