// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

// Modal Functions
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.attending) {
        alert('Please fill in all required fields.');
        return;
    }

    // In a real application, you would send this data to a server
    alert('Thank you for your RSVP! We\'ll be in touch with more details.');
    
    // Reset form
    event.target.reset();
}

// Cost Sheet Function
function openCostSheet() {
    window.open('https://docs.google.com/spreadsheets/d/17Bke1s8aNjctP8Bqbp8gG5Usj7-EvbOlIgER78IdeE0/edit?usp=sharing', '_blank');
}

// Image Modal Function
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.add('active');
    }
}

// Video Functions (YouTube & Vimeo)
function playFeaturedVideo() {
    const videoPlayer = document.getElementById('featuredVideoPlayer');
    const videoOverlay = document.getElementById('videoOverlay');
    const videoIframe = document.getElementById('videoIframe');
    
    if (videoPlayer && videoOverlay && videoIframe) {
        // Get video ID and platform from data attributes
        const videoId = videoPlayer.getAttribute('data-video-id') || videoPlayer.getAttribute('data-youtube-id');
        const platform = videoPlayer.getAttribute('data-platform') || 'youtube';
        
        // Hide overlay
        videoOverlay.style.display = 'none';
        
        // Create and show iframe based on platform
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;';
        
        if (platform === 'vimeo') {
            // Vimeo embed
            iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
            iframe.title = 'Vimeo video player';
            iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
        } else {
            // YouTube embed
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`;
            iframe.title = 'YouTube video player';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        }
        
        // Add error handling
        iframe.onerror = function() {
            const platformName = platform === 'vimeo' ? 'Vimeo' : 'YouTube';
            const platformUrl = platform === 'vimeo' ? `https://vimeo.com/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`;
            
            videoIframe.innerHTML = `
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; color: white; flex-direction: column;">
                    <p style="margin-bottom: 10px;">Video không thể phát</p>
                    <a href="${platformUrl}" target="_blank" style="color: #ff0000; text-decoration: none;">
                        ▶ Xem trên ${platformName}
                    </a>
                </div>
            `;
        };
        
        videoIframe.innerHTML = '';
        videoIframe.appendChild(iframe);
        videoIframe.style.display = 'block';
    }
}

function playVideoCard(element) {
    const videoId = element.getAttribute('data-video-id') || element.getAttribute('data-youtube-id');
    const platform = element.getAttribute('data-platform') || 'youtube';
    
    if (videoId) {
        // Hide the overlay and replace thumbnail with iframe
        const videoOverlay = element.querySelector('.video-overlay');
        
        if (videoOverlay) {
            videoOverlay.style.display = 'none';
            
            // Create iframe based on platform
            let iframeSrc, iframeTitle, iframeAllow;
            
            if (platform === 'vimeo') {
                iframeSrc = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
                iframeTitle = 'Vimeo video player';
                iframeAllow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
            } else {
                iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`;
                iframeTitle = 'YouTube video player';
                iframeAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            }
            
            // Replace the entire thumbnail content with iframe
            element.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="${iframeSrc}" 
                    title="${iframeTitle}" 
                    frameborder="0" 
                    allow="${iframeAllow}" 
                    allowfullscreen
                    referrerpolicy="strict-origin-when-cross-origin"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;">
                </iframe>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileNav && mobileMenuBtn && 
            !mobileNav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            mobileNav.classList.remove('active');
        }
    });

    // Close modal when clicking outside image
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add click handlers for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openModal(img.src);
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
});