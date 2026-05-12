(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    function injectChrome() {
        document.body.classList.add('studio-page');

        if (!document.getElementById('studio-progress')) {
            const progress = document.createElement('div');
            progress.id = 'studio-progress';
            progress.className = 'studio-progress';
            progress.setAttribute('aria-hidden', 'true');
            document.body.prepend(progress);
        }

        if (!document.getElementById('studio-cursor')) {
            const cursor = document.createElement('div');
            cursor.id = 'studio-cursor';
            cursor.className = 'studio-cursor';
            cursor.setAttribute('aria-hidden', 'true');
            document.body.prepend(cursor);
        }

        if (!document.getElementById('studio-loader')) {
            const loader = document.createElement('div');
            loader.id = 'studio-loader';
            loader.className = 'studio-loader';
            loader.setAttribute('aria-hidden', 'true');
            loader.innerHTML = '<div class="studio-loader-mark text-3xl md:text-5xl">HMSlab.</div>';
            document.body.prepend(loader);
        }
    }

    function enhanceElements() {
        document.querySelectorAll('main > section, main > div, footer > div').forEach((item) => {
            item.classList.add('studio-reveal');
        });

        document.querySelectorAll('h1').forEach((title) => {
            title.classList.add('studio-title-effect');
        });

        document.querySelectorAll('a.bg-brandDark, a.bg-brandOrange, button.bg-brandDark, button.bg-brandOrange, form button, .lang-toggle-btn').forEach((item) => {
            item.classList.add('studio-lift', 'magnetic');
        });

        document.querySelectorAll('a.group.block, .rounded-3xl.border, .shadow-premium').forEach((item) => {
            item.classList.add('studio-card-effect');
        });

        document.querySelectorAll('.aspect-video, .aspect-\\[4\\/3\\]').forEach((item) => {
            if (item.querySelector('img')) {
                item.classList.add('studio-media-effect');
            }
        });
    }

    function setupProgress() {
        const progress = document.getElementById('studio-progress');
        if (!progress) return;

        function update() {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
            progress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
        }

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    }

    function setupReveal() {
        const revealItems = document.querySelectorAll('.studio-reveal');

        if (!('IntersectionObserver' in window) || reduceMotion) {
            revealItems.forEach(item => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        revealItems.forEach((item, index) => {
            item.style.transitionDelay = `${Math.min(index * 70, 320)}ms`;
            observer.observe(item);
        });
    }

    function setupPointerEffects() {
        if (reduceMotion) return;

        const cursor = document.getElementById('studio-cursor');

        window.addEventListener('pointermove', (event) => {
            document.documentElement.style.setProperty('--studio-cursor-x', `${event.clientX}px`);
            document.documentElement.style.setProperty('--studio-cursor-y', `${event.clientY}px`);

            if (cursor && finePointer) {
                cursor.classList.add('is-active');
                cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
            }
        }, { passive: true });

        document.addEventListener('pointerdown', () => cursor && cursor.classList.add('is-pressing'));
        document.addEventListener('pointerup', () => cursor && cursor.classList.remove('is-pressing'));

        document.querySelectorAll('a, button').forEach((item) => {
            item.addEventListener('pointerenter', () => cursor && cursor.classList.add('is-linking'));
            item.addEventListener('pointerleave', () => cursor && cursor.classList.remove('is-linking'));
        });

        document.querySelectorAll('.magnetic').forEach((item) => {
            item.addEventListener('pointermove', (event) => {
                const rect = item.getBoundingClientRect();
                const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
                const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
                item.style.transform = `translate(${x}px, ${y}px)`;
            });

            item.addEventListener('pointerleave', () => {
                item.style.transform = '';
            });
        });

        document.querySelectorAll('.studio-media-effect').forEach((item) => {
            item.addEventListener('pointermove', (event) => {
                const rect = item.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                item.style.setProperty('--studio-tilt-y', `${(x - 0.5) * 7}deg`);
                item.style.setProperty('--studio-tilt-x', `${(0.5 - y) * 5}deg`);
                item.style.setProperty('--studio-light-x', `${x * 100}%`);
                item.style.setProperty('--studio-light-y', `${y * 100}%`);
            });

            item.addEventListener('pointerleave', () => {
                item.style.setProperty('--studio-tilt-x', '0deg');
                item.style.setProperty('--studio-tilt-y', '0deg');
                item.style.setProperty('--studio-light-x', '50%');
                item.style.setProperty('--studio-light-y', '50%');
            });
        });
    }

    function hideLoader() {
        const loader = document.getElementById('studio-loader');
        window.setTimeout(() => loader && loader.classList.add('is-hidden'), 620);
    }

    document.addEventListener('DOMContentLoaded', function () {
        injectChrome();
        enhanceElements();
        setupProgress();
        setupReveal();
        setupPointerEffects();
        hideLoader();
    });
})();
