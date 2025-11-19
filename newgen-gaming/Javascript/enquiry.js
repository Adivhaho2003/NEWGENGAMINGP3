// Enquiry Page JavaScript
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

    // Initialize form validation
    initFormValidation();
    
    // Initialize option cards
    initOptionCards();
    
    // Initialize FAQ functionality
    initFAQ();
    
    // Set minimum date for date input to today
    setMinDate();
    
    // Initialize new enquiry button
    document.getElementById('newEnquiryBtn').addEventListener('click', function() {
        document.getElementById('enquiryResponse').style.display = 'none';
        document.getElementById('enquiryForm').style.display = 'block';
        document.getElementById('enquiryForm').reset();
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
    });
});

// Set minimum date for date input to today
function setMinDate() {
    const dateInput = document.getElementById('enquiryDate');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${year}-${month}-${day}`;
    }
}

// Initialize option cards
function initOptionCards() {
    const optionCards = document.querySelectorAll('.option-card');
    const enquiryTypeSelect = document.getElementById('enquiryType');
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            optionCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Update select value
            const option = this.getAttribute('data-option');
            enquiryTypeSelect.value = option;
            
            // Trigger change event to update form
            enquiryTypeSelect.dispatchEvent(new Event('change'));
        });
    });
    
    // Update card selection when select changes
    enquiryTypeSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        optionCards.forEach(card => {
            if (card.getAttribute('data-option') === selectedValue) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
        
        // Show/hide relevant form fields based on selection
        toggleFormFields(selectedValue);
    });
}

// Toggle form fields based on enquiry type
function toggleFormFields(enquiryType) {
    const dateField = document.getElementById('enquiryDate').closest('.form-group');
    const participantsField = document.getElementById('enquiryParticipants').closest('.form-group');
    const budgetField = document.getElementById('enquiryBudget').closest('.form-group');
    
    // Reset all fields to default state
    dateField.style.display = 'block';
    participantsField.style.display = 'block';
    budgetField.style.display = 'block';
    
    // Hide irrelevant fields based on enquiry type
    switch(enquiryType) {
        case 'gaming-services':
            // Show all fields for gaming services
            break;
        case 'products':
            // Hide date and participants for product enquiries
            dateField.style.display = 'none';
            participantsField.style.display = 'none';
            break;
        case 'volunteer':
            // Hide budget for volunteer enquiries
            budgetField.style.display = 'none';
            break;
        case 'sponsor':
            // Hide date and participants for sponsor enquiries
            dateField.style.display = 'none';
            participantsField.style.display = 'none';
            break;
        default:
            // Show all fields by default
            break;
    }
}

// Form Validation and Submission
function initFormValidation() {
    const enquiryForm = document.getElementById('enquiryForm');
    if (!enquiryForm) return;
    
    // Create feedback element
    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'form-feedback';
    feedbackEl.setAttribute('aria-live', 'polite');
    enquiryForm.insertBefore(feedbackEl, enquiryForm.firstChild);
    
    // Form validation rules
    const validationRules = {
        enquiryType: {
            required: true,
            message: 'Please select an enquiry type'
        },
        enquiryName: {
            required: true,
            minLength: 2,
            message: 'Please enter your full name (at least 2 characters)'
        },
        enquiryEmail: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        enquiryPhone: {
            required: false,
            pattern: /^[\+]?[0-9\s\-\(\)]+$/,
            message: 'Please enter a valid phone number'
        },
        enquiryDate: {
            required: false,
            message: 'Please enter a valid date'
        },
        enquiryParticipants: {
            required: false,
            message: 'Please enter a valid number of participants'
        },
        enquiryBudget: {
            required: false,
            message: 'Please select a budget range'
        },
        enquiryDetails: {
            required: true,
            minLength: 10,
            message: 'Please provide specific details (at least 10 characters)'
        }
    };
    
    // Validate individual field
    function validateField(field) {
        const rules = validationRules[field.name];
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        let isValid = true;
        
        // Skip validation if field is hidden
        if (formGroup.style.display === 'none') {
            return true;
        }
        
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
        const formFields = enquiryForm.querySelectorAll('input, textarea, select');
        
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
    
    // Generate response based on enquiry type
    function generateResponse(formData) {
        const enquiryType = formData.enquiryType;
        let responseHTML = '';
        
        switch(enquiryType) {
            case 'gaming-services':
                responseHTML = `
                    <h3>Gaming Services Information</h3>
                    <p>Thank you for your interest in our gaming services! Based on your enquiry, here's what we can offer:</p>
                    <ul>
                        <li><strong>Premium Gaming Stations:</strong> R150 per hour (minimum 2 hours)</li>
                        <li><strong>VR Experience:</strong> R200 per hour per person</li>
                        <li><strong>Tournament Participation:</strong> R50 entry fee per person</li>
                        <li><strong>Private Events:</strong> Starting from R2000 for up to 10 people</li>
                    </ul>
                    <p>Availability for your preferred date: <strong>${formData.enquiryDate || 'To be confirmed'}</strong></p>
                    <p>We'll contact you within 24 hours to confirm your booking and discuss any specific requirements.</p>
                `;
                break;
                
            case 'products':
                responseHTML = `
                    <h3>Product Information</h3>
                    <p>Thank you for your interest in our gaming products! Here's an overview of our offerings:</p>
                    <ul>
                        <li><strong>Gaming PCs:</strong> Starting from R8000 for entry-level builds</li>
                        <li><strong>Gaming Monitors:</strong> R2000 - R8000 depending on specs</li>
                        <li><strong>Gaming Peripherals:</strong> Keyboards from R500, mice from R300</li>
                        <li><strong>VR Equipment:</strong> Complete setups from R12000</li>
                    </ul>
                    <p>Based on your budget range: <strong>${getBudgetText(formData.enquiryBudget)}</strong>, we can recommend suitable options.</p>
                    <p>Our product specialist will contact you to discuss your specific requirements and provide detailed specifications.</p>
                `;
                break;
                
            case 'volunteer':
                responseHTML = `
                    <h3>Volunteer Opportunities</h3>
                    <p>Thank you for your interest in volunteering with NextGen Gaming! We're always looking for passionate individuals to join our team.</p>
                    <p>Current volunteer opportunities include:</p>
                    <ul>
                        <li><strong>Event Coordination:</strong> Help organize and run gaming tournaments</li>
                        <li><strong>Community Outreach:</strong> Engage with the gaming community online and in-person</li>
                        <li><strong>Technical Support:</strong> Assist with gaming equipment setup and maintenance</li>
                        <li><strong>Content Creation:</strong> Help create gaming content for our social media channels</li>
                    </ul>
                    <p>Volunteers receive perks including free gaming time, exclusive event access, and community recognition.</p>
                    <p>Our volunteer coordinator will contact you to discuss your interests and availability.</p>
                `;
                break;
                
            case 'sponsor':
                responseHTML = `
                    <h3>Sponsorship Opportunities</h3>
                    <p>Thank you for your interest in sponsoring NextGen Gaming! We offer various sponsorship packages:</p>
                    <ul>
                        <li><strong>Tournament Sponsorship:</strong> From R5000 per event</li>
                        <li><strong>Equipment Sponsorship:</strong> Provide gaming equipment for promotion</li>
                        <li><strong>Community Sponsorship:</strong> Support our community initiatives</li>
                        <li><strong>Venue Branding:</strong> Prominent placement in our gaming hub</li>
                    </ul>
                    <p>Sponsorship benefits include brand visibility, community engagement, and access to our gaming audience.</p>
                    <p>Our partnership manager will contact you to discuss customized sponsorship opportunities.</p>
                `;
                break;
                
            default:
                responseHTML = `
                    <h3>General Enquiry</h3>
                    <p>Thank you for your enquiry! We've received your message and will respond within 24 hours with the information you requested.</p>
                `;
                break;
        }
        
        return responseHTML;
    }
    
    // Get budget text for display
    function getBudgetText(budgetValue) {
        const budgetMap = {
            'under-500': 'Under R500',
            '500-1000': 'R500 - R1000',
            '1000-2500': 'R1000 - R2500',
            '2500-5000': 'R2500 - R5000',
            'over-5000': 'Over R5000'
        };
        
        return budgetMap[budgetValue] || 'Not specified';
    }
    
    // Handle form submission
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showFeedback('Please fix the errors above before submitting.', 'error');
            // Focus on first error
            const firstError = enquiryForm.querySelector('.error input, .error textarea, .error select');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Disable submit button and show loading state
        const submitBtn = enquiryForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        submitBtn.disabled = true;
        btnText.textContent = 'Processing...';
        
        // Collect form data
        const formData = new FormData(enquiryForm);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // Simulate form processing
        setTimeout(() => {
            // Generate and display response
            const responseHTML = generateResponse(formDataObj);
            document.getElementById('responseContent').innerHTML = responseHTML;
            
            // Show response section, hide form
            document.getElementById('enquiryResponse').style.display = 'block';
            enquiryForm.style.display = 'none';
            
            // Re-enable button
            submitBtn.disabled = false;
            btnText.textContent = originalText;
            
            // Scroll to response
            document.getElementById('enquiryResponse').scrollIntoView({ behavior: 'smooth' });
            
        }, 2000);
    });
    
    // Real-time validation on input
    enquiryForm.querySelectorAll('input, textarea, select').forEach(field => {
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
    enquiryForm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
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
    const phoneInput = document.getElementById('enquiryPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = formatPhoneNumber(this.value);
        });
    }
});