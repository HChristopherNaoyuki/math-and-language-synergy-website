// main.js - Main JavaScript functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize all functionality when the DOM is fully loaded
    initializeMobileMenu();
    setupSmoothScrolling();
    handleFormSubmissions();
    updateCopyrightYear();
    setupLazyLoading();
    highlightActiveLink();
    initializeLanguageSelector();
    setupGamification();
    initializeChatbot();
});

/**
 * Initialize Mobile Menu Toggle functionality
 */
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

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling()
{
    document.querySelectorAll('a[href^="#"]').forEach(anchor => 
    {
        anchor.addEventListener('click', function(e)
        {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Handle "back to top" links
            if (targetId === '#')
            {
                window.scrollTo(
                {
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement)
            {
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo(
                {
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenuToggle && mobileMenuToggle.classList.contains('active'))
                {
                    mobileMenuToggle.click();
                }
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Handle form submissions with validation
 */
function handleFormSubmissions()
{
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => 
    {
        form.addEventListener('submit', function(e)
        {
            e.preventDefault();
            
            if (validateForm(this))
            {
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                
                // In a real implementation, you would send the form data to a server
                console.log('Form data:', getFormData(this));
                
                // Reset form
                this.reset();
            }
        });
    });
}

/**
 * Validate form fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateForm(form)
{
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Reset error states
    form.querySelectorAll('.form-error').forEach(error => 
    {
        error.style.display = 'none';
    });
    
    form.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => 
    {
        field.style.borderColor = '';
    });
    
    // Check required fields
    requiredFields.forEach(field => 
    {
        if (!field.value.trim())
        {
            isValid = false;
            showFieldError(field, 'This field is required');
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value))
    {
        isValid = false;
        showFieldError(emailField, 'Please enter a valid email address');
    }
    
    // Validate password strength if applicable
    const passwordField = form.querySelector('input[type="password"]');
    if (passwordField && passwordField.value && !isStrongPassword(passwordField.value))
    {
        isValid = false;
        showFieldError(passwordField, 'Password must be at least 8 characters with uppercase, lowercase, and number');
    }
    
    if (!isValid)
    {
        showNotification('Please correct the errors in the form', 'error');
    }
    
    return isValid;
}

/**
 * Display field error message
 * @param {HTMLElement} field - The form field with error
 * @param {string} message - The error message to display
 */
function showFieldError(field, message)
{
    field.style.borderColor = 'var(--accent)';
    
    // Create or find error element
    let errorElement = field.parentNode.querySelector('.form-error');
    
    if (!errorElement)
    {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Check if email is valid
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email)
{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Check if password is strong
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password is strong
 */
function isStrongPassword(password)
{
    // At least 8 characters, one uppercase, one lowercase, one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

/**
 * Get form data as object
 * @param {HTMLFormElement} form - The form to get data from
 * @returns {Object} - Form data as key-value pairs
 */
function getFormData(form)
{
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries())
    {
        data[key] = value;
    }
    
    return data;
}

/**
 * Update copyright year automatically
 */
function updateCopyrightYear()
{
    const yearElement = document.getElementById('current-year');
    
    if (yearElement)
    {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

/**
 * Setup lazy loading for images
 */
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

/**
 * Highlight Active Link in Navigation
 */
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

/**
 * Initialize Language Selector
 */
function initializeLanguageSelector()
{
    const languageSelector = document.getElementById('language-selector');
    
    if (languageSelector)
    {
        languageSelector.addEventListener('change', function()
        {
            // In a real implementation, this would change the site language
            showNotification(`Language changed to ${this.options[this.selectedIndex].text}`, 'info');
            
            // For demo purposes, we'll just show a notification
            if (this.value === 'jp')
            {
                document.querySelectorAll('h1, h2, h3').forEach(element => 
                {
                    element.style.fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', sans-serif";
                });
            }
            else
            {
                document.querySelectorAll('h1, h2, h3').forEach(element => 
                {
                    element.style.fontFamily = "var(--font-heading)";
                });
            }
        });
    }
}

/**
 * Setup Gamification Elements
 */
function setupGamification()
{
    // Check if we're on the dashboard page
    if (document.querySelector('.dashboard-grid'))
    {
        initializeProgressBars();
        initializeBadges();
    }
}

/**
 * Initialize Progress Bars
 */
function initializeProgressBars()
{
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => 
    {
        const progress = bar.getAttribute('data-progress') || '75';
        bar.style.width = `${progress}%`;
        
        // Animate progress bar
        setTimeout(() => 
        {
            bar.style.width = `${progress}%`;
        }, 100);
    });
}

/**
 * Initialize Badges
 */
function initializeBadges()
{
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => 
    {
        if (badge.classList.contains('earned'))
        {
            // Add animation to earned badges
            badge.addEventListener('mouseenter', function()
            {
                this.style.transform = 'scale(1.1)';
            });
            
            badge.addEventListener('mouseleave', function()
            {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

/**
 * Initialize Chatbot
 */
function initializeChatbot()
{
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (chatbotToggle && chatbotContainer)
    {
        chatbotToggle.addEventListener('click', function()
        {
            chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
        });
        
        if (chatbotClose)
        {
            chatbotClose.addEventListener('click', function()
            {
                chatbotContainer.style.display = 'none';
            });
        }
        
        if (chatbotInput && chatbotSend)
        {
            const sendMessage = function()
            {
                const message = chatbotInput.value.trim();
                if (message)
                {
                    addChatMessage('user', message);
                    chatbotInput.value = '';
                    
                    // Simulate bot response
                    setTimeout(() => 
                    {
                        respondToMessage(message);
                    }, 1000);
                }
            };
            
            chatbotSend.addEventListener('click', sendMessage);
            chatbotInput.addEventListener('keypress', function(e)
            {
                if (e.key === 'Enter')
                {
                    sendMessage();
                }
            });
        }
    }
}

/**
 * Add chat message to chatbot
 * @param {string} sender - 'user' or 'bot'
 * @param {string} message - The message text
 */
function addChatMessage(sender, message)
{
    const messagesContainer = document.querySelector('.chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}`;
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Respond to user message in chatbot
 * @param {string} message - The user's message
 */
function respondToMessage(message)
{
    let response = "I'm sorry, I didn't understand that. How can I help you with our courses?";
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi'))
    {
        response = "Hello! How can I help you today?";
    }
    else if (lowerMessage.includes('course') || lowerMessage.includes('program'))
    {
        response = "We offer English, Japanese, and Mathematics courses. Would you like more information about any of these?";
    }
    else if (lowerMessage.includes('english'))
    {
        response = "Our English courses focus on fluency, communication skills, writing, and cultural awareness. They're perfect for academic and professional success.";
    }
    else if (lowerMessage.includes('japanese'))
    {
        response = "Our Japanese courses provide immersion in language and culture, with options for beginners to advanced learners, including business Japanese.";
    }
    else if (lowerMessage.includes('math') || lowerMessage.includes('mathematics'))
    {
        response = "Our Mathematics programs develop critical thinking and problem-solving skills, from basic algebra to advanced calculus and applied mathematics.";
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost'))
    {
        response = "Course prices vary by program. English courses start at ZAR 9,000 per semester, Japanese at ZAR 9,900, and Mathematics at ZAR 7,200.";
    }
    else if (lowerMessage.includes('enroll') || lowerMessage.includes('apply'))
    {
        response = "You can enroll through our enrollment page. Would you like me to direct you there?";
    }
    
    addChatMessage('bot', response);
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
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => 
    {
        notification.style.display = 'block';
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => 
    {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => 
        {
            notification.remove();
        }, 500);
    }, 3000);
}

/**
 * Initialize Calendar functionality
 */
function initializeCalendar()
{
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    if (calendarDays.length)
    {
        calendarDays.forEach(day => 
        {
            day.addEventListener('click', function()
            {
                // Remove selected class from all days
                calendarDays.forEach(d => d.classList.remove('selected'));
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Show confirmation message
                const date = this.getAttribute('data-date');
                showNotification(`Appointment scheduled for ${date}`, 'success');
            });
        });
    }
}

/**
 * Initialize Resource Downloads
 */
function initializeResourceDownloads()
{
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => 
    {
        button.addEventListener('click', function()
        {
            const resourceName = this.getAttribute('data-resource');
            showNotification(`Downloading ${resourceName}...`, 'info');
            
            // Simulate download delay
            setTimeout(() => 
            {
                showNotification(`${resourceName} downloaded successfully!`, 'success');
                
                // Update progress if on dashboard
                updateDownloadProgress();
            }, 2000);
        });
    });
}

/**
 * Update download progress on dashboard
 */
function updateDownloadProgress()
{
    const progressBar = document.querySelector('.progress-fill[data-progress]');
    if (progressBar)
    {
        let currentProgress = parseInt(progressBar.style.width) || 0;
        if (currentProgress < 100)
        {
            currentProgress += 10;
            progressBar.style.width = `${currentProgress}%`;
            progressBar.setAttribute('data-progress', currentProgress);
            
            // Check if user earned a badge
            if (currentProgress >= 100)
            {
                showNotification('Congratulations! You earned the "Resource Master" badge!', 'success');
                const badge = document.querySelector('.badge[data-badge="resource-master"]');
                if (badge)
                {
                    badge.classList.add('earned');
                }
            }
        }
    }
}