document.addEventListener('DOMContentLoaded', () => {
    console.log("File JS đã nhận!"); // Mở F12 -> Console lên xem có dòng này không nhé

    // 1. MENU MOBILE
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. HEADER CUỘN TRANG
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-sm');
                header.classList.replace('bg-brandLight/80', 'bg-brandLight/95');
            } else {
                header.classList.remove('shadow-sm');
                header.classList.replace('bg-brandLight/95', 'bg-brandLight/80');
            }
        });
    }

    // 3. ĐỔI NGÔN NGỮ VN <-> EN
    let currentLang = 'VN';
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'VN' ? 'EN' : 'VN';
            console.log("Đã bấm chuyển ngôn ngữ sang: ", currentLang);
            
            if (langText) langText.textContent = currentLang;
            
            const translatableElements = document.querySelectorAll('[data-vn][data-en]');
            translatableElements.forEach(el => {
                el.innerHTML = currentLang === 'EN' ? el.getAttribute('data-en') : el.getAttribute('data-vn');
            });
        });
    }
});