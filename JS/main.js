document.addEventListener('DOMContentLoaded', () => {
    // Xử lý Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Chuyển đổi class 'hidden' để hiện/ẩn menu
            mobileMenu.classList.toggle('hidden');
        });

        // Đóng menu khi click vào một link trong menu (trên mobile)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Hiệu ứng Header thu nhỏ/tạo viền khi cuộn trang
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-sm');
            header.classList.replace('bg-white/80', 'bg-white/95');
        } else {
            header.classList.remove('shadow-sm');
            header.classList.replace('bg-white/95', 'bg-white/80');
        }
    });
});