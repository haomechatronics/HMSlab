document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. MOBILE MENU TOGGLE
    // =========================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Tự đóng menu khi bấm vào link
        const mobileLinks = mobileMenu.querySelectorAll('a');

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // =========================================================
    // 2. HEADER EFFECT WHEN SCROLL
    // =========================================================
    const header = document.querySelector('header');

    if (header) {

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
    }


    // =========================================================
    // 3. LANGUAGE TOGGLE (VN / EN)
    // =========================================================
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    // Ngôn ngữ mặc định
    let currentLang = 'vn';

    // Hàm đổi ngôn ngữ
    function switchLanguage(lang) {

        // Lấy tất cả phần tử có data-vn và data-en
        const elements = document.querySelectorAll('[data-vn][data-en]');

        elements.forEach(element => {

            // Nếu là tiếng Anh
            if (lang === 'en') {

                const englishText = element.getAttribute('data-en');

                if (englishText) {
                    element.innerHTML = englishText;
                }

            }

            // Nếu là tiếng Việt
            else {

                const vietnameseText = element.getAttribute('data-vn');

                if (vietnameseText) {
                    element.innerHTML = vietnameseText;
                }
            }
        });

        // Đổi text trên nút
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }

        // Lưu ngôn ngữ vào trình duyệt
        localStorage.setItem('hmslab-language', lang);
    }

    // Kiểm tra ngôn ngữ đã lưu
    const savedLanguage = localStorage.getItem('hmslab-language');

    if (savedLanguage) {
        currentLang = savedLanguage;
        switchLanguage(currentLang);
    }

    // Sự kiện click đổi ngôn ngữ
    if (langToggleBtn) {

        langToggleBtn.addEventListener('click', () => {

            currentLang = currentLang === 'vn' ? 'en' : 'vn';

            switchLanguage(currentLang);
        });
    }


    // =========================================================
    // 4. SMOOTH SCROLL
    // =========================================================
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            // Bỏ qua nếu href chỉ là #
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                e.preventDefault();

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // =========================================================
    // 5. SIMPLE FADE-IN ANIMATION
    // =========================================================
    const animatedElements = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    'opacity-100',
                    'translate-y-0'
                );

                entry.target.classList.remove(
                    'opacity-0',
                    'translate-y-8'
                );
            }
        });

    }, {
        threshold: 0.1
    });

    animatedElements.forEach(section => {

        section.classList.add(
            'transition-all',
            'duration-700',
            'opacity-0',
            'translate-y-8'
        );

        observer.observe(section);
    });

});