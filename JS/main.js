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
                header.classList.add('shadow-sm', 'bg-brandLight/95');
                header.classList.remove('bg-brandLight/80');
            } else {
                header.classList.remove('shadow-sm', 'bg-brandLight/95');
                header.classList.add('bg-brandLight/80');
            }
        });
    }

    // =========================================================
    // 3. LANGUAGE TOGGLE (VN / EN) - ĐÃ FIX
    // =========================================================
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    
    // Kiểm tra ngôn ngữ đã lưu, nếu chưa có thì mặc định là 'vn'
    let currentLang = localStorage.getItem('hmslab-language') || 'vn';

    function switchLanguage(lang) {
        // Tìm tất cả phần tử có thuộc tính data-vn và data-en
        const elements = document.querySelectorAll('[data-vn]');

        elements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.innerHTML = translation;
            }
        });

        // Cập nhật chữ trên nút (VN hoặc EN)
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }

        // Lưu lựa chọn vào máy người dùng
        localStorage.setItem('hmslab-language', lang);
    }

    // Chạy hàm switchLanguage ngay khi load trang để áp dụng ngôn ngữ đúng
    switchLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định nếu là thẻ link
            currentLang = (currentLang === 'vn') ? 'en' : 'vn';
            switchLanguage(currentLang);
        });
    }

    // =========================================================
    // 4. SMOOTH SCROLL
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================
    // 5. SIMPLE FADE-IN ANIMATION
    // =========================================================
    const animatedElements = document.querySelectorAll('section');
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, observerOptions);

    animatedElements.forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
        observer.observe(section);
    });
});