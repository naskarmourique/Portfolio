// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    initEntryAnimation();
    initScrollAnimations();
    initParallaxEffects();
    initMobileMenu();
    initSectionNavigation();
    initProjectFilters();
    initGalleryLightbox();
    initContactForm();
    initThemeSwitcher();
    init3DEffects();
});

// Entry animation
function initEntryAnimation() {
    const overlay = document.querySelector('.entry-animation-overlay');
    if (!overlay) return;
    
    // Create particles
    createEntryParticles();
    
    // Add 3D tilt effect to logo
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1)`;
        });
        
        logoContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
    
    // Hide overlay after animation completes
    setTimeout(() => {
        document.body.classList.add('entry-complete');
        animatePageElements();
    }, 4500);
}

// Create floating particles for entry animation
function createEntryParticles() {
    const overlay = document.querySelector('.entry-animation-overlay');
    if (!overlay) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('entry-particle');
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 4}s`;
        
        overlay.appendChild(particle);
    }
}

// Header behavior
function initHeaderBehavior() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Special animation for hero section elements
function animateHeroElements(heroSection) {
    const elements = heroSection.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + index * 200);
    });
}

// Special animation for project elements
function animateProjectElements(projectItems) {
    projectItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        
        // Add visible class with delay for staggered effect
        setTimeout(() => {
            item.classList.add('visible');
        }, 200 * index);
    });
}

// Special animation for gallery elements
function animateGalleryElements(galleryItems) {
    galleryItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        // Add visible class with delay for staggered effect
        setTimeout(() => {
            item.classList.add('visible');
        }, 150 * index);
    });
}

// Animate page elements after entry animation
function animatePageElements() {
    const header = document.getElementById('header');
    const heroSection = document.getElementById('home');
    
    if (header) {
        header.classList.add('visible');
        initHeaderBehavior();
    }
    
    if (heroSection) {
        heroSection.classList.add('visible');
        animateHeroElements(heroSection);
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate');
    });
    
    // Add animation classes to project items
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.add('animate');
    });
    
    // Add animation classes to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.add('animate');
    });
    
    // Create Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const sectionId = section.getAttribute('id');
                
                // Apply different animations based on section type
                if (sectionId === 'home') {
                    section.classList.add('visible');
                    animateHeroElements(section);
                } else if (sectionId === 'about') {
                    section.classList.add('visible');
                } else if (sectionId === 'projects') {
                    section.classList.add('visible');
                    // Project items have their own observer
                } else if (sectionId === 'gallery') {
                    section.classList.add('visible');
                    // Gallery items have their own observer
                } else {
                    section.classList.add('visible');
                }
                
                // Update active nav link
                updateActiveNavLink(sectionId);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    // Observe all sections and the contact footer
    document.querySelectorAll('section, footer#contact').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Create Intersection Observer for project items with staggered delay
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectItems = Array.from(document.querySelectorAll('.project-item.animate'));
                animateProjectElements(projectItems);
                
                // Unobserve after animation
                projectObserver.unobserve(document.querySelector('.projects-section'));
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe projects section
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectObserver.observe(projectsSection);
    }
    
    // Create Intersection Observer for gallery items with staggered delay
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const galleryItems = Array.from(document.querySelectorAll('.gallery-item.animate'));
                animateGalleryElements(galleryItems);
                
                // Unobserve after animation
                galleryObserver.unobserve(document.querySelector('.gallery-section'));
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe gallery section
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        galleryObserver.observe(gallerySection);
    }
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.1;
            const direction = element.getAttribute('data-direction') || 'both';
            
            let translateX = 0;
            let translateY = 0;
            
            if (direction === 'horizontal' || direction === 'both') {
                translateX = (mouseX - 0.5) * speed * 100;
            }
            
            if (direction === 'vertical' || direction === 'both') {
                translateY = (mouseY - 0.5) * speed * 100;
            }
            
            element.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Initialize section navigation
function initSectionNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                document.querySelector('.nav-links')?.classList.remove('active');
                document.querySelector('.mobile-menu-btn')?.classList.remove('active');
            }
        });
    });
}

// Initialize project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 100);
                    } else {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Initialize gallery lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            if (!imageSrc) return;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');
            
            const lightboxImage = document.createElement('img');
            lightboxImage.src = imageSrc;
            
            const closeButton = document.createElement('button');
            closeButton.classList.add('lightbox-close');
            closeButton.innerHTML = '&times;';
            
            // Append elements
            lightboxContent.appendChild(lightboxImage);
            lightboxContent.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Add animation class
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            // Close lightbox on button click
            closeButton.addEventListener('click', function() {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
            
            // Close lightbox on background click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                }
            });
        });
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.btn-submit');
            const submitText = submitButton.querySelector('.submit-text');
            const submitIcon = submitButton.querySelector('.submit-icon');
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.classList.add('submitting');
            submitText.textContent = 'Sending...';
            submitIcon.classList.remove('ph-paper-plane-tilt');
            submitIcon.classList.add('ph-spinner');
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                submitButton.classList.remove('submitting');
                submitButton.classList.add('success');
                submitText.textContent = 'Message Sent!';
                submitIcon.classList.remove('ph-spinner');
                submitIcon.classList.add('ph-check');
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('success');
                    submitText.textContent = 'Send Message';
                    submitIcon.classList.remove('ph-check');
                    submitIcon.classList.add('ph-paper-plane-tilt');
                }, 3000);
            }, 1500);
        });
    }
}

// Initialize theme switcher
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'light') {
                themeToggle.classList.add('active');
            }
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize 3D effects
function init3DEffects() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}