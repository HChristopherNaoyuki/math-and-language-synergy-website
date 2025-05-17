// Main JavaScript File for Math and Language Synergy Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Mobile Menu Toggle Functionality
    initializeMobileMenu();
    
    // Smooth Scrolling for Anchor Links
    setupSmoothScrolling();
    
    // Form Submission Handling
    handleFormSubmissions();
    
    // Update Copyright Year Automatically
    updateCopyrightYear();
    
    // Lazy Loading for Images
    setupLazyLoading();
    
    // Active Link Highlighting
    highlightActiveLink();
});

// Initialize Mobile Menu Toggle
function initializeMobileMenu()
{
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav)
    {
        mobileMenuToggle.addEventListener('click', function()
        {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Initialize aria attributes for accessibility
        mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
}

// Setup Smooth Scrolling for Anchor Links
function setupSmoothScrolling()
{
    document.querySelectorAll('a[href^="#"]').forEach(anchor => 
    {
        anchor.addEventListener('click', function(e)
        {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement)
            {
                window.scrollTo(
                {
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenuToggle && mobileMenuToggle.classList.contains('active'))
                {
                    mobileMenuToggle.click();
                }
            }
        });
    });
}

// Handle Form Submissions
function handleFormSubmissions()
{
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => 
    {
        form.addEventListener('submit', function(e)
        {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => 
            {
                if (!field.value.trim())
                {
                    isValid = false;
                    field.style.borderColor = 'var(--accent)';
                    
                    // Remove error style after delay
                    setTimeout(() => 
                    {
                        field.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (isValid)
            {
                // In a real implementation, you would send the form data to a server
                alert('Thank you for your message. We will get back to you soon!');
                this.reset();
            }
            else
            {
                alert('Please fill in all required fields.');
            }
        });
    });
}

// Update Copyright Year Automatically
function updateCopyrightYear()
{
    const yearElement = document.getElementById('current-year');
    
    if (yearElement)
    {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Setup Lazy Loading for Images
function setupLazyLoading()
{
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window)
    {
        const imageObserver = new IntersectionObserver((entries, observer) => 
        {
            entries.forEach(entry => 
            {
                if (entry.isIntersecting)
                {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => 
        {
            imageObserver.observe(img);
        });
    }
    else
    {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => 
        {
            img.src = img.getAttribute('data-src');
        });
    }
}

// Highlight Active Link in Navigation
function highlightActiveLink()
{
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => 
    {
        const linkHref = link.getAttribute('href');
        
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'index.html'))
        {
            link.classList.add('active');
        }
    });
}