// GSAP Animations
window.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Fade in nav
    gsap.from('.nav', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Stagger animate hero title lines
    const titleLines = document.querySelectorAll('.hero-title .line');
    if (titleLines.length > 0) {
        gsap.from(titleLines, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: 'power4.out',
            delay: 0.2,
            clearProps: 'all'
        });
    }

    // Fade in description and buttons
    gsap.from(['.hero-description', '.cta-buttons'], {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'all'
    });

    // Projects section animations
    gsap.from('.project-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Tools section animations
    gsap.from('.tool-item', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.tools',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Contact section animations
    gsap.from(['.contact-form', '.contact-info'], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate skill bars with improved trigger
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const parent = bar.closest('.skill-item');
        
        // Set initial state
        gsap.set(bar, { width: 0 });
        
        // Create the animation
        gsap.to(bar, {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: parent,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse',
                markers: false,
                onEnter: () => {
                    gsap.to(bar, {
                        width: `${level}%`,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        gsap.to(stat, {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            ease: 'power2.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcons(newTheme);
});

function updateIcons(theme) {
    if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Initialize icons based on current theme
updateIcons(document.body.getAttribute('data-theme') || 'light');

// About section animations
const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    }
});

aboutTimeline
    .from('.section-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.about-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.5')
    .from('.about-stats', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.5');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.classList.add('cursor');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Create cursor trail elements
    const trailElements = [];
    for (let i = 0; i < 10; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        document.body.appendChild(trail);
        trailElements.push(trail);
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    let trailPositions = Array(trailElements.length).fill().map(() => ({ x: 0, y: 0 }));

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement with easing
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        // Faster dot movement
        const dotDx = mouseX - cursorDotX;
        const dotDy = mouseY - cursorDotY;
        cursorDotX += dotDx * 0.35;
        cursorDotY += dotDy * 0.35;
        
        // Update cursor positions
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorDot.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px)`;
        
        // Update trail positions
        trailPositions.unshift({ x: cursorX, y: cursorY });
        trailPositions.pop();
        
        trailElements.forEach((trail, index) => {
            const pos = trailPositions[index];
            if (pos) {
                trail.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
                trail.style.opacity = 1 - (index / trailElements.length);
            }
        });
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Enhanced cursor hover effects
    document.querySelectorAll('a, button, .project-card, input, textarea').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
            cursorDot.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px) scale(1.5)`;
            cursor.style.borderColor = '#ff4d4d';
            cursorDot.style.backgroundColor = '#ff4d4d';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursorDot.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px) scale(1)`;
            cursor.style.borderColor = '';
            cursorDot.style.backgroundColor = '';
        });
    });
});