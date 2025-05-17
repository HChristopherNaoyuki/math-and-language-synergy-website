// Contact Page Specific JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize Contact Form
    initializeContactForm();
});

// Initialize Contact Form
function initializeContactForm()
{
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm)
    {
        contactForm.addEventListener('submit', function(e)
        {
            e.preventDefault();
            
            // Form validation
            if (validateForm(this))
            {
                // In a real implementation, you would send the form data to a server
                alert('Thank you for your message. We will get back to you soon!');
                this.reset();
            }
        });
    }
}

// Form Validation
function validateForm(form)
{
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
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
    
    // Additional validation for email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !isValidEmail(emailField.value))
    {
        isValid = false;
        emailField.style.borderColor = 'var(--accent)';
        
        setTimeout(() => 
        {
            emailField.style.borderColor = '';
        }, 2000);
    }
    
    if (!isValid)
    {
        alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

// Email Validation Helper
function isValidEmail(email)
{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}