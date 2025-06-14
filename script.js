// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const htmlElement = document.documentElement; // Target the HTML element for background
    const sparkleContainer = document.querySelector('.sparkle-container');

    // Define light colors for the HTML background to cycle through
    // Using getComputedStyle to read directly from CSS variables for dynamic consistency
    const bodyBgColors = [
        getComputedStyle(htmlElement).getPropertyValue('--page-bg-color1'),
        getComputedStyle(htmlElement).getPropertyValue('--page-bg-color2'),
        getComputedStyle(htmlElement).getPropertyValue('--page-bg-color3'),
        getComputedStyle(htmlElement).getPropertyValue('--page-bg-color4'),
        getComputedStyle(htmlElement).getPropertyValue('--page-bg-color5')
    ];

    // Colors for the NAVBAR background (subtle shades of white)
    const navbarScrolledColors = [
        'rgba(255, 255, 255, 0.95)', // White with slight transparency
        'rgba(248, 249, 250, 0.95)'  // Off-white with slight transparency
    ];
    let currentNavbarColorIndex = 0;

    let currentBodyColorIndex = 0;

    // Function to handle scroll events for both navbar and HTML background
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const navbarScrollThreshold = 80; // When navbar gets shadow/color
        const bodyColorChangeInterval = 500; // Change body color every 500 pixels scrolled

        // --- Navbar behavior (SkillCraft Technology area) ---
        if (scrollPosition > navbarScrollThreshold) {
            navbar.classList.add('scrolled');
            // Cycle navbar background between white/off-white for subtlety
            // This ensures the SkillCraft area maintains its distinct look
            const newNavbarColorIndex = Math.floor(scrollPosition / 200) % navbarScrolledColors.length; // Faster cycle for navbar
            if (newNavbarColorIndex !== currentNavbarColorIndex) {
                currentNavbarColorIndex = newNavbarColorIndex;
                navbar.style.backgroundColor = navbarScrolledColors[currentNavbarColorIndex];
            }
             // Ensure navbar has a background if it transitions from initial state
             if (!navbar.style.backgroundColor || navbar.style.backgroundColor === 'rgba(0, 0, 0, 0)') { // Check for empty or transparent
                navbar.style.backgroundColor = navbarScrolledColors[currentNavbarColorIndex];
             }

        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = ''; // Reset to CSS defined initial background (var(--navbar-initial-bg))
            currentNavbarColorIndex = 0;
        }

        // --- HTML (page) background color change ---
        // This is the "all white without any text" background that changes
        const newBodyColorIndex = Math.floor(scrollPosition / bodyColorChangeInterval) % bodyBgColors.length;

        if (newBodyColorIndex !== currentBodyColorIndex) {
            currentBodyColorIndex = newBodyColorIndex;
            htmlElement.style.backgroundColor = bodyBgColors[currentBodyColorIndex];
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check in case the page is loaded with a scroll position
    handleScroll();

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor link behavior

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = navbar.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Dynamic Sparkle Generation ---
    // This creates the "grand" sparkle effect
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Random size for varied sparkle appearance
        const size = Math.random() * 5 + 2; // Between 2px and 7px
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        // Random position within the viewport
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;

        // Random animation delay for staggered appearance
        sparkle.style.animationDelay = `${Math.random() * 3}s`; // Max 3 seconds delay

        sparkleContainer.appendChild(sparkle);

        // Remove sparkle after its animation to prevent too many DOM elements and maintain performance
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }

    // Continuously add new sparkles to create a constant effect
    // Adjust the interval to control the density/frequency of sparkles
    setInterval(createSparkle, 300); // Add a new sparkle every 300ms
});
