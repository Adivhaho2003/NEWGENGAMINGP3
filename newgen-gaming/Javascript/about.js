// About Us Page JavaScript Enhancements
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
    
    // Initialize timeline animations
    initTimeline();
    
    // Initialize tabs functionality
    initTabs();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Initialize team member modals
    initTeamModals();
    
    // Initialize accordion functionality
    initAccordion();
    
    // Add scroll animations
    initScrollAnimations();
});

// Timeline Animations
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each timeline item
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Tabs Functionality
function initTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all headers and contents
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked header and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
        
        // Add keyboard accessibility
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all headers and contents
                tabHeaders.forEach(h => h.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked header and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            }
        });
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each stat number
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Counter animation function
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, stepTime);
    }
    
    // Format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Team Member Modals
function initTeamModals() {
    const teamMembers = document.querySelectorAll('.team-member');
    const modal = document.getElementById('teamModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    
    // Team member data
    const teamData = {
        adivhaho: {
            name: "Adivhaho JB",
            role: "Founder & CEO",
            icon: "crown",
            bio: "With over 10 years of gaming experience, Adivhaho envisioned a space where gamers could thrive together. His passion for gaming and community building led him to establish NextGen Gaming in 2020. Under his leadership, the company has grown from a small startup to a premier gaming destination.",
            achievements: [
                "Founded NextGen Gaming in 2020",
                "Grew community to 10,000+ members",
                "Hosted 100+ successful tournaments"
            ]
        },
        pandelani: {
            name: "Pandelani Ishmael",
            role: "Operations Manager",
            icon: "cogs",
            bio: "Pandelani ensures our facilities run smoothly and our events are executed flawlessly. With a background in business management and a passion for gaming, he brings operational excellence to every aspect of our business. His attention to detail ensures that every visitor has an exceptional experience.",
            achievements: [
                "Manages day-to-day operations",
                "Coordinates all major events",
                "Oversees facility maintenance"
            ]
        },
        shaun: {
            name: "Shaun Xavos",
            role: "Head of Esports",
            icon: "gamepad",
            bio: "Shaun brings professional gaming expertise to our tournaments and training programs. As a former competitive gamer with tournament experience, he understands what it takes to succeed in the esports world. He develops our training curriculum and ensures our tournaments meet professional standards.",
            achievements: [
                "Former competitive Valorant player",
                "Develops training programs",
                "Manages tournament operations"
            ]
        }
    };
    
    // Add click event to each team member
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            const memberData = teamData[memberId];
            
            if (memberData) {
                showMemberModal(memberData);
            }
        });
        
        // Add keyboard accessibility for team members
        member.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const memberId = this.getAttribute('data-member');
                const memberData = teamData[memberId];
                
                if (memberData) {
                    showMemberModal(memberData);
                }
            }
        });
    });
    
    // Show team member modal
    function showMemberModal(data) {
        modalBody.innerHTML = `
            <div class="modal-member">
                <div class="modal-member-icon">
                    <i class="fas fa-${data.icon}" aria-hidden="true"></i>
                </div>
                <h3>${data.name}</h3>
                <div class="modal-member-role">${data.role}</div>
                <div class="modal-member-bio">
                    <p>${data.bio}</p>
                    <h4 style="color: #64ffda; margin-top: 1.5rem;">Key Achievements:</h4>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        ${data.achievements.map(achievement => `<li style="margin-bottom: 0.5rem;">${achievement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'false');
        document.querySelector('main').setAttribute('aria-hidden', 'true');
    }
    
    // Close modal
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
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
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'true');
        document.querySelector('main').setAttribute('aria-hidden', 'false');
        
        // Return focus to the team member that opened the modal
        const activeMember = document.querySelector('.team-member:focus');
        if (activeMember) {
            activeMember.focus();
        }
    }
}

// Accordion Functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
        
        // Add keyboard accessibility
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                
                // Close all other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .value-item, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}