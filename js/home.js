// JS spécifique à home.html
// Contient le code de la page home (navigation, reveal, lightbox, formulaire, header)



(function homePage(){
    try{
        // Menu mobile accessible
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.getElementById('main-nav');
        if (navToggle && mainNav) {
            navToggle.addEventListener('click', () => {
                const expanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', String(!expanded));
                if (!expanded) {
                    mainNav.setAttribute('aria-hidden', 'false');
                } else {
                    mainNav.setAttribute('aria-hidden', 'true');
                }
            });
        }

        // Smooth scroll pour ancres internes
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.length > 1 && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = document.querySelector('.site-header')?.offsetHeight || 80;
                        const rect = target.getBoundingClientRect();
                        const scrollTop = window.pageYOffset + rect.top - headerOffset - 12;
                        window.scrollTo({top: scrollTop, behavior: 'smooth'});
                        if (window.innerWidth <= 900 && mainNav) {
                            mainNav.setAttribute('aria-hidden', 'true');
                            navToggle?.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            })
        });

        // Reveal on scroll
        (function setupReveal() {
            const els = Array.from(document.querySelectorAll('main .section, .hero, .header-inner'));
            if (els.length === 0) return;

            const supportsIO = 'IntersectionObserver' in window;
            let io = null;
            if (supportsIO) {
                io = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('revealed');
                            io.unobserve(entry.target);
                        }
                    });
                }, {threshold: 0.12});
            }

            els.forEach(el => {
                const rect = el.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                if (inView) {
                    el.classList.add('revealed');
                } else {
                    el.classList.add('reveal');
                    if (io) io.observe(el);
                }
            });

            if (!supportsIO) {
                els.forEach(el => el.classList.add('revealed'));
            }
        })();

        // Met à jour l'année dans le footer
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        // Validation basique du formulaire de contact (côté client)
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = form.name.value.trim();
                const email = form.email.value.trim();
                const message = form.message.value.trim();
                if (!name || !email || !message) {
                    alert('Veuillez remplir tous les champs du formulaire.');
                    return;
                }
                alert('Merci, votre message a été envoyé (simulation).');
                form.reset();
            });
        }

        // Respect de la préférence utilisateur "réduire les animations"
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.scrollTo = (opts) => {
                if (typeof opts === 'object') window.scroll(0, opts.top ?? 0);
            };
        }

        // Header: changement visuel au scroll et mise à jour du lien actif
        (function headerScrollAndActiveLink() {
            const header = document.querySelector('.site-header');
            const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
            const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
            const headerOffset = 60;

            function onScroll() {
                const y = window.scrollY || window.pageYOffset;
                if (header) {
                    if (y > headerOffset) header.classList.add('scrolled'); else header.classList.remove('scrolled');
                }

                let current = sections.find(sec => {
                    const rect = sec.getBoundingClientRect();
                    return rect.top <= (window.innerHeight * 0.25) && rect.bottom > (window.innerHeight * 0.15);
                });
                if (!current) {
                    current = sections.slice().reverse().find(sec => sec.getBoundingClientRect().top <= window.innerHeight * 0.6);
                }
                navLinks.forEach(a => a.classList.toggle('active', document.querySelector(a.getAttribute('href')) === current));
            }

            window.addEventListener('scroll', onScroll, {passive: true});
            window.addEventListener('resize', onScroll);
            onScroll();
        })();

        // Lightbox: galerie d'images
        (function setupLightbox() {
            const galleryLinks = Array.from(document.querySelectorAll('.gallery-link'));
            const lightbox = document.getElementById('lightbox');
            const lbImg = document.getElementById('lightbox-img');
            const lbCaption = document.getElementById('lightbox-caption');
            const lbClose = document.querySelector('.lightbox-close');
            let lastFocused = null;

            if (!lightbox || !lbImg) return;

            function openLightbox(href, caption, alt) {
                lastFocused = document.activeElement;
                lbImg.src = href;
                lbImg.alt = alt || caption || '';
                lbCaption.textContent = caption || '';
                lightbox.setAttribute('aria-hidden', 'false');
                lbClose.focus();
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                lightbox.setAttribute('aria-hidden', 'true');
                lbImg.src = '';
                lbCaption.textContent = '';
                document.body.style.overflow = '';
                if (lastFocused) lastFocused.focus();
            }

            galleryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    const caption = link.dataset.caption || '';
                    const img = link.querySelector('img');
                    const alt = img?.getAttribute('alt') || '';
                    openLightbox(href, caption, alt);
                });
            });

            lbClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
                    closeLightbox();
                }
            });
        })();

    } catch(e){
        console.warn('home.js error', e);
    }
})();

