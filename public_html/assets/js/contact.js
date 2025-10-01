// contact.js - Contact form functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

/**
 * Initialize contact form functionality
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm(this)) {
                processContactForm(this);
            }
        });
        
        // Add real-time validation
        addRealTimeValidation();
    }
}

/**
 * Validate contact form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid
 */
function validateContactForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Reset error states
    form.querySelectorAll('.form-error').forEach(error => {
        error.style.display = 'none';
    });
    
    form.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.style.borderColor = '';
    });
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        isValid = false;
        showFieldError(emailField, 'Please enter a valid email address');
    }
    
    // Validate phone format if provided
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
        isValid = false;
        showFieldError(phoneField, 'Please enter a valid phone number');
    }
    
    if (!isValid) {
        showNotification('Please correct the errors in the form', 'error');
    }
    
    return isValid;
}

/**
 * Check if email is valid
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Check if phone number is valid
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone is valid
 */
function isValidPhone(phone) {
    // Basic phone validation - allows various formats
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)\.]/g, ''));
}

/**
 * Add real-time validation to form fields
 */
function addRealTimeValidation() {
    const formFields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formFields.forEach(function(field) {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'This field is required');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Please enter a valid email address');
            } else if (this.type === 'tel' && this.value && !isValidPhone(this.value)) {
                showFieldError(this, 'Please enter a valid phone number');
            } else {
                clearFieldError(this);
            }
        });
    });
}

/**
 * Display field error message
 * @param {HTMLElement} field - The form field with error
 * @param {string} message - The error message to display
 */
function showFieldError(field, message) {
    field.style.borderColor = 'var(--accent)';
    
    // Create or find error element
    let errorElement = field.parentNode.querySelector('.form-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Clear field error
 * @param {HTMLElement} field - The form field to clear
 */
function clearFieldError(field) {
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Process contact form submission
 * @param {HTMLFormElement} form - The form to process
 */
function processContactForm(form) {
    // Get form data
    const formData = new FormData(form);
    const contactData = {};
    
    for (let [key, value] of formData.entries()) {
        contactData[key] = value;
    }
    
    // Add timestamp
    contactData.timestamp = new Date().toISOString();
    contactData.ip = 'Unknown'; // In a real application, you'd get this from the server
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Save to text file (simulated with localStorage for demo)
    saveContactToFile(contactData);
    
    // Simulate API call delay
    setTimeout(function() {
        // Show success message
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

/**
 * Save contact data to file (simulated with localStorage)
 * @param {Object} contactData - The contact form data
 */
function saveContactToFile(contactData) {
    try {
        // Get existing contacts or initialize empty array
        let contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        
        // Add new contact
        contacts.push(contactData);
        
        // Save back to localStorage
        localStorage.setItem('contactSubmissions', JSON.stringify(contacts));
        
        // In a real application, this would be a server API call
        // that saves to an actual .txt file on the server
        console.log('Contact data saved:', contactData);
        
        // Simulate saving to .txt file (this would be server-side in production)
        simulateSaveToTxtFile(contactData);
        
    } catch (error) {
        console.error('Error saving contact data:', error);
        showNotification('Error saving your message. Please try again.', 'error');
    }
}

/**
 * Simulate saving to .txt file (server-side functionality)
 * @param {Object} contactData - The contact form data
 */
function simulateSaveToTxtFile(contactData) {
    // This simulates what would happen on the server
    const txtContent = `
New Contact Submission
=====================
Timestamp: ${new Date(contactData.timestamp).toLocaleString()}
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Subject: ${contactData.subject}
Message: ${contactData.message}
    
    `.trim();
    
    // In a real application, this would be saved to a file on the server
    // For demo purposes, we'll store it in localStorage
    let contactFiles = JSON.parse(localStorage.getItem('contactFiles') || '[]');
    contactFiles.push({
        filename: `contact_${Date.now()}.txt`,
        content: txtContent,
        timestamp: contactData.timestamp
    });
    
    localStorage.setItem('contactFiles', JSON.stringify(contactFiles));
    
    console.log('Simulated .txt file creation:', txtContent);
}