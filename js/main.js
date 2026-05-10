// ==========================================
// 1. CƠ SỞ DỮ LIỆU DỰ ÁN
// ==========================================
const projectsDatabase = [
    {
        id: "p1",
        slug: "he-thong-quan-ly.html",
        imgFolder: "p1-garage",
        imgName: "cover.jpg",
        tags: ["ReactJS", "NodeJS"],
        title_vn: "Hệ thống quản lý Garage",
        title_en: "Garage Management System",
        desc_vn: "Ứng dụng quản lý toàn diện cho các studio sáng tạo, tích hợp tracking tiến độ và tài chính.",
        desc_en: "Comprehensive management app for creative studios, integrating progress and financial tracking."
    },
    {
        id: "p2",
        slug: "portfolio-maker.html",
        imgFolder: "p2-portfolio",
        imgName: "cover.png",
        tags: ["Next.js", "Tailwind"],
        title_vn: "HMS Portfolio Maker",
        title_en: "HMS Portfolio Maker",
        desc_vn: "Công cụ tạo portfolio nhanh chóng cho developer chỉ với file JSON cấu hình đơn giản.",
        desc_en: "A tool to quickly create developer portfolios with just a simple JSON config file."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 2. LOGIC RENDER DỰ ÁN
    // ==========================================
    const featuredContainer = document.getElementById('featured-projects-container');
    const allContainer = document.getElementById('all-projects-container');
    
    const isProjectsPage = window.location.pathname.includes('/projects/');
    const imgBasePath = isProjectsPage ? '../assets/images/projects/' : './assets/images/projects/';
    const linkBasePath = isProjectsPage ? './' : './projects/';

    function createProjectCard(p) {
        const tagsHTML = p.tags.map(t => `<span class="text-[10px] md:text-xs font-mono font-medium bg-white border border-zinc-200 text-zinc-600 px-3 py-1 rounded-full uppercase tracking-wider">${t}</span>`).join('');
        
        // Đã xóa phần làm lệch, giờ 2 dự án sẽ luôn thẳng hàng ngang nhau
        return `
        <a href="${linkBasePath}${p.slug}" class="group block">
            <div class="relative overflow-hidden rounded-3xl bg-zinc-100 aspect-[4/3] mb-5 md:mb-6 shadow-premium group-hover:shadow-premium-hover transition-all duration-500 border border-zinc-200/50">
                <img src="${imgBasePath}${p.imgFolder}/${p.imgName}" onerror="this.src='https://placehold.co/800x600/111111/ea580c?text=${p.title_en.replace(/ /g, '+')}'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="${p.title_vn}">
            </div>
            <div class="flex gap-2 mb-3">
                ${tagsHTML}
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-brandDark mb-2 md:mb-3 group-hover:text-brandOrange transition-colors duration-300" data-vn="${p.title_vn}" data-en="${p.title_en}">${p.title_vn}</h3>
            <p class="text-zinc-500 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none" data-vn="${p.desc_vn}" data-en="${p.desc_en}">${p.desc_vn}</p>
        </a>`;
    }

    if (featuredContainer) {
        const shuffled = [...projectsDatabase].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2); 
        featuredContainer.innerHTML = selected.map(p => createProjectCard(p)).join('');
    }

    if (allContainer) {
        allContainer.innerHTML = projectsDatabase.map(p => createProjectCard(p)).join('');
    }

    // ==========================================
    // 3. LOGIC NGÔN NGỮ
    // ==========================================
    const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
    const langTexts = document.querySelectorAll('.lang-text');
    let currentLang = localStorage.getItem('hms_lang') || 'vn'; 

    function updateLanguage(lang) {
        langTexts.forEach(text => text.innerText = (lang === 'vn') ? 'English' : 'Tiếng Việt');
        const elements = document.querySelectorAll('[data-vn][data-en]');
        elements.forEach(el => el.innerHTML = el.getAttribute('data-' + lang));
    }

    updateLanguage(currentLang);

    langToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLang = (currentLang === 'vn') ? 'en' : 'vn';
            localStorage.setItem('hms_lang', currentLang); 
            updateLanguage(currentLang);
        });
    });

    // ==========================================
    // 4. MENU MOBILE & HEADER
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
    }

    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('shadow-sm');
                header.classList.replace('bg-brandLight/90', 'bg-white/95');
            } else {
                header.classList.remove('shadow-sm');
                header.classList.replace('bg-white/95', 'bg-brandLight/90');
            }
        });
    }
});