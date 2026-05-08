// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu Tab Switching logic
const tabBtns = document.querySelectorAll('.tab-btn');
const menuContainers = document.querySelectorAll('.menu-container');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and containers
        tabBtns.forEach(b => b.classList.remove('active'));
        menuContainers.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding container
        const category = btn.getAttribute('data-category');
        document.getElementById(category).classList.add('active');
    });
});

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('section, .menu-item, .res-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// Custom logic for revealed elements (CSS-in-JS style for simplicity here)
document.addEventListener('scroll', () => {
    document.querySelectorAll('section, .menu-item, .res-form').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Form Submission Mock
const form = document.querySelector('.res-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Confirming...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = 'Reservation Confirmed!';
            btn.style.background = '#27ae60';
            btn.style.opacity = '1';
            
            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.style.background = 'var(--primary)';
                btn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a, .cta-group a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});