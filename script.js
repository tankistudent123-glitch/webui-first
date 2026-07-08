const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpan = document.getElementById('year');
const contactForm = document.getElementById('contactForm');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
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
