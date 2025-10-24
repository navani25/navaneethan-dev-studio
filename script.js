// Wait for the entire HTML document to be loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggles the 'active' class on the hamburger and the 'open' class on the mobile nav
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });

    // When a link in the mobile menu is clicked, close the menu
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileNav.classList.remove('open');
        });
    });

    // --- Interactive Mouse-Following Snake Animation ---
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');

    let width, height;
    let mouse = null; // Store mouse coordinates

    // Function to set canvas size to match the window
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize(); // Initial resize

    // Update mouse coordinates when the mouse moves
    window.addEventListener('mousemove', (event) => {
        if (!mouse) {
            mouse = { x: width / 2, y: height / 2 };
        }
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    // Set mouse to null when it leaves the window to trigger random movement
    window.addEventListener('mouseout', () => {
        mouse = null;
    });

    // Snake class definition
    class Snake {
        constructor() {
            this.body = [];
            this.length = 200;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 2;
            this.randomTurnSpeed = 0.04;
            this.followTurnSpeed = 0.08;
            const startX = width / 2;
            const startY = height / 2;
            for (let i = 0; i < this.length; i++) {
                this.body.push({ x: startX, y: startY });
            }
        }

        update() {
            const head = this.body[0];

            if (mouse) {
                // If mouse is on screen, smoothly turn towards it
                const dx = mouse.x - head.x;
                const dy = mouse.y - head.y;
                const targetAngle = Math.atan2(dy, dx);
                let angleDiff = targetAngle - this.angle;
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                this.angle += angleDiff * this.followTurnSpeed;
            } else {
                // If mouse is off-screen, move randomly
                this.angle += (Math.random() - 0.5) * this.randomTurnSpeed;
            }

            // Calculate new head position
            let newHead = {
                x: head.x + Math.cos(this.angle) * this.speed,
                y: head.y + Math.sin(this.angle) * this.speed
            };
            
            // Bounce off walls
            if (newHead.x <= 0 || newHead.x >= width) this.angle = Math.PI - this.angle;
            if (newHead.y <= 0 || newHead.y >= height) this.angle = -this.angle;
            
            // Recalculate after bounce
            newHead = {
                x: head.x + Math.cos(this.angle) * this.speed,
                y: head.y + Math.sin(this.angle) * this.speed
            };

            // Add new head and remove tail
            this.body.unshift(newHead);
            while (this.body.length > this.length) {
                this.body.pop();
            }
        }

        draw() {
            this.body.forEach((segment, index) => {
                const radius = 10 * (1 - index / this.length);
                const opacity = 0.4 * (1 - index / this.length);
                const gradient = ctx.createRadialGradient(segment.x, segment.y, 0, segment.x, segment.y, radius);
                gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity})`);
                gradient.addColorStop(1, 'rgba(50, 0, 0, 0)');
                ctx.beginPath();
                ctx.arc(segment.x, segment.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });
        }
    }

    const snake = new Snake();

    // Main animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        snake.update();
        snake.draw();
        requestAnimationFrame(animate);
    }
    animate();

    // --- Hero Section Typing Animation ---
    const typingElement = document.getElementById('typing-animation');
    if (typingElement) {
        const words = ["Web Apps", "Mobile Apps", "Desktop Apps", "SaaS Platforms", "Portfolios"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChar = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            typingElement.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1200);
            }
        }
        type();
    }

    // --- Sticky Navbar & Active Link Highlighting on Scroll ---
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-links a');

    window.addEventListener('scroll', () => {
        // Add a subtle background blur effect on scroll
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        }

        // Determine which section is currently in view
        let current = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });

        // Add 'active' class to the corresponding nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- "Back to Top" Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Real-Time Contact Form Logic (via Web3Forms) ---
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            
            result.innerHTML = "Sending...";
            result.style.display = "block";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully!";
                    result.style.color = "green";
                } else {
                    console.log(response);
                    result.innerHTML = jsonResponse.message;
                    result.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                 result.style.color = "red";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
        });
    }
});