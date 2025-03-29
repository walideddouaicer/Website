// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // REVISED: Fix animations to trigger on scroll
    
    // First, disable all animations by removing animation names
    const processCards = document.querySelectorAll('.process-card');
    const serviceCards = document.querySelectorAll('.service-card');
    const animationTitles = document.querySelectorAll('.animation-title');
    
    // Remove animation classes from process cards
    processCards.forEach(card => {
        // Save the animation direction but remove the actual animation
        const animationType = card.getAttribute('data-animation');
        card.classList.remove(animationType);
        
        // Make sure cards are invisible initially
        card.style.opacity = "0";
    });
    
    // Remove animation classes from service cards
    serviceCards.forEach(card => {
        const animationType = card.getAttribute('data-animation');
        card.classList.remove(animationType);
        
        // Make sure cards are invisible initially
        card.style.opacity = "0";
    });
    
    // Reset progress bars
    const processProgressBar = document.querySelector('.process .progress-bar');
    const servicesProgressBar = document.querySelector('.services-progress .progress-bar');
    
    if (processProgressBar) {
        processProgressBar.style.width = "0%";
    }
    
    if (servicesProgressBar) {
        servicesProgressBar.style.width = "0%";
    }
    
    // Animation titles (h2 and p in section headers)
    animationTitles.forEach(title => {
        const titleH2 = title.querySelector('h2');
        const titleP = title.querySelector('p');
        
        if (titleH2) {
            titleH2.style.opacity = "0";
            titleH2.style.animation = "none";
        }
        
        if (titleP) {
            titleP.style.opacity = "0";
            titleP.style.animation = "none";
        }
    });
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom > 0
        );
    }
    
    // Function to animate process section
    function animateProcessSection() {
        // Animate section title
        const titleSection = document.querySelector('#process .animation-title');
        if (titleSection) {
            const titleH2 = titleSection.querySelector('h2');
            const titleP = titleSection.querySelector('p');
            
            if (titleH2) {
                titleH2.style.opacity = "1";
                titleH2.style.animation = "slideInDown 1s ease-out forwards";
            }
            
            if (titleP) {
                titleP.style.opacity = "1";
                titleP.style.animation = "fadeIn 1.5s ease-out forwards";
            }
        }
        
        // Animate process cards sequentially
        processCards.forEach((card, index) => {
            setTimeout(() => {
                // Get the original animation type
                const animationType = card.getAttribute('data-animation');
                card.style.opacity = "1";
                card.style.animation = `${animationType} 0.8s ease forwards`;
            }, index * 200);
        });
        
        // Animate process numbers
        const processNumbers = document.querySelectorAll('.process-number');
        processNumbers.forEach((number, index) => {
            setTimeout(() => {
                number.classList.add('pulse-animation');
            }, index * 300);
        });
        
        // Animate progress bar
        if (processProgressBar) {
            setTimeout(() => {
                processProgressBar.style.width = "100%";
                processProgressBar.style.transition = "width 2s ease-out";
            }, 500);
        }
    }
    
    // Function to animate services section
    function animateServicesSection() {
        // Animate section title
        const titleSection = document.querySelector('#services .animation-title');
        if (titleSection) {
            const titleH2 = titleSection.querySelector('h2');
            const titleP = titleSection.querySelector('p');
            
            if (titleH2) {
                titleH2.style.opacity = "1";
                titleH2.style.animation = "slideInDown 1s ease-out forwards";
            }
            
            if (titleP) {
                titleP.style.opacity = "1";
                titleP.style.animation = "fadeIn 1.5s ease-out forwards";
            }
        }
        
        // Animate service cards sequentially
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                // Get the original animation type
                const animationType = card.getAttribute('data-animation');
                card.style.opacity = "1";
                card.style.animation = `${animationType} 0.8s ease forwards`;
            }, index * 200);
        });
        
        // Animate progress bar
        if (servicesProgressBar) {
            setTimeout(() => {
                servicesProgressBar.style.width = "100%";
                servicesProgressBar.style.transition = "width 2s ease-out";
            }, 500);
        }
    }
    
    // Track if sections have been animated
    let processAnimated = false;
    let servicesAnimated = false;
    
    // Scroll event listener to check if sections are in view
    window.addEventListener('scroll', function() {
        const processSection = document.getElementById('process');
        const servicesSection = document.getElementById('services');
        
        // Check if process section is in view and not yet animated
        if (!processAnimated && isInViewport(processSection)) {
            animateProcessSection();
            processAnimated = true;
        }
        
        // Check if services section is in view and not yet animated
        if (!servicesAnimated && isInViewport(servicesSection)) {
            animateServicesSection();
            servicesAnimated = true;
        }
    });
    
    // Trigger check on initial page load (after a slight delay to ensure DOM is ready)
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 200);

    const detailsToggles = document.querySelectorAll('.service-details-toggle');
    
    detailsToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const card = this.closest('.service-card');
            const details = card.querySelector('.service-details');
            const icon = this.querySelector('i');
            
            if (details.classList.contains('active')) {
                details.classList.remove('active');
                this.innerHTML = 'Learn More <i class="fas fa-chevron-down"></i>';
            } else {
                details.classList.add('active');
                this.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
            }
        });
    });
    
    // Business size tabs functionality
    const sizeTabs = document.querySelectorAll('.size-tab');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    sizeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            sizeTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get selected business size
            const selectedSize = this.getAttribute('data-size');
            
            // Hide all pricing cards first
            pricingCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show only cards for selected size
            document.querySelectorAll(`.pricing-card[data-size="${selectedSize}"]`).forEach(card => {
                card.style.display = 'block';
            });
            
            // If no cards match, show all
            if (document.querySelectorAll(`.pricing-card[data-size="${selectedSize}"]`).length === 0) {
                pricingCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    });
    
    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.fa-plus').style.transform = 'rotate(0deg)';
            });
            
            // If clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
                this.querySelector('.fa-plus').style.transform = 'rotate(45deg)';
            }
        });
    });
    
    // Quote calculator functionality
    const pagesRange = document.getElementById('pagesRange');
    const pagesValue = document.getElementById('pagesValue');
    const featureCheckboxes = document.querySelectorAll('input[name="features"]');
    const designComplexity = document.getElementById('designComplexity');
    const estimatedPrice = document.getElementById('estimatedPrice');
    
    // Base prices
    const basePrice = 1500;
    const pricePerPage = 100;
    const featurePrices = {
        'responsive': 200,
        'ecommerce': 500,
        'seo': 300,
        'cms': 250
    };
    const designPrices = {
        'basic': 0,
        'custom': 500,
        'premium': 1200
    };
    
    function updateEstimate() {
        let total = basePrice;
        
        // Add price for pages
        total += (parseInt(pagesRange.value) - 5) * pricePerPage;
        
        // Add price for features
        featureCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += featurePrices[checkbox.value];
            }
        });
        
        // Add price for design complexity
        total += designPrices[designComplexity.value];
        
        // Update the displayed price
        estimatedPrice.textContent = '$' + total.toLocaleString();
    }
    
    // Update pages value display
    pagesRange.addEventListener('input', function() {
        pagesValue.textContent = this.value;
        updateEstimate();
    });
    
    // Listen for changes on feature checkboxes
    featureCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateEstimate);
    });
    
    // Listen for changes on design complexity
    designComplexity.addEventListener('change', updateEstimate);
    
    // Initialize with default values
    updateEstimate();
    
    // Team bio toggle functionality
    const bioToggles = document.querySelectorAll('.bio-toggle');
    
    bioToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const member = this.closest('.team-member');
            const bio = member.querySelector('.team-expanded-bio');
            const icon = this.querySelector('i');
            
            if (bio.classList.contains('active')) {
                bio.classList.remove('active');
                this.innerHTML = 'View Bio <i class="fas fa-chevron-down"></i>';
            } else {
                bio.classList.add('active');
                this.innerHTML = 'Hide Bio <i class="fas fa-chevron-up"></i>';
            }
        });
    });
});
















