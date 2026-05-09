document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // MOBILE MENU
    // =====================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }


    // =====================================================
    // HEADER EFFECT
    // =====================================================
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {

        if (window.scrollY > 20) {

            header.classList.add('shadow-sm');

            header.classList.remove('bg-brandLight/80');
            header.classList.add('bg-brandLight/95');

        } else {

            header.classList.remove('shadow-sm');

            header.classList.remove('bg-brandLight/95');
            header.classList.add('bg-brandLight/80');
        }
    });


    // =====================================================
    // LANGUAGE TOGGLE
    // =====================================================
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    // Mặc định tiếng Việt
    let currentLang = 'vn';

    // Hàm đổi ngôn ngữ
    function changeLanguage(lang) {

        // Lấy tất cả phần tử có data-vn và data-en
        const elements = document.querySelectorAll('[data-vn][data-en]');

        elements.forEach(element => {

            // Chuyển sang tiếng Anh
            if (lang === 'en') {

                element.innerHTML = element.getAttribute('data-en');

            }

            // Chuyển sang tiếng Việt
            else {

                element.innerHTML = element.getAttribute('data-vn');
            }
        });

        // Đổi chữ trên nút
        if (lang === 'en') {

            langText.textContent = 'English';

        } else {

            langText.textContent = 'Tiếng Việt';
        }

        // Lưu ngôn ngữ
        localStorage.setItem('language', lang);
    }


    // =====================================================
    // LOAD LANGUAGE SAVED
    // =====================================================
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {

        currentLang = savedLanguage;

        changeLanguage(currentLang);
    }


    // =====================================================
    // BUTTON CLICK
    // =====================================================
    if (langToggleBtn) {

        langToggleBtn.addEventListener('click', () => {

            // Đổi ngôn ngữ
            currentLang = currentLang === 'vn' ? 'en' : 'vn';

            // Áp dụng
            changeLanguage(currentLang);
        });
    }

});