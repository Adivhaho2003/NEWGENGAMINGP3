// Services Page JavaScript Enhancements
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
    
    // Initialize search functionality
    initSearch();
    
    // Initialize filtering
    initFiltering();
    
    // Initialize tabs functionality
    initTabs();
    
    // Initialize booking modals
    initBookingModals();
    
    // Initialize lightbox for service images
    initLightbox();
    
    // Initialize events calendar
    initEventsCalendar();
    
    // Add scroll animations
    initScrollAnimations();
});

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('serviceSearch');
    const searchBtn = document.getElementById('searchBtn');
    const servicesGrid = document.getElementById('servicesGrid');
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const serviceCards = servicesGrid.querySelectorAll('.service-card');
        let visibleCount = 0;
        
        serviceCards.forEach(card => {
            const serviceName = card.querySelector('h2').textContent.toLowerCase();
            const serviceDescription = card.querySelector('p').textContent.toLowerCase();
            const serviceFeatures = card.querySelector('.service-features').textContent.toLowerCase();
            
            if (serviceName.includes(query) || serviceDescription.includes(query) || serviceFeatures.includes(query)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show no results message if needed
        showNoResultsMessage(visibleCount === 0);
    }
    
    function showNoResultsMessage(show) {
        let noResults = servicesGrid.querySelector('.no-results');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search" aria-hidden="true"></i>
                <h3>No gaming services found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for</p>
            `;
            servicesGrid.appendChild(noResults);
        } else if (!show && noResults) {
            noResults.remove();
        }
    }
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            performSearch();
        }
    });
}

// Filtering Functionality
function initFiltering() {
    const categoryFilter = document.getElementById('categoryFilter');
    const servicesGrid = document.getElementById('servicesGrid');
    
    function applyFilters() {
        const category = categoryFilter.value;
        const serviceCards = servicesGrid.querySelectorAll('.service-card');
        let visibleCount = 0;
        
        serviceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show no results message if needed
        showNoResultsMessage(visibleCount === 0);
    }
    
    function showNoResultsMessage(show) {
        let noResults = servicesGrid.querySelector('.no-results');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-filter" aria-hidden="true"></i>
                <h3>No services match your filter</h3>
                <p>Try selecting a different category or view all services</p>
            `;
            servicesGrid.appendChild(noResults);
        } else if (!show && noResults) {
            noResults.remove();
        }
    }
    
    // Event listener
    categoryFilter.addEventListener('change', applyFilters);
}

// Tabs Functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update ARIA attributes
            tabBtns.forEach(b => {
                b.setAttribute('aria-selected', 'false');
                b.classList.remove('active');
            });
            this.setAttribute('aria-selected', 'true');
            this.classList.add('active');
            
            // Show/hide service cards based on tab
            let visibleCount = 0;
            serviceCards.forEach(card => {
                const cardTab = card.getAttribute('data-tab');
                
                if (tab === 'all' || cardTab === tab) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Show no results message if needed
            showNoResultsMessage(visibleCount === 0);
        });
        
        // Add keyboard navigation
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tab = this.getAttribute('data-tab');
                
                // Update ARIA attributes
                tabBtns.forEach(b => {
                    b.setAttribute('aria-selected', 'false');
                    b.classList.remove('active');
                });
                this.setAttribute('aria-selected', 'true');
                this.classList.add('active');
                
                // Show/hide service cards based on tab
                serviceCards.forEach(card => {
                    const cardTab = card.getAttribute('data-tab');
                    
                    if (tab === 'all' || cardTab === tab) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
        });
    });
    
    function showNoResultsMessage(show) {
        let noResults = document.querySelector('.no-results');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-folder-open" aria-hidden="true"></i>
                <h3>No services in this category</h3>
                <p>Try selecting a different category or view all services</p>
            `;
            document.getElementById('servicesGrid').appendChild(noResults);
        } else if (!show && noResults) {
            noResults.remove();
        }
    }
}

// Booking Modals
function initBookingModals() {
    const bookingBtns = document.querySelectorAll('.btn-book, .btn-book-group, .btn-book-vr, .btn-register, .btn-view-events, .btn-view-menu');
    const modal = document.getElementById('bookingModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    
    // Service data for booking forms
    const serviceData = {
        'Premium Gaming Stations': {
            type: 'gaming-station',
            price: 'R120/hour',
            description: 'High-end gaming PCs with RTX 4080 graphics and 240Hz monitors',
            fields: ['name', 'email', 'phone', 'date', 'hours', 'station-type']
        },
        'Group Gaming Events': {
            type: 'group-booking',
            price: 'Starts at R400/hour',
            description: 'Perfect for parties and corporate events with group discounts',
            fields: ['name', 'email', 'phone', 'date', 'group-size', 'duration', 'special-requests']
        },
        'Virtual Reality Experiences': {
            type: 'vr-session',
            price: 'Starts at R150/session',
            description: 'Immersive VR gaming with latest titles and wireless headsets',
            fields: ['name', 'email', 'phone', 'date', 'session-type', 'participants']
        },
        'Gaming Workshops & Training': {
            type: 'workshop',
            price: 'R200/person',
            description: 'Learn from professional gamers and improve your skills',
            fields: ['name', 'email', 'phone', 'workshop-date', 'experience-level', 'topics-interest']
        },
        'Esports Tournaments & Events': {
            type: 'tournament',
            price: 'Varies by event',
            description: 'Competitive gaming tournaments with cash prizes',
            fields: ['name', 'email', 'phone', 'tournament-name', 'team-size', 'experience-level']
        },
        'Gaming Café & Refreshments': {
            type: 'cafe',
            price: 'Menu pricing',
            description: 'Premium snacks and refreshments for gamers',
            fields: ['name', 'email', 'phone', 'visit-date', 'party-size', 'special-requests']
        }
    };
    
    // Add click event to booking buttons
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('h2').textContent;
            const serviceInfo = serviceData[serviceName];
            
            if (serviceInfo) {
                showBookingModal(serviceName, serviceInfo);
            } else {
                // Default booking form for other services
                showBookingModal(serviceName, {
                    type: 'general',
                    price: 'Contact for pricing',
                    description: 'Premium gaming service',
                    fields: ['name', 'email', 'phone', 'date', 'service-type', 'message']
                });
            }
        });
        
        // Add keyboard accessibility
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const serviceCard = this.closest('.service-card');
                const serviceName = serviceCard.querySelector('h2').textContent;
                const serviceInfo = serviceData[serviceName];
                
                if (serviceInfo) {
                    showBookingModal(serviceName, serviceInfo);
                }
            }
        });
    });
    
    // Show booking modal
    function showBookingModal(serviceName, serviceInfo) {
        modalBody.innerHTML = `
            <div class="booking-form">
                <h2>Book ${serviceName}</h2>
                <p style="text-align: center; color: #64ffda; font-weight: 600; margin-bottom: 0.5rem;">${serviceInfo.description}</p>
                <p style="text-align: center; color: #8892b0; margin-bottom: 2rem;">Starting at ${serviceInfo.price}</p>
                
                <form id="bookingForm">
                    ${generateFormFields(serviceInfo.fields)}
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-confirm">Confirm Booking Request</button>
                        <button type="button" class="btn btn-cancel" id="cancelBooking">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'false');
        document.querySelector('main').setAttribute('aria-hidden', 'true');
        
        // Add event listeners to form
        const bookingForm = document.getElementById('bookingForm');
        const cancelBtn = document.getElementById('cancelBooking');
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmission(serviceName, serviceInfo);
        });
        
        cancelBtn.addEventListener('click', function() {
            closeModal();
        });
        
        // Focus on first form element
        const firstInput = bookingForm.querySelector('input, select, textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }
    
    // Generate form fields based on service type
    function generateFormFields(fields) {
        const fieldConfig = {
            'name': { type: 'text', label: 'Full Name', required: true },
            'email': { type: 'email', label: 'Email Address', required: true },
            'phone': { type: 'tel', label: 'Phone Number', required: true },
            'date': { type: 'date', label: 'Preferred Date', required: true },
            'hours': { type: 'number', label: 'Number of Hours', required: true, min: 1, max: 8 },
            'station-type': { 
                type: 'select', 
                label: 'Station Type', 
                options: ['Premium PC (RTX 4080)', 'Console Station', 'Streaming Setup'],
                required: true 
            },
            'group-size': { 
                type: 'select', 
                label: 'Group Size', 
                options: ['2-4 people', '5-8 people', '9+ people'],
                required: true 
            },
            'duration': { 
                type: 'select', 
                label: 'Duration', 
                options: ['2 hours', '4 hours', '6 hours', 'Full day (8 hours)'],
                required: true 
            },
            'special-requests': { type: 'textarea', label: 'Special Requests', required: false },
            'session-type': { 
                type: 'select', 
                label: 'Session Type', 
                options: ['30-min Session (R150)', '1-hour Session (R250)', 'Multiplayer Session (R400)'],
                required: true 
            },
            'participants': { type: 'number', label: 'Number of Participants', required: true, min: 1, max: 4 },
            'workshop-date': { 
                type: 'select', 
                label: 'Workshop Date', 
                options: ['Next Saturday (2:00 PM)', 'Next Wednesday (6:00 PM)'],
                required: true 
            },
            'experience-level': { 
                type: 'select', 
                label: 'Experience Level', 
                options: ['Beginner', 'Intermediate', 'Advanced'],
                required: true 
            },
            'topics-interest': { 
                type: 'select', 
                label: 'Topics of Interest', 
                options: ['Game Strategy', 'Streaming Setup', 'PC Building', 'All of the above'],
                required: true 
            },
            'tournament-name': { 
                type: 'select', 
                label: 'Tournament', 
                options: ['Valorant Championship', 'Fortnite Friday', 'CS:GO Community Night', 'League of Legends Showdown'],
                required: true 
            },
            'team-size': { 
                type: 'select', 
                label: 'Team Size', 
                options: ['Solo', 'Duos (2 players)', 'Team (5 players)'],
                required: true 
            },
            'visit-date': { type: 'date', label: 'Expected Visit Date', required: true },
            'party-size': { type: 'number', label: 'Number in Party', required: true, min: 1, max: 10 },
            'service-type': { 
                type: 'select', 
                label: 'Service Type', 
                options: ['Tournament Participation', 'Event Hosting', 'Private Booking', 'Other'],
                required: true 
            },
            'message': { type: 'textarea', label: 'Additional Information', required: false }
        };
        
        return fields.map(field => {
            const config = fieldConfig[field];
            if (!config) return '';
            
            const requiredAttr = config.required ? 'required' : '';
            const minAttr = config.min ? `min="${config.min}"` : '';
            const maxAttr = config.max ? `max="${config.max}"` : '';
            
            if (config.type === 'select') {
                return `
                    <div class="form-group">
                        <label for="${field}">${config.label}</label>
                        <select id="${field}" name="${field}" ${requiredAttr}>
                            <option value="">Select an option</option>
                            ${config.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else if (config.type === 'textarea') {
                return `
                    <div class="form-group">
                        <label for="${field}">${config.label}</label>
                        <textarea id="${field}" name="${field}" ${requiredAttr}></textarea>
                    </div>
                `;
            } else {
                return `
                    <div class="form-group">
                        <label for="${field}">${config.label}</label>
                        <input type="${config.type}" id="${field}" name="${field}" ${requiredAttr} ${minAttr} ${maxAttr}>
                    </div>
                `;
            }
        }).join('');
    }
    
    // Handle booking form submission
    function handleBookingSubmission(serviceName, serviceInfo) {
        const form = document.getElementById('bookingForm');
        const formData = new FormData(form);
        
        // Simulate booking process
        setTimeout(() => {
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: #64ffda; margin-bottom: 1rem;"></i>
                    <h2 style="color: #64ffda; margin-bottom: 1rem;">Booking Request Received!</h2>
                    <p style="color: #8892b0; margin-bottom: 2rem; line-height: 1.6;">
                        Thank you for your interest in ${serviceName}. We've received your booking request and will contact you within 24 hours to confirm availability and finalize the details.
                    </p>
                    <p style="color: #64ffda; font-weight: 600; margin-bottom: 2rem;">
                        Confirmation will be sent to your email shortly.
                    </p>
                    <button class="btn btn-confirm" id="closeModal">Close</button>
                </div>
            `;
            
            document.getElementById('closeModal').addEventListener('click', function() {
                closeModal();
            });
            
            // Focus on close button
            document.getElementById('closeModal').focus();
        }, 1000);
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'true');
        document.querySelector('main').setAttribute('aria-hidden', 'false');
        
        // Return focus to the button that opened the modal
        const activeButton = document.querySelector('.btn:focus');
        if (activeButton) {
            activeButton.focus();
        }
    }
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Lightbox for Service Images
function initLightbox() {
    const serviceImages = document.querySelectorAll('.image-container img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    
    serviceImages.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImage.src = this.getAttribute('data-fullsize');
            lightboxImage.alt = this.alt;
            lightboxCaption.textContent = this.alt;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Add keyboard accessibility for images
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                lightboxImage.src = this.getAttribute('data-fullsize');
                lightboxImage.alt = this.alt;
                lightboxCaption.textContent = this.alt;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Events Calendar
function initEventsCalendar() {
    const eventsCalendar = document.getElementById('eventsCalendar');
    const loadMoreBtn = document.getElementById('loadMoreEvents');
    
    // Sample events data
    const eventsData = [
        {
            date: '2023-11-25',
            title: 'Valorant Championship',
            description: 'Regional tournament with R10,000 prize pool and professional casting',
            time: '2:00 PM - 6:00 PM',
            participants: '32 teams maximum',
            type: 'Tournament'
        },
        {
            date: '2023-12-02',
            title: 'Fortnite Friday',
            description: 'Weekly Fortnite tournament for all skill levels with special rewards',
            time: '6:00 PM - 10:00 PM',
            participants: 'Solo & Duos competition',
            type: 'Weekly Event'
        },
        {
            date: '2023-12-09',
            title: 'CS:GO Community Night',
            description: 'Casual gaming night with community matches and friendly competition',
            time: '5:00 PM - 11:00 PM',
            participants: 'Open to all skill levels',
            type: 'Community Event'
        },
        {
            date: '2023-12-16',
            title: 'League of Legends Showdown',
            description: '5v5 tournament with special guest commentators and live streaming',
            time: '1:00 PM - 8:00 PM',
            participants: '16 team bracket',
            type: 'Major Tournament'
        }
    ];
    
    let displayedEvents = 2; // Initially show 2 events
    
    function displayEvents(count) {
        eventsCalendar.innerHTML = '';
        
        for (let i = 0; i < count && i < eventsData.length; i++) {
            const event = eventsData[i];
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
            
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">${formattedDate}</div>
                <div class="event-type">${event.type}</div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-details">
                    <span><i class="fas fa-clock" aria-hidden="true"></i> ${event.time}</span>
                    <span><i class="fas fa-users" aria-hidden="true"></i> ${event.participants}</span>
                </div>
                <button class="btn" style="margin-top: 1rem;">Register for Event</button>
            `;
            
            eventsCalendar.appendChild(eventCard);
        }
        
        // Show/hide load more button
        if (count >= eventsData.length) {
            loadMoreBtn.style.display = 'none';
            loadMoreBtn.textContent = 'All Events Loaded';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Initial display
    displayEvents(displayedEvents);
    
    // Load more events
    loadMoreBtn.addEventListener('click', function() {
        displayedEvents += 2;
        displayEvents(displayedEvents);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    const eventCards = document.querySelectorAll('.event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each service card
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Set initial state and observe each event card
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}