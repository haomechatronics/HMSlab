// ==========================================
// 1. CO SO DU LIEU DU AN
// ==========================================
const projectsDatabase = [
    {
        id: "p1",
        slug: "/coming-soon",
        file: "he-thong-quan-ly.html",
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
        slug: "/builder",
        file: "portfolio-maker.html",
        imgFolder: "p2-portfolio",
        imgName: "cover.png",
        tags: ["Next.js", "Tailwind"],
        title_vn: "HMS Portfolio Maker",
        title_en: "HMS Portfolio Maker",
        desc_vn: "Công cụ tạo portfolio nhanh chóng cho developer chỉ với file JSON cấu hình đơn giản.",
        desc_en: "A tool to quickly create developer portfolios with just a simple JSON config file."
    },
    {
        id: "p3",
        slug: "/ai-robot",
        file: "ai-robot.html",
        imgFolder: "p3-ai-robot",
        imgName: "cover.png",
        tags: ["AI", "Robot", "3D Print"],
        title_vn: "Robot AI DIY",
        title_en: "DIY AI Robot",
        desc_vn: "Dự án robot AI tự làm với thân vỏ in 3D, cảm biến, camera và khả năng tương tác thông minh.",
        desc_en: "A DIY AI robot project with a 3D printed body, sensors, camera, and intelligent interaction features."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 2. LOGIC RENDER DU AN
    // ==========================================
    const featuredContainer = document.getElementById('featured-projects-container');
    const allContainer = document.getElementById('all-projects-container');
    
    const isProjectsPage = window.location.pathname.includes('/projects/');
    const imgBasePath = isProjectsPage ? '../assets/images/projects/' : './assets/images/projects/';

    function createProjectCard(p) {
        const tagsHTML = p.tags.map(t => `<span class="text-[10px] md:text-xs font-mono font-medium bg-white border border-zinc-200 text-zinc-600 px-3 py-1 rounded-full uppercase tracking-wider">${t}</span>`).join('');
        const localProjectHref = isProjectsPage ? `./${p.file}` : `./projects/${p.file}`;
        const projectHref = window.location.protocol === 'file:' ? localProjectHref : p.slug;
        
        // Giu cac card du an thang hang ngang nhau.
        return `
        <a href="${projectHref}" class="group block">
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
    // 2.1. CLEAN URL ROUTING CHO TRANG CHU
    // ==========================================
    const cleanRouteTargets = {
        '/home': 'top',
        '/projects': 'projects',
        '/lab-notes': 'lab-notes',
        '/tools': 'tools',
        '/join': 'course-teaser'
    };
    const comingSoonRoutes = ['/garage'];
    const cleanProjectRoutes = {
        '/projects/he-thong-quan-ly.html': '/coming-soon',
        '/projects/portfolio-maker.html': '/builder',
        '/projects/ai-robot.html': '/ai-robot',
        '/courses/index.html': '/courses',
        '/courses/register.html': '/dang-ky-khoa-hoc'
    };

    function scrollToTarget(targetId) {
        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function setCleanRoute(route, targetId, replace = false) {
        scrollToTarget(targetId);

        if (window.location.protocol === 'file:') {
            return;
        }

        const nextUrl = `${window.location.origin}${route}`;
        if (replace) {
            window.history.replaceState({ targetId }, '', nextUrl);
        } else {
            window.history.pushState({ targetId }, '', nextUrl);
        }
    }

    document.querySelectorAll('[data-route][data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setCleanRoute(this.dataset.route, this.dataset.target);
        });
    });

    const pendingRoute = sessionStorage.getItem('hms_pending_route');
    const pendingProjectRoute = sessionStorage.getItem('hms_pending_project_route');
    if (window.location.protocol !== 'file:' && comingSoonRoutes.includes(window.location.pathname)) {
        window.location.replace(`${window.location.origin}/coming-soon`);
    } else if (pendingRoute && cleanRouteTargets[pendingRoute]) {
        sessionStorage.removeItem('hms_pending_route');
        window.setTimeout(() => setCleanRoute(pendingRoute, cleanRouteTargets[pendingRoute], true), 50);
    } else if (pendingProjectRoute && window.location.protocol !== 'file:') {
        sessionStorage.removeItem('hms_pending_project_route');
        window.history.replaceState({}, '', `${window.location.origin}${pendingProjectRoute}`);
    } else if (window.location.protocol !== 'file:' && cleanProjectRoutes[window.location.pathname]) {
        window.history.replaceState({}, '', `${window.location.origin}${cleanProjectRoutes[window.location.pathname]}`);
    } else if (window.location.protocol !== 'file:' && cleanRouteTargets[window.location.pathname]) {
        window.setTimeout(() => scrollToTarget(cleanRouteTargets[window.location.pathname]), 50);
    }

    window.addEventListener('popstate', function() {
        const targetId = cleanRouteTargets[window.location.pathname] || 'top';
        scrollToTarget(targetId);
    });

    // ==========================================
    // 3. LOGIC NGON NGU
    // ==========================================
    const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
    const langTexts = document.querySelectorAll('.lang-text');
    let currentLang = localStorage.getItem('hms_lang') || 'vn'; 

    function updateLanguage(lang) {
        langTexts.forEach(text => text.innerText = (lang === 'vn') ? 'English' : 'Tiếng Việt');
        const elements = document.querySelectorAll('[data-vn][data-en]');
        elements.forEach(el => {
            const value = el.getAttribute('data-' + lang);
            if (/<\/?[a-z][\s\S]*>/i.test(value)) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });
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

// ==========================================
// 5. CHONG COPY VA F12 (CO BAN)
// ==========================================

// Chan click chuot phai
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Chan cac phim tat F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
document.addEventListener('keydown', function(e) {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S')
    ) {
        e.preventDefault();
        return false;
    }
});
