        // ===== PAGE LOADER =====
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('pageLoader').classList.add('hidden');
            }, 800);
        });

        // ===== NAVBAR SCROLL =====
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // ===== MOBILE NAV =====
        function toggleMobileNav() {
            const navLinks = document.getElementById('navLinks');
            const icon = document.getElementById('mobileIcon');
            navLinks.classList.toggle('open');
            if (navLinks.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }

        // Close mobile nav on link click
        document.querySelectorAll('.nav-links a:not(.btn-login)').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navLinks').classList.remove('open');
                document.getElementById('mobileIcon').className = 'fas fa-bars';
            });
        });

        // ===== ACTIVE NAV LINK =====
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // ===== QUOTE CAROUSEL =====
        const slides = document.querySelectorAll('.carousel-slide');
        const dotsContainer = document.getElementById('carouselDots');
        let currentSlide = 0;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            document.querySelectorAll('.carousel-dot')[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            document.querySelectorAll('.carousel-dot')[currentSlide].classList.add('active');
        }

        setInterval(() => {
            goToSlide((currentSlide + 1) % slides.length);
        }, 5000);

        // ===== SCROLL ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // ===== PARALLAX EFFECT =====
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const parallaxBgs = document.querySelectorAll('.parallax-bg');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.05;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });

            parallaxBgs.forEach(bg => {
                const rect = bg.parentElement.getBoundingClientRect();
                const offset = rect.top * 0.3;
                bg.style.transform = `translateY(${offset}px)`;
            });
        });

        // ===== COUNTER ANIMATION =====
        const counters = document.querySelectorAll('.counter');
        let counterStarted = false;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterStarted) {
                    counterStarted = true;
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.target);
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                counter.textContent = target;
                                clearInterval(timer);
                            } else {
                                counter.textContent = Math.floor(current);
                            }
                        }, 16);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter-section').forEach(el => counterObserver.observe(el));

        // ===== PROFIL TABS =====
        function switchTab(tabName) {
            document.querySelectorAll('.profil-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.profil-tab').forEach(t => t.classList.remove('active'));
            document.getElementById('tab-' + tabName).classList.add('active');
            event.target.classList.add('active');

            // Re-observe animated elements in newly visible tab
            document.querySelectorAll('#tab-' + tabName + ' .animate-on-scroll').forEach(el => {
                el.classList.remove('visible');
                setTimeout(() => {
                    observer.observe(el);
                }, 100);
            });
        }

        // ===== LOGIN MODAL =====
        function openModal(e) {
            e.preventDefault();
            document.getElementById('loginModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('loginModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        document.getElementById('loginModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('loginModal')) {
                closeModal();
            }
        });

        // ===== TOAST NOTIFICATION =====
        function showToast(message, icon = 'fa-check-circle') {
            const toast = document.getElementById('toast');
            toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
            toast.style.transform = 'translateX(0)';
            setTimeout(() => {
                toast.style.transform = 'translateX(120%)';
            }, 3000);
        }

        // ===== FORM HANDLERS =====
        function handleLogin(e) {
            e.preventDefault();
            closeModal();
            showToast('Login berhasil! Mengalihkan ke dashboard...', 'fa-sign-in-alt');
        }

        function handlePPDBSubmit(e) {
            e.preventDefault();
            showToast('Pendaftaran berhasil! Data Anda sedang diverifikasi.', 'fa-check-circle');
            e.target.reset();
        }

        function handleContactSubmit(e) {
            e.preventDefault();
            showToast('Pesan terkirim! Kami akan segera merespons.', 'fa-paper-plane');
            e.target.reset();
        }

        // ===== SMOOTH REVEAL ON LOAD =====
        document.addEventListener('DOMContentLoaded', () => {
            // Trigger initial animations for elements already in viewport
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            }, 1000);
        });