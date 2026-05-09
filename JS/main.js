// Đợi HTML tải xong hoàn toàn mới chạy JS
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CHUYỂN ĐỔI NGÔN NGỮ (TIẾNG VIỆT / ENGLISH)
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    let isVietnamese = true; // Cờ theo dõi trạng thái ngôn ngữ

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            // Đổi cờ trạng thái
            isVietnamese = !isVietnamese;
            
            // Cập nhật chữ trên nút
            if (langText) {
                langText.innerText = isVietnamese ? 'Tiếng Việt' : 'English';
            }
            
            // Tìm và thay đổi tất cả các thẻ có chứa data-vn và data-en
            const elements = document.querySelectorAll('[data-vn][data-en]');
            elements.forEach(function(el) {
                if (isVietnamese) {
                    el.innerHTML = el.getAttribute('data-vn');
                } else {
                    el.innerHTML = el.getAttribute('data-en');
                }
            });
        });
    }

    // 2. HIỆU ỨNG NAVBAR KHI CUỘN TRANG
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('shadow-sm');
                header.classList.replace('bg-brandLight/80', 'bg-brandLight/95');
            } else {
                header.classList.remove('shadow-sm');
                header.classList.replace('bg-brandLight/95', 'bg-brandLight/80');
            }
        });
    }

    // 3. MENU ĐIỆN THOẠI
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

});