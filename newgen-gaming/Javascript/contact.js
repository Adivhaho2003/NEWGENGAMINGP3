// Contact Page JavaScript Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    document.getElementById('navToggle').addEventListener('click', function() {
        document.getElementById('mainNav').classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('mainNav').classList.remove('active');
        });
    });

    // Initialize interactive map
    initInteractiveMap();
    
    // Initialize form validation
    initFormValidation();
    
    // Add animations to contact items
    animateContactItems();

    // Initialize FAQ functionality
    initFAQ();
});

// Interactive Map using Leaflet
function initInteractiveMap() {
    // Check if map container exists
    const mapContainer = document.getElementById('interactiveMap');
    if (!mapContainer) {
        // Create interactive map container
        const interactiveMap = document.createElement('div');
        interactiveMap.id = 'interactiveMap';
        interactiveMap.setAttribute('aria-label', 'Interactive map showing NextGen Gaming location');
        document.querySelector('.map-placeholder').appendChild(interactiveMap);
        
        // Hide the static map
        const staticMap = document.querySelector('.map-placeholder iframe');
        if (staticMap) {
            staticMap.style.display = 'none';
        }
    }
    
    try {
        // Initialize Leaflet map
        const map = L.map('interactiveMap').setView([-26.1943338, 28.0307763], 15);
        
        // Add tile layer (using OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Custom icon for the marker
        const gamingIcon = L.divIcon({
            html: '<i class="fas fa-gamepad" aria-hidden="true"></i>',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            className: 'gaming-marker'
        });
        
        // Add marker for NextGen Gaming location
        const marker = L.marker([-26.1943338, 28.0307763], {icon: gamingIcon}).addTo(map);
        
        // Add popup with information
        marker.bindPopup(`
            <div style="text-align: center;">
                <h3 style="margin: 0 0 10px; color: #64ffda;">NextGen Gaming Hub</h3>
                <p style="margin: 0 0 10px;">28 Korte Street, Braamfontein<br>Johannesburg, 2017</p>
                <p style="margin: 0 0 10px; font-size: 0.9em; color: #8892b0;">
                    <i class="fas fa-clock" aria-hidden="true"></i> Open 10:00 AM - 10:00 PM
                </p>
                <a href="https://maps.google.com/?q=-26.1943338,28.0307763" target="_blank" 
                   style="display: inline-block; margin-top: 10px; padding: 5px 10px; 
                          background: #64ffda; color: #0a192f; text-decoration: none; border-radius: 4px;"
                   aria-label="Get directions to NextGen Gaming on Google Maps">
                    Get Directions
                </a>
            </div>
        `).openPopup();

        // Add click event to marker for accessibility
        marker.getElement().setAttribute('role', 'button');
        marker.getElement().setAttribute('aria-label', 'NextGen Gaming location marker. Click for more information');
        marker.getElement().setAttribute('tabindex', '0');
        
        // Add custom CSS for the marker
        const style = document.createElement('style');
        style.textContent = `
            .gaming-marker {
                background: #64ffda;
                color: #0a192f;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                border: 3px solid #112240;
                cursor: pointer;
            }
            .leaflet-popup-content-wrapper {
                background: #112240;
                color: #e0e0e0;
                border-radius: 8px;
            }
            .leaflet-popup-tip {
                background: #112240;
            }
            .leaflet-popup-close-button {
                color: #64ffda;
            }
            .leaflet-container {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
        `;
        document.head.appendChild(style);

        // Add keyboard support for map
        map.getContainer().setAttribute('tabindex', '0');
        map.getContainer().setAttribute('aria-label', 'Interactive map. Use arrow keys to navigate');

    } catch (error) {
        console.error('Error initializing map:', error);
        // Fallback: ensure static map is visible
        const staticMap = document.querySelector('.map-placeholder iframe');
        if (staticMap) {
            staticMap.style.display = 'block';
        }
    }
}

// Form Validation and Submission
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Create feedback element
    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'form-feedback';
    feedbackEl.setAttribute('aria-live', 'polite');
    contactForm.insertBefore(feedbackEl, contactForm.firstChild);
    
    // Form validation rules
    const validationRules = {
        contactName: {
            required: true,
            minLength: 2,
            message: 'Please enter your full name (at least 2 characters)'
        },
        contactEmail: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        contactPhone: {
            required: false,
            pattern: /^[\+]?[0-9\s\-\(\)]+$/,
            message: 'Please enter a valid phone number'
        },
        contactSubject: {
            required: true,
            message: 'Please select an inquiry type'
        },
        contactMessage: {
            required: true,
            minLength: 10,
            message: 'Please enter a message (at least 10 characters)'
        }
    };
    
    // Validate individual field
    function validateField(field) {
        const rules = validationRules[field.name];
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        let isValid = true;
        
        // Clear previous validation state
        formGroup.classList.remove('error', 'success');
        
        // Skip validation for non-required empty fields
        if (!rules.required && !value) {
            return true;
        }
        
        // Check required field
        if (rules.required && !value) {
            showError(formGroup, rules.message || 'This field is required');
            isValid = false;
        }
        // Check min length
        else if (rules.minLength && value.length < rules.minLength) {
            showError(formGroup, rules.message);
            isValid = false;
        }
        // Check pattern
        else if (rules.pattern && !rules.pattern.test(value)) {
            showError(formGroup, rules.message);
            isValid = false;
        }
        // Valid field
        else if (value) {
            formGroup.classList.add('success');
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(formGroup, message) {
        formGroup.classList.add('error');
        
        // Create or update error message
        let errorEl = formGroup.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.setAttribute('role', 'alert');
            formGroup.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }
    
    // Validate entire form
    function validateForm() {
        let isValid = true;
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Show form feedback
    function showFeedback(message, type) {
        feedbackEl.textContent = message;
        feedbackEl.className = `form-feedback ${type}`;
        feedbackEl.setAttribute('role', 'alert');
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showFeedback('Please fix the errors above before submitting.', 'error');
            // Focus on first error
            const firstError = contactForm.querySelector('.error input, .error textarea, .error select');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Disable submit button and show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        
        // Collect form data
        const formData = new FormData(contactForm);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // AJAX form submission simulation
        setTimeout(() => {
            // Show success message
            showFeedback('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
            
            // Log form data (in production, this would be sent to a server)
            console.log('Form submission:', formDataObj);
            
            // Prepare email content
            const emailSubject = `Contact Form: ${formDataObj.contactSubject}`;
            const emailBody = `
Name: ${formDataObj.contactName}
Email: ${formDataObj.contactEmail}
Phone: ${formDataObj.contactPhone}
Subject: ${formDataObj.contactSubject}
Message: ${formDataObj.contactMessage}
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:info@nextgengaming.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
            
            // Remove success classes
            contactForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success');
            });
            
            // Re-enable button
            submitBtn.disabled = false;
            btnText.textContent = originalText;
            
            // Scroll to feedback message
            feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Focus on feedback message for screen readers
            feedbackEl.focus();
            
        }, 2000);
    });
    
    // Real-time validation on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            // Clear error when user starts typing
            if (this.value.trim()) {
                const formGroup = this.closest('.form-group');
                formGroup.classList.remove('error');
                const errorEl = formGroup.querySelector('.error-message');
                if (errorEl) {
                    errorEl.remove();
                }
            }
        });
    });

    // Add keyboard navigation for form
    contactForm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
}

// Animate contact items on scroll
function animateContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Create intersection observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state and observe each item
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Animate FAQ items
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Make FAQ items more interactive
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-expanded', 'false');
        
        item.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.classList.add('active');
            } else {
                answer.style.maxHeight = '0';
                item.classList.remove('active');
            }
        });
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Initialize collapsed state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
    });
}

// Add additional utility functions
function formatPhoneNumber(phone) {
    // Basic phone number formatting for South African numbers
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 9) {
        return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    return phone;
}

// Initialize phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = formatPhoneNumber(this.value);
        });
    }
});