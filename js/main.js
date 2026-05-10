// File: js/main.js
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. XỬ LÝ MENU MOBILE
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // 2. XỬ LÝ ĐỔI NGÔN NGỮ 
    const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
    const langTexts = document.querySelectorAll('.lang-text');
    
    // Kiểm tra ngôn ngữ đã lưu trong trình duyệt (Tùy chọn nâng cao)
    let currentLang = localStorage.getItem('hms_lang') || 'vn'; 

    function updateLanguage(lang) {
        langTexts.forEach(text => {
            text.innerText = (lang === 'vn') ? 'English' : 'Tiếng Việt';
        });
        const elements = document.querySelectorAll('[data-vn][data-en]');
        elements.forEach(function(el) {
            el.innerHTML = el.getAttribute('data-' + lang);
        });
    }

    // Cập nhật ngay khi load trang
    updateLanguage(currentLang);

    langToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLang = (currentLang === 'vn') ? 'en' : 'vn';
            localStorage.setItem('hms_lang', currentLang); // Lưu lại lựa chọn
            updateLanguage(currentLang);
        });
    });

    // 3. HIỆU ỨNG NAVBAR KHI CUỘN TRANG
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.classList.add('shadow-sm');
            header.classList.replace('bg-brandLight/90', 'bg-white/95');
        } else {
            header.classList.remove('shadow-sm');
            header.classList.replace('bg-white/95', 'bg-brandLight/90');
        }
    });
});