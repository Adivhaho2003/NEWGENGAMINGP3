// Products Page JavaScript Enhancements
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
    
    // Initialize product modals
    initProductModals();
    
    // Initialize lightbox for product images
    initLightbox();
    
    // Initialize load more functionality
    initLoadMore();
    
    // Add scroll animations
    initScrollAnimations();
});

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('productSearch');
    const searchBtn = document.getElementById('searchBtn');
    const productsGrid = document.getElementById('productsGrid');
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const productCards = productsGrid.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const productName = card.querySelector('h2').textContent.toLowerCase();
            const productDescription = card.querySelector('p').textContent.toLowerCase();
            const productFeatures = card.querySelector('.product-features').textContent.toLowerCase();
            
            if (productName.includes(query) || productDescription.includes(query) || productFeatures.includes(query)) {
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
        let noResults = productsGrid.querySelector('.no-results');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search" aria-hidden="true"></i>
                <h3>No gaming products found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for</p>
            `;
            productsGrid.appendChild(noResults);
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
    const priceFilter = document.getElementById('priceFilter');
    const productsGrid = document.getElementById('productsGrid');
    
    function applyFilters() {
        const category = categoryFilter.value;
        const price = priceFilter.value;
        const productCards = productsGrid.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardPrice = card.getAttribute('data-price');
            
            const categoryMatch = category === 'all' || cardCategory === category;
            const priceMatch = price === 'all' || cardPrice === price;
            
            if (categoryMatch && priceMatch) {
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
        let noResults = productsGrid.querySelector('.no-results');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-filter" aria-hidden="true"></i>
                <h3>No products match your filters</h3>
                <p>Try adjusting your category or price filters</p>
            `;
            productsGrid.appendChild(noResults);
        } else if (!show && noResults) {
            noResults.remove();
        }
    }
    
    // Event listeners
    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
}

// Product Modals
function initProductModals() {
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    
    // Product data
    const productData = {
        'High-Performance Gaming PCs': {
            name: "NextGen Pro Gaming PC",
            price: "Starting at R15,999",
            description: "Custom-built gaming desktops with the latest components for maximum performance. Perfect for competitive gaming, streaming, and content creation. Each system is hand-built and tested for optimal performance.",
            specs: [
                "NVIDIA GeForce RTX 4080 Graphics Card",
                "Intel Core i9-13900K Processor",
                "32GB DDR5 RAM (6000MHz)",
                "2TB NVMe Gen4 SSD Storage",
                "360mm AIO Liquid Cooling System",
                "Custom RGB Lighting with Software Control",
                "850W 80+ Gold Power Supply",
                "Windows 11 Pro Pre-installed"
            ],
            image: "Images/download (14).jfif",
            category: "Gaming PC"
        },
        'Portable Gaming Laptops': {
            name: "NextGen Elite Gaming Laptop",
            price: "Starting at R12,499",
            description: "Powerful portable gaming machines for those who need performance on the go. Never compromise on performance, even when traveling. Features advanced cooling and high-refresh displays.",
            specs: [
                "NVIDIA GeForce RTX 4070 Graphics",
                "Intel Core i7-13700H Processor",
                "16GB DDR5 RAM (4800MHz)",
                "1TB NVMe PCIe 4.0 SSD",
                "15.6\" QHD 240Hz IPS Display",
                "Advanced Vapor Chamber Cooling",
                "Per-key RGB Keyboard",
                "Thunderbolt 4 Connectivity"
            ],
            image: "Images/download (3).jfif",
            category: "Gaming Laptop"
        },
        'Gaming Peripherals Bundle': {
            name: "NextGen Pro Peripherals Bundle",
            price: "From R899",
            description: "Complete your setup with our premium gaming peripherals. Designed for precision, comfort, and durability. Each component is engineered for competitive gaming performance.",
            specs: [
                "Mechanical RGB Gaming Keyboard (Hot-swappable)",
                "25,600 DPI Optical Gaming Mouse",
                "7.1 Surround Sound Gaming Headset",
                "900x400mm RGB Gaming Mousepad",
                "Fully Customizable RGB Lighting",
                "Ergonomic Design for Long Sessions",
                "Braided Cables with Gold Plated USB"
            ],
            image: "Images/download (5).jfif",
            category: "Peripherals"
        },
        'Ergonomic Gaming Chairs': {
            name: "NextGen Pro Gaming Chair",
            price: "From R2,499",
            description: "Ergonomic chairs designed for long gaming sessions with maximum comfort. Your back will thank you after those marathon sessions. Features premium materials and adjustable support.",
            specs: [
                "High-Density Memory Foam Cushioning",
                "4D Adjustable Armrests",
                "Adjustable Lumbar and Neck Support",
                "Premium PU Leather with Cooling Gel",
                "360° Swivel with Smooth-roll Casters",
                "Class-4 Heavy Duty Gas Lift",
                "Reclining Backrest (90-165 degrees)",
                "Steel Frame Construction"
            ],
            image: "Images/download (7).jfif",
            category: "Gaming Chair"
        },
        'Console Gaming Accessories': {
            name: "NextGen Console Pro Pack",
            price: "From R699",
            description: "Enhance your console gaming experience with our premium accessories. Compatible with PlayStation, Xbox, and Nintendo Switch. Official licenses and premium build quality.",
            specs: [
                "Wireless Pro Controller with Paddles",
                "Gaming Headset with Noise-canceling Mic",
                "Dual Controller Charging Station",
                "Protective Travel Cases",
                "Enhanced Grips and Thumbsticks",
                "Official Console Licenses",
                "2-Year Warranty",
                "Quick Charge Technology"
            ],
            image: "Images/download (9).jfif",
            category: "Console Accessories"
        },
        'Gaming Merchandise Collection': {
            name: "NextGen Gaming Collection",
            price: "From R299",
            description: "Show your gaming pride with our official merchandise. High-quality apparel and collectibles for true gamers. Limited edition designs and premium materials.",
            specs: [
                "Premium 100% Cotton T-Shirts",
                "Limited Edition Embroidered Hoodies",
                "Collector's Edition Statues and Figures",
                "Official NextGen Gaming Branding",
                "Full Size Range Available (XS-5XL)",
                "Exclusive Community Designs",
                "Premium Packaging",
                "Limited Stock Items"
            ],
            image: "Images/p1.jpg",
            category: "Merchandise"
        }
    };
    
    // Add click event to view details buttons
    productCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.btn-view-details');
        const productName = card.querySelector('h2').textContent;
        
        viewDetailsBtn.addEventListener('click', function() {
            const productInfo = productData[productName];
            if (productInfo) {
                showProductModal(productInfo);
            }
        });
        
        // Add keyboard accessibility
        viewDetailsBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const productInfo = productData[productName];
                if (productInfo) {
                    showProductModal(productInfo);
                }
            }
        });
    });
    
    // Show product modal
    function showProductModal(data) {
        modalBody.innerHTML = `
            <div class="modal-product">
                <div class="modal-product-image">
                    <img src="${data.image}" alt="${data.name}" loading="lazy">
                </div>
                <div class="modal-product-info">
                    <h2>${data.name}</h2>
                    <div class="modal-product-category">${data.category}</div>
                    <div class="modal-product-price">${data.price}</div>
                    <div class="modal-product-description">
                        <p>${data.description}</p>
                    </div>
                    <div class="modal-product-specs">
                        <h3>Technical Specifications</h3>
                        <ul>
                            ${data.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-product-actions">
                        <button class="btn btn-buy" aria-label="Add ${data.name} to cart">
                            <i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart
                        </button>
                        <button class="btn btn-wishlist" aria-label="Add ${data.name} to wishlist">
                            <i class="fas fa-heart" aria-hidden="true"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'false');
        document.querySelector('main').setAttribute('aria-hidden', 'true');
        
        // Add event listeners to modal buttons
        const buyBtn = modalBody.querySelector('.btn-buy');
        const wishlistBtn = modalBody.querySelector('.btn-wishlist');
        
        buyBtn.addEventListener('click', function() {
            alert(`${data.name} added to cart!`);
            closeModal();
        });
        
        wishlistBtn.addEventListener('click', function() {
            alert(`${data.name} added to wishlist!`);
        });
        
        // Add keyboard navigation for modal buttons
        buyBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                alert(`${data.name} added to cart!`);
                closeModal();
            }
        });
        
        wishlistBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                alert(`${data.name} added to wishlist!`);
            }
        });
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'true');
        document.querySelector('main').setAttribute('aria-hidden', 'false');
        
        // Return focus to the button that opened the modal
        const activeButton = document.querySelector('.btn-view-details:focus');
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

// Lightbox for Product Images
function initLightbox() {
    const productImages = document.querySelectorAll('.image-container img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    
    productImages.forEach(img => {
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

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const productsGrid = document.getElementById('productsGrid');
    
    // Sample additional products data
    const additionalProducts = [
        {
            category: "pc",
            price: "high",
            icon: "fas fa-desktop",
            name: "Ultra Gaming PC Pro",
            description: "Extreme performance for professional gamers, streamers, and content creators.",
            priceText: "R22,999",
            features: ["RTX 4090", "64GB RAM", "Custom Water Loop"]
        },
        {
            category: "peripheral",
            price: "medium",
            icon: "fas fa-headset",
            name: "Pro Gaming Headset",
            description: "Crystal clear audio with noise-canceling microphone for competitive advantage.",
            priceText: "R1,499",
            features: ["7.1 Surround", "Noise Cancel", "Wireless Pro"]
        }
    ];
    
    let loadedCount = 0;
    
    loadMoreBtn.addEventListener('click', function() {
        // In a real application, this would be an API call
        setTimeout(() => {
            if (loadedCount < additionalProducts.length) {
                const product = additionalProducts[loadedCount];
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
                loadedCount++;
                
                // Re-initialize event listeners for new cards
                initProductModals();
                initLightbox();
                initScrollAnimations();
                
                // Hide button if no more products
                if (loadedCount >= additionalProducts.length) {
                    loadMoreBtn.style.display = 'none';
                    loadMoreBtn.textContent = 'All Products Loaded';
                }
            }
        }, 500);
    });
    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        card.setAttribute('data-price', product.price);
        
        card.innerHTML = `
            <div class="product-icon">
                <i class="${product.icon}" aria-hidden="true"></i>
            </div>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="price">${product.priceText}</div>
            <div class="image-container">
                <img src="Images/download (2).jfif" alt="${product.name}" data-fullsize="Images/download (2).jfif" loading="lazy">
                <img src="Images/download (4).jfif" alt="${product.name} setup" data-fullsize="Images/download (4).jfif" loading="lazy">
            </div>
            <div class="product-features">
                ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <button class="btn btn-view-details">View Details & Specs</button>
        `;
        
        return card;
    }
}

// Scroll Animations
function initScrollAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each product card
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}