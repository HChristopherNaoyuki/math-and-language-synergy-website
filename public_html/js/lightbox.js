// Simple Lightbox Implementation

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize Lightbox
    initializeLightbox();
});

// Initialize Lightbox
function initializeLightbox()
{
    const lightboxLinks = document.querySelectorAll('[data-lightbox]');
    
    if (lightboxLinks.length)
    {
        // Create lightbox container
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close">&times;</span>
                <img src="" alt="" class="lightbox-image">
                <div class="caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add event listeners to lightbox links
        lightboxLinks.forEach(link => 
        {
            link.addEventListener('click', function(e)
            {
                e.preventDefault();
                openLightbox(this);
            });
        });
        
        // Add event listener to close lightbox
        const closeBtn = lightbox.querySelector('.close');
        closeBtn.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e)
        {
            if (e.target === this)
            {
                closeLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e)
        {
            if (e.key === 'Escape' && lightbox.style.display === 'flex')
            {
                closeLightbox();
            }
        });
    }
}

// Open Lightbox
function openLightbox(link)
{
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.caption');
    
    lightboxImg.src = link.href;
    lightboxImg.alt = link.querySelector('img').alt;
    caption.textContent = link.getAttribute('data-title') || '';
    
    lightbox.style.display = 'flex';
}

// Close Lightbox
function closeLightbox()
{
    document.getElementById('lightbox').style.display = 'none';
}