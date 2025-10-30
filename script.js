document.addEventListener('DOMContentLoaded', () => {

    console.log("Navaneethan Dev Studio Script Loaded Successfully!");

    // --- Typing Animation for Hero Section ---
    const typingElement = document.getElementById('typing-animation');
    if (typingElement) {
        const wordsToType = ["Web Applications.", "Mobile Apps.", "Desktop Solutions."];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const currentWord = wordsToType[wordIndex];
            let displayText = isDeleting ? currentWord.substring(0, charIndex--) : currentWord.substring(0, charIndex++);
            typingElement.textContent = displayText;
            let typeSpeed = isDeleting ? 100 : 200;
            if (!isDeleting && charIndex > currentWord.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex < 0) {
                isDeleting = false; wordIndex = (wordIndex + 1) % wordsToType.length; typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => backToTopButton.classList.toggle('visible', window.scrollY > 300));
        backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const toggleNav = () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('open');
        };
        hamburger.addEventListener('click', toggleNav);
        mobileNavLinks.forEach(link => link.addEventListener('click', toggleNav));
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-links a');
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                if (scrollY >= section.offsetTop - 150) current = section.id;
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href').includes(current));
            });
        });
    }

    // ===============================================
    // --- THEME SWITCHER LOGIC ---
    // ===============================================
    const themeButtons = document.querySelectorAll('.theme-btn');
    // UPDATED: Default theme is now 'glassmorphism-dark'
    const currentTheme = localStorage.getItem('theme') || 'glassmorphism-dark';

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
        });
    }

    applyTheme(currentTheme);

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            localStorage.setItem('theme', selectedTheme);
            applyTheme(selectedTheme);
        });
    });
});