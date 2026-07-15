const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpan = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');
const counters = document.querySelectorAll('.counter');
const dropdowns = document.querySelectorAll('.dropdown');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });
}

/* Gallery slider functionality */
const galleryTrack = document.querySelector('.gallery-track');
const galleryCards = document.querySelectorAll('.gallery-track .gallery-card');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');
let galleryIndex = 0;
let cardWidth = galleryCards.length ? galleryCards[0].getBoundingClientRect().width + 18 : 320;
let galleryTimer = null;

const updateCardWidth = () => {
    const first = document.querySelector('.gallery-track .gallery-card');
    if (first) cardWidth = first.getBoundingClientRect().width + 18;
};

const goToGallery = (index) => {
    if (!galleryTrack) return;
    galleryIndex = (index + galleryCards.length) % galleryCards.length;
    galleryTrack.scrollTo({ left: galleryIndex * cardWidth, behavior: 'smooth' });
};

const nextGallery = () => goToGallery(galleryIndex + 1);
const prevGallery = () => goToGallery(galleryIndex - 1);

if (nextBtn) nextBtn.addEventListener('click', () => { nextGallery(); resetGalleryTimer(); });
if (prevBtn) prevBtn.addEventListener('click', () => { prevGallery(); resetGalleryTimer(); });

const startGalleryTimer = () => {
    stopGalleryTimer();
    galleryTimer = setInterval(nextGallery, 4000);
};

const stopGalleryTimer = () => { if (galleryTimer) { clearInterval(galleryTimer); galleryTimer = null; } };

const resetGalleryTimer = () => { stopGalleryTimer(); startGalleryTimer(); };

if (galleryTrack && galleryCards.length) {
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    galleryTrack.addEventListener('mouseenter', stopGalleryTimer);
    galleryTrack.addEventListener('mouseleave', startGalleryTimer);
    startGalleryTimer();
}

/* Header notification button behavior */
const notifButton = document.querySelector('.notif-button');
const notificationPanel = document.getElementById('notificationPanel');
const notifClose = document.querySelector('.notification-close');

const openNotifications = () => {
    if (!notificationPanel) return;
    notificationPanel.setAttribute('aria-hidden', 'false');
    const dot = document.querySelector('.notif-dot'); if (dot) dot.style.display = 'none';
};

const closeNotifications = () => { if (!notificationPanel) return; notificationPanel.setAttribute('aria-hidden', 'true'); };

if (notifButton) {
    notifButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!notificationPanel) return;
        const hidden = notificationPanel.getAttribute('aria-hidden') === 'true';
        if (hidden) openNotifications(); else closeNotifications();
    });
}

if (notifClose) notifClose.addEventListener('click', (e) => { e.stopPropagation(); closeNotifications(); });

document.addEventListener('click', (e) => {
    if (!notificationPanel) return;
    const target = e.target;
    if (!notificationPanel.contains(target) && !notifButton.contains(target)) closeNotifications();
});

if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (event) => {
        if (window.innerWidth <= 700) {
            event.preventDefault();
            dropdown.classList.toggle('open');
        }
    });
});

const animateCounters = () => {
    counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const suffix = counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '';
        const duration = 1500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(updateCounter);
    });
};

if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.hero-stats'));
}

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
    });
}

const loginTrigger = document.querySelector('.login-trigger');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const modalClose = document.querySelector('.modal-close');

const closeLoginModal = () => {
    if (!loginModal) return;
    loginModal.classList.add('hidden');
    loginModal.setAttribute('aria-hidden', 'true');
};

const openLoginModal = () => {
    if (!loginModal) return;
    loginModal.classList.remove('hidden');
    loginModal.setAttribute('aria-hidden', 'false');
};

if (loginTrigger && loginModal) {
    loginTrigger.addEventListener('click', openLoginModal);
}

if (modalClose && loginModal) {
    modalClose.addEventListener('click', closeLoginModal);
}

if (loginModal) {
    loginModal.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            closeLoginModal();
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = loginForm.email.value.trim();
        if (!email) {
            alert('Please enter your email.');
            return;
        }
        alert(`Welcome back, ${email}!`);
        loginForm.reset();
        closeLoginModal();
    });
}
