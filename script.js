document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Animation for Hero Section ---
    const typingElement = document.getElementById('typing-animation');
    const wordsToType = ["Web Applications.", "Mobile Apps.", "Desktop Solutions."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = wordsToType[wordIndex];
        let displayText;

        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = displayText;

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordsToType.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingElement) {
        type();
    }

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('open');
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ===============================================
    // --- NEW: Theme Switcher Logic ---
    // ===============================================
    const themeButtons = document.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'cyber-red'; // Default to cyber-red

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);

        // Update active button state
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Apply the saved or default theme on page load
    applyTheme(currentTheme);

    // Add click listeners to all theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            localStorage.setItem('theme', selectedTheme); // Save preference
            applyTheme(selectedTheme);
        });
    });

});