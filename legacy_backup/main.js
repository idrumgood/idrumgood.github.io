import './style.css';

// Update Copyright Year
const yearSpan = document.getElementById('copyrightDate');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.navbar-toggle');
const navCollapse = document.querySelector('.navbar-collapse');

if (navToggle && navCollapse) {
    navToggle.addEventListener('click', () => {
        navCollapse.classList.toggle('show');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.navbar-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
            navCollapse.classList.remove('show');
        }
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.navbar-nav a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
