// ==========================================
// 1. CO SO DU LIEU DU AN
// ==========================================
const projectsDatabase = [
    {
        id: "p4",
        slug: "/servo-tiktok",
        file: "servo-tiktok.html",
        imgFolder: "p4-tiktok-video",
        imgName: "servo-thumbnail.jpg",
        tags: ["ESP32", "Servo", "3D Print"],
        title_vn: "Đế xoay Servo ESP32",
        title_en: "ESP32 Servo Turntable",
        desc_vn: "Dự án lắp ESP32, servo và thân in 3D thành một cơ cấu xoay nhỏ gọn đã được đăng lên TikTok HMSlab.",
        desc_en: "A compact rotating mechanism built with ESP32, a servo, and a 3D printed body, featured on HMSlab TikTok."
    },
    {
        id: "p3",
        slug: "/ai-robot",
        file: "ai-robot.html",
        imgFolder: "p3-ai-robot",
        imgName: "cover-card.jpg",
        tags: ["Arduino", "Robotic Arm", "Servo"],
        title_vn: "Tay máy Arduino",
        title_en: "Arduino Robotic Arm",
        desc_vn: "Dự án tay máy robot dùng Arduino để điều khiển nhiều servo, cơ cấu gắp và các khớp chuyển động theo lệnh.",
        desc_en: "An Arduino robotic arm project that controls multiple servos, a gripper, and joint movements through commands."
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
        '/join': 'course-teaser',
        '/contact': 'contact'
    };
    const comingSoonRoutes = ['/garage'];
    const cleanProjectRoutes = {
        '/projects/he-thong-quan-ly.html': '/coming-soon',
        '/projects/portfolio-maker.html': '/builder',
        '/projects/ai-robot.html': '/ai-robot',
        '/projects/servo-tiktok.html': '/servo-tiktok',
        '/courses/index.html': '/coming-soon',
        '/courses/register.html': '/coming-soon'
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
    const langFlags = {
        vn: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Cpath fill='%23da251d' d='M0 0h30v20H0z'/%3E%3Cpath fill='%23ffff00' d='m15 3 2.7 8.2 8.7.1-7 5.1 2.6 8.3-7-5.1-7 5.1 2.6-8.3-7-5.1 8.7-.1z' transform='scale(.62) translate(9.2 3)'/%3E%3C/svg%3E",
        en: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40'%3E%3Cpath fill='%23012169' d='M0 0h60v40H0z'/%3E%3Cpath stroke='%23fff' stroke-width='8' d='m0 0 60 40M60 0 0 40'/%3E%3Cpath stroke='%23c8102e' stroke-width='4.8' d='m0 0 60 40M60 0 0 40'/%3E%3Cpath fill='%23fff' d='M24 0h12v40H24zM0 14h60v12H0z'/%3E%3Cpath fill='%23c8102e' d='M27 0h6v40h-6zM0 17h60v6H0z'/%3E%3C/svg%3E"
    };

    function updateLanguage(lang) {
        const nextLang = lang === 'vn'
            ? { code: 'en', label: 'English', aria: 'Switch to English' }
            : { code: 'vn', label: 'Tiếng Việt', aria: 'Chuyển sang tiếng Việt' };

        langTexts.forEach(text => {
            text.classList.add('inline-flex', 'items-center', 'gap-1.5');
            text.innerHTML = `<img src="${langFlags[nextLang.code]}" alt="" class="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10" loading="lazy"><span>${nextLang.label}</span>`;
        });

        langToggleBtns.forEach(btn => {
            btn.classList.add('border', 'border-zinc-200/80', 'shadow-sm', 'whitespace-nowrap');
            btn.setAttribute('aria-label', nextLang.aria);
            btn.setAttribute('title', nextLang.aria);
        });

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

    // ==========================================
    // 5. REUSABLE PROJECT IMAGE GALLERY
    // ==========================================
    document.querySelectorAll('[data-gallery]').forEach(gallery => {
        const mainImage = gallery.querySelector('[data-gallery-main]');
        const label = gallery.querySelector('[data-gallery-label]');
        const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
        const prevButton = gallery.querySelector('[data-gallery-prev]');
        const nextButton = gallery.querySelector('[data-gallery-next]');
        let activeIndex = -1;

        if (!mainImage || !thumbs.length) {
            return;
        }

        function setActiveThumb(activeThumb) {
            thumbs.forEach(thumb => {
                const isActive = thumb === activeThumb;
                thumb.classList.toggle('ring-4', isActive);
                thumb.classList.toggle('ring-0', !isActive);
                thumb.classList.toggle('border-brandOrange', isActive);
                thumb.classList.toggle('border-zinc-200', !isActive);
                thumb.setAttribute('aria-pressed', String(isActive));
            });
            activeIndex = thumbs.indexOf(activeThumb);
        }

        function showThumb(thumb) {
            const nextSrc = thumb.dataset.full;
            if (!nextSrc) {
                return;
            }

            mainImage.classList.add('opacity-0');
            window.setTimeout(() => {
                mainImage.src = nextSrc;
                mainImage.alt = thumb.querySelector('img')?.alt || mainImage.alt;
                mainImage.classList.toggle('object-contain', thumb.dataset.fit === 'contain');
                mainImage.classList.toggle('object-cover', thumb.dataset.fit !== 'contain');
                if (label && thumb.dataset.label) {
                    label.textContent = thumb.dataset.label;
                }
                mainImage.classList.remove('opacity-0');
                setActiveThumb(thumb);
            }, 160);
        }

        function stepGallery(direction) {
            const nextIndex = activeIndex < 0
                ? (direction > 0 ? 0 : thumbs.length - 1)
                : (activeIndex + direction + thumbs.length) % thumbs.length;
            showThumb(thumbs[nextIndex]);
        }

        thumbs.forEach(thumb => {
            thumb.setAttribute('aria-pressed', 'false');
            thumb.addEventListener('click', () => showThumb(thumb));
        });

        const initialThumb = thumbs.find(thumb => thumb.dataset.full === mainImage.getAttribute('src'));
        if (initialThumb) {
            setActiveThumb(initialThumb);
        }

        prevButton?.addEventListener('click', () => stepGallery(-1));
        nextButton?.addEventListener('click', () => stepGallery(1));
    });
});

// ==========================================
// 6. CHONG COPY VA F12 (CO BAN)
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
