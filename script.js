document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.nav-dots');
    const progressBar = document.querySelector('.progress-bar');
    let currentSlide = 0;
    let isScrolling = false;
    let scrollTimeout;
    
    // Initialize the presentation
    function init() {
        createNavigationDots();
        setActiveSlide(0);
        setupEventListeners();
        setupQuiz();
        animateOnScroll();
    }
    
    // Create navigation dots
    function createNavigationDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key >= '1' && e.key <= '9') {
                const slideIndex = parseInt(e.key) - 1;
                if (slideIndex < slides.length) {
                    goToSlide(slideIndex);
                }
            }
        });
        
        // Touch events for mobile
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
        
        // Mouse wheel for desktop
        window.addEventListener('wheel', handleScroll, { passive: false });
        
        // Handle URL hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '');
            if (hash) {
                const slideIndex = parseInt(hash) - 1;
                if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < slides.length) {
                    goToSlide(slideIndex);
                }
            }
        });
    }
    
    // Handle scroll events with debounce
    function handleScroll(e) {
        if (isScrolling) return;
        
        // Prevent default to avoid page scrolling
        e.preventDefault();
        
        // Determine scroll direction
        const delta = Math.sign(e.deltaY);
        
        // Only proceed if we're not at the boundaries when trying to scroll further
        if ((delta > 0 && currentSlide < slides.length - 1) || 
            (delta < 0 && currentSlide > 0)) {
            
            // Set scrolling flag immediately
            isScrolling = true;
            
            if (delta > 0) {
                nextSlide();
            } else if (delta < 0) {
                prevSlide();
            }
            
            // Reset the flag after animation completes
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 800); // Match this with your CSS transition time
        }
    }
    
    // Handle touch swipe
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to consider it a swipe
        const swipeDistanceY = touchStartY - touchEndY;
        const swipeDistanceX = touchStartX - touchEndX;
        
        // Only process if it's mostly a vertical swipe
        if (Math.abs(swipeDistanceY) < swipeThreshold || Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
            return;
        }
        
        if (swipeDistanceY > 0) {
            // Swipe up - next slide
            nextSlide();
        } else {
            // Swipe down - previous slide
            prevSlide();
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        
        // Update URL hash
        window.location.hash = `#${index + 1}`;
        
        setActiveSlide(index);
    }
    
    // Go to next slide
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
            return true;
        }
        return false;
    }
    
    // Go to previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
            return true;
        }
        return false;
    }
    
    // Set active slide
    function setActiveSlide(index) {
        // Update current slide
        currentSlide = index;
        
        // Update slide visibility
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update navigation dots
        updateDots();
        
        // Update progress bar
        updateProgressBar();
        
        // Animate elements in the current slide
        animateSlideElements();
    }
    
    // Update navigation dots
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Animate elements in the current slide
    function animateSlideElements() {
        const currentSlideEl = slides[currentSlide];
        const elements = currentSlideEl.querySelectorAll('h2, h3, p, .card, .sign, .example-card, .practice');
        
        elements.forEach((element, index) => {
            // Reset animation
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'none';
            
            // Trigger reflow
            void element.offsetWidth;
            
            // Apply animation with delay
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
    
    // Set up quiz functionality
    function setupQuiz() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        
        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const isCorrect = this.getAttribute('data-correct') === 'true';
                const feedback = this.closest('.quiz-slide').querySelector('.quiz-feedback');
                
                // Disable all options after selection
                quizOptions.forEach(opt => opt.style.pointerEvents = 'none');
                
                // Show feedback
                feedback.textContent = isCorrect 
                    ? '✅ Correct! This is the right approach. Always verify with the official source before taking any action.' 
                    : '❌ Incorrect. Be cautious! Never click on links or provide personal information in response to unsolicited messages.';
                
                feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'} show`;
                
                // Update button styles
                if (isCorrect) {
                    this.classList.add('correct');
                } else {
                    this.classList.add('incorrect');
                    // Find and highlight the correct answer
                    const correctOption = Array.from(quizOptions).find(opt => opt.getAttribute('data-correct') === 'true');
                    if (correctOption) correctOption.classList.add('correct');
                }
                
                // Reset after delay
                setTimeout(() => {
                    quizOptions.forEach(opt => {
                        opt.style.pointerEvents = 'auto';
                        opt.classList.remove('correct', 'incorrect');
                    });
                    feedback.className = 'quiz-feedback';
                }, 5000);
            });
        });
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all elements that should animate on scroll
        document.querySelectorAll('.card, .sign, .example-card, .practice').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize the presentation
    init();
});
