document.addEventListener('DOMContentLoaded', () => {
    // 1. Xử lý Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Hiệu ứng Header khi cuộn trang
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-sm');
            header.classList.replace('bg-brandLight/80', 'bg-brandLight/95');
        } else {
            header.classList.remove('shadow-sm');
            header.classList.replace('bg-brandLight/95', 'bg-brandLight/80');
        }
    });

    // 3. Xử lý Chuyển đổi Ngôn ngữ (VN / EN)
    let currentLang = 'VN'; // Mặc định là Tiếng Việt
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            // Đảo ngược ngôn ngữ
            currentLang = currentLang === 'VN' ? 'EN' : 'VN';
            
            // Cập nhật chữ trên nút (VN hoặc EN)
            langText.textContent = currentLang;
            
            // Tìm và thay đổi tất cả các nội dung có hỗ trợ song ngữ
            const translatableElements = document.querySelectorAll('[data-vn][data-en]');
            
            translatableElements.forEach(el => {
                if (currentLang === 'EN') {
                    // Nếu có chứa HTML bên trong (như thẻ <br>) thì dùng innerHTML
                    el.innerHTML = el.getAttribute('data-en');
                } else {
                    el.innerHTML = el.getAttribute('data-vn');
                }
            });
        });
    }
});