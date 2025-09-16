// enrollment.js - Enrollment functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize enrollment functionality
    initializeEnrollmentForm();
    initializeCourseSelection();
});

/**
 * Initialize enrollment form validation and submission
 */
function initializeEnrollmentForm()
{
    const enrollmentForm = document.getElementById('enrollment-form');
    
    if (enrollmentForm)
    {
        // Add event listener for form submission
        enrollmentForm.addEventListener('submit', function(e)
        {
            e.preventDefault();
            
            // Validate form
            if (validateEnrollmentForm(this))
            {
                // Process enrollment
                processEnrollment(this);
            }
        });
        
        // Add real-time validation
        addRealTimeValidation();
    }
}

/**
 * Validate enrollment form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateEnrollmentForm(form)
{
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Check all required fields
    requiredFields.forEach(function(field)
    {
        if (!field.value.trim())
        {
            markFieldAsInvalid(field, 'This field is required');
            isValid = false;
        }
        else
        {
            markFieldAsValid(field);
            
            // Additional validation for specific fields
            if (field.type === 'email' && !isValidEmail(field.value))
            {
                markFieldAsInvalid(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
    });
    
    // Check if a course is selected
    const courseSelect = form.querySelector('#course-select');
    if (courseSelect && !courseSelect.value)
    {
        markFieldAsInvalid(courseSelect, 'Please select a course');
        isValid = false;
    }
    
    // Check terms agreement
    const termsCheckbox = form.querySelector('#terms');
    if (termsCheckbox && !termsCheckbox.checked)
    {
        markFieldAsInvalid(termsCheckbox, 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    if (!isValid)
    {
        showNotification('Please correct the errors in the form', 'error');
    }
    
    return isValid;
}

/**
 * Mark field as invalid
 * @param {HTMLElement} field - The form field
 * @param {string} message - The error message
 */
function markFieldAsInvalid(field, message)
{
    // Remove any existing error
    markFieldAsValid(field);
    
    // Add error class
    field.classList.add('invalid');
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.classList.add('field-error');
    errorElement.textContent = message;
    
    // Insert after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

/**
 * Mark field as valid
 * @param {HTMLElement} field - The form field
 */
function markFieldAsValid(field)
{
    // Remove error class
    field.classList.remove('invalid');
    
    // Remove any existing error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement)
    {
        errorElement.remove();
    }
}

/**
 * Add real-time validation to form fields
 */
function addRealTimeValidation()
{
    const formFields = document.querySelectorAll('#enrollment-form input, #enrollment-form select, #enrollment-form textarea');
    
    formFields.forEach(function(field)
    {
        field.addEventListener('blur', function()
        {
            if (this.hasAttribute('required') && !this.value.trim())
            {
                markFieldAsInvalid(this, 'This field is required');
            }
            else if (this.type === 'email' && this.value && !isValidEmail(this.value))
            {
                markFieldAsInvalid(this, 'Please enter a valid email address');
            }
            else
            {
                markFieldAsValid(this);
            }
        });
    });
}

/**
 * Check if email is valid
 * @param {string} email - The email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email)
{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Process enrollment form submission
 * @param {HTMLFormElement} form - The form to process
 */
function processEnrollment(form)
{
    // Get form data
    const formData = new FormData(form);
    const enrollmentData = {};
    
    for (let [key, value] of formData.entries())
    {
        enrollmentData[key] = value;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(function()
    {
        // Show success message
        showNotification('Enrollment submitted successfully! We will contact you shortly.', 'success');
        
        // Reset form
        form.reset();
        
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Redirect to dashboard after successful enrollment
        setTimeout(function()
        {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 2000);
}

/**
 * Initialize course selection functionality
 */
function initializeCourseSelection()
{
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    enrollButtons.forEach(function(button)
    {
        button.addEventListener('click', function()
        {
            const courseId = this.getAttribute('data-course');
            const courseName = this.getAttribute('data-course-name');
            
            // Pre-select the course in the form
            const courseSelect = document.getElementById('course-select');
            if (courseSelect)
            {
                courseSelect.value = courseId;
                
                // Scroll to form
                document.querySelector('.enrollment-form-section').scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Show notification
                showNotification(`${courseName} selected. Please complete the form below.`, 'info');
            }
        });
    });
}

/**
 * Show notification message
 * @param {string} message - The notification message
 * @param {string} type - 'success', 'error', or 'info'
 */
function showNotification(message, type)
{
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification)
    {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(type);
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(function()
    {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 5 seconds
    setTimeout(function()
    {
        notification.classList.remove('show');
        
        // Remove after animation completes
        setTimeout(function()
        {
            notification.remove();
        }, 300);
    }, 5000);
}