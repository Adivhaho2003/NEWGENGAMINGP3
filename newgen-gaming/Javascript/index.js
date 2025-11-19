// Home Page JavaScript Enhancements
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
    
    // Initialize gallery with lightbox
    initGallery();
    
    // Initialize accordion functionality
    initAccordion();
    
    // Load dynamic news content
    loadNewsContent();
    
    // Initialize search functionality
    initSearch();
    
    // Add scroll animations
    initScrollAnimations();
});

// Gallery with Lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    
    // Add click event to each gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            // Set lightbox content
            lightboxImage.src = img.getAttribute('data-fullsize');
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = `${title} - ${description}`;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
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
                item.classList.toggle('active');
            }
        });
    });
}

// Dynamic News Content
function loadNewsContent() {
    const newsFeed = document.getElementById('newsFeed');
    const loadMoreBtn = document.getElementById('loadMoreNews');
    
    // Sample news data
    const newsData = [
        {
            title: "New Valorant Tournament Announced",
            content: "We're excited to announce our next Valorant tournament with a $5,000 prize pool. Registration opens next week!",
            date: "2023-11-15"
        },
        {
            title: "NextGen Gaming Expands to New Location",
            content: "Due to popular demand, we're opening a second location in Sandton. Grand opening event scheduled for December.",
            date: "2023-11-10"
        },
        {
            title: "New Gaming PCs Arrived",
            content: "Our latest shipment of high-end gaming PCs with RTX 4090s is now available for booking. Experience true next-gen performance!",
            date: "2023-11-05"
        },
        {
            title: "Fortnite Fridays Return",
            content: "Our popular Fortnite Friday tournaments are back with new formats and bigger prizes. Solo and duo competitions available.",
            date: "2023-10-28"
        },
        {
            title: "Member Appreciation Week",
            content: "All members get 50% off hourly rates and free snacks during our member appreciation week from Nov 20-26.",
            date: "2023-10-25"
        }
    ];
    
    let displayedCount = 3; // Initially show 3 news items
    
    // Function to display news items
    function displayNewsItems(count) {
        newsFeed.innerHTML = ''; // Clear existing content
        
        for (let i = 0; i < count && i < newsData.length; i++) {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h4>${newsData[i].title}</h4>
                <p>${newsData[i].content}</p>
                <div class="news-date">${formatDate(newsData[i].date)}</div>
            `;
            newsFeed.appendChild(newsItem);
        }
        
        // Show/hide load more button
        if (count >= newsData.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Initial display
    displayNewsItems(displayedCount);
    
    // Load more news
    loadMoreBtn.addEventListener('click', function() {
        displayedCount += 2;
        displayNewsItems(displayedCount);
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('serviceSearch');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    // Sample search data
    const searchData = [
        { title: "Gaming PC Rental", category: "Service", description: "High-performance gaming PCs available for hourly rental." },
        { title: "Console Gaming", category: "Service", description: "Play on the latest PlayStation and Xbox consoles." },
        { title: "VR Experience", category: "Service", description: "Immerse yourself in virtual reality with our VR stations." },
        { title: "NextGen Pro Console", category: "Product", description: "Our flagship gaming console with cutting-edge specs." },
        { title: "Elite Gaming Headset", category: "Product", description: "Professional-grade headset with 7.1 surround sound." },
        { title: "Valorant Tournament", category: "Event", description: "Weekly Valorant competitions with cash prizes." },
        { title: "Fortnite Fridays", category: "Event", description: "Friday night Fortnite tournaments for all skill levels." },
        { title: "Membership Plans", category: "Service", description: "Exclusive benefits with our membership tiers." }
    ];
    
    // Perform search
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            searchResults.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        displaySearchResults(results, query);
    }
    
    // Display search results
    function displaySearchResults(results, query) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = `<p>No results found for "${query}". Try different keywords.</p>`;
            return;
        }
        
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <h4>${item.title} <span style="color: #8892b0; font-size: 0.8rem;">(${item.category})</span></h4>
                <p>${item.description}</p>
            `;
            searchResults.appendChild(resultItem);
        });
    }
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .gallery-item, .accordion');
    
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