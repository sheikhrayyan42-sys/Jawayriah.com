/* ======================================
   PORTFOLIO JAVASCRIPT - MAIN SCRIPT
   ====================================== */

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollReveal();
    initCarousels();
    initFormValidation();
    initSmoothScroll();
});

/* ======================================
   MOBILE HAMBURGER MENU
   ====================================== */

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger) return;

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ======================================
   SCROLL REVEAL ANIMATION
   ====================================== */

function initScrollReveal() {
    const reveals = document.querySelectorAll('.service-card, .portfolio-card, .expertise-card, .skill-item, .about-bio, .carousel-slide, .testimonial-card, .feature-card');

    if (!reveals.length) return;

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        reveal.classList.add('reveal');
        revealOnScroll.observe(reveal);
    });
}

/* ======================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ====================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    if (!carousels.length) return;

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dotsContainer = carousel.parentElement.querySelector('.carousel-dots');
        let currentIndex = 0;

        slides.forEach((slide, index) => {
            slide.style.left = `${index * 100}%`;
        });

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots(index);
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === slides.length - 1;
        };

        const updateDots = (activeIndex) => {
            if (!dotsContainer) return;
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIndex);
            });
        };

        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.type = 'button';
                dot.addEventListener('click', () => updateCarousel(index));
                dotsContainer.appendChild(dot);
            });
        }

        prevBtn.addEventListener('click', () => {
            updateCarousel(Math.max(0, currentIndex - 1));
        });

        nextBtn.addEventListener('click', () => {
            updateCarousel(Math.min(slides.length - 1, currentIndex + 1));
        });

        updateCarousel(0);
    });
}

/* ======================================
   FORM VALIDATION & SUBMISSION
   ====================================== */

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('formMessage');

    // Basic validation
    if (!nameInput.value.trim()) {
        showFormMessage('Please enter your name', 'error');
        return;
    }

    if (!isValidEmail(emailInput.value)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    if (!subjectInput.value.trim()) {
        showFormMessage('Please enter a subject', 'error');
        return;
    }

    if (!messageInput.value.trim()) {
        showFormMessage('Please enter a message', 'error');
        return;
    }

    // If all validation passes, show success message
    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');

    // Reset form
    form.reset();

    // In a real application, you would send this data to a server
    // For now, we'll just log it to console
    console.log({
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

/* ======================================
   NAVBAR BACKGROUND ON SCROLL
   ====================================== */

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 31, 63, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 31, 63, 0.1)';
    }
});

/* ======================================
   ACTIVE NAV LINK HIGHLIGHT
   ====================================== */

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ======================================
   SKILL PROGRESS BAR ANIMATION
   ====================================== */

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        threshold: 0.5
    };

    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progressFill 1.5s ease-out forwards';
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateSkillBars);
} else {
    animateSkillBars();
}

/* ======================================
   PARALLAX SCROLL EFFECT
   ====================================== */

function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background');

    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            let scrollPosition = window.pageYOffset;
            element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });
}

initParallax();

/* ======================================
   COUNTER ANIMATION
   ====================================== */

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

/* ======================================
   PROJECT FILTER (OPTIONAL)
   ====================================== */

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
        });
    });
}

initProjectFilter();

/* ======================================
   MODAL FOR PROJECT DETAILS
   ====================================== */

function initProjectModals() {
    const projectButtons = document.querySelectorAll('.project-button');

    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.portfolio-card');
            const projectTitle = projectCard.querySelector('.project-content h3').textContent;
            showProjectModal(projectTitle);
        });
    });
}

function showProjectModal(title) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${title}</h2>
            <p>This is a detailed view of the project. In a real application, this would show more information about the project including screenshots, detailed description, technologies used, and results achieved.</p>
            <p>Contact me to learn more about this project or to discuss similar opportunities.</p>
            <a href="contact.html" class="cta-button">Get In Touch</a>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles if not already present
    if (!document.querySelector('style[data-modal]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal', 'true');
        style.textContent = `
            .modal {
                display: flex;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                align-items: center;
                justify-content: center;
                animation: fadeInUp 0.3s ease-out;
            }

            .modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 600px;
                width: 90%;
                position: relative;
                animation: slideInUp 0.3s ease-out;
            }

            .close-modal {
                position: absolute;
                right: 1rem;
                top: 1rem;
                font-size: 2rem;
                cursor: pointer;
                color: #999;
                transition: color 0.3s ease;
            }

            .close-modal:hover {
                color: #333;
            }

            .modal-content h2 {
                margin-bottom: 1rem;
                color: #001f3f;
            }

            .modal-content p {
                margin-bottom: 1rem;
                color: #7f8c8d;
                line-height: 1.8;
            }

            @media (max-width: 480px) {
                .modal-content {
                    padding: 1.5rem;
                }

                .modal-content h2 {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Initialize modals
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectModals);
} else {
    initProjectModals();
}

/* ======================================
   LOADING ANIMATION
   ====================================== */

function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(spinner);

    if (!document.querySelector('style[data-spinner]')) {
        const style = document.createElement('style');
        style.setAttribute('data-spinner', 'true');
        style.textContent = `
            .loading-spinner {
                display: flex;
                position: fixed;
                z-index: 3000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.9);
                align-items: center;
                justify-content: center;
            }

            .spinner {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #001f3f;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    return spinner;
}

function hideLoadingSpinner(spinner) {
    if (spinner) {
        spinner.style.opacity = '0';
        spinner.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            spinner.remove();
        }, 300);
    }
}

/* ======================================
   UTILITY FUNCTIONS
   ====================================== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ======================================
   PAGE LOAD ANIMATION
   ====================================== */

window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }

    // Animate elements on load
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal, index) => {
        setTimeout(() => {
            reveal.classList.add('active');
        }, index * 100);
    });
});

/* ======================================
   ACTIVE PAGE INDICATOR
   ====================================== */

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = '#0074D9';
            link.style.fontWeight = '700';
        }
    });
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightCurrentPage);
} else {
    highlightCurrentPage();
}

/* ======================================
   CONSOLE MESSAGE
   ====================================== */

console.log('%c 👋 Welcome to Jawayriah Khan\'s Portfolio!', 'color: #0074D9; font-size: 16px; font-weight: bold;');
console.log('%c If you like what you see, feel free to reach out at +923090392423 or hello@jawayriah.com', 'color: #7f8c8d; font-size: 12px;');
