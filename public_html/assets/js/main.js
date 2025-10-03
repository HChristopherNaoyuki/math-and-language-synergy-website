// main.js - Main JavaScript functionality for Math and Language Synergy website
// Enhanced with Apple-inspired design, SEO, and Current Student functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
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
    initializeUserMenu();
    initializeTextFileSystem();
    updateFooterLinks();
    initializeCurrentStudentToggle();
    initializeSEO();
    initializeAppleAnimations();
    
    // Initialize radio navigation state
    initializeRadioNavigation();
});

/**
 * Initialize Radio Navigation State
 */
function initializeRadioNavigation()
{
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const radioInputs = document.querySelectorAll('.radio-navigation input[type="radio"]');
    
    radioInputs.forEach(input => {
        const label = input.nextElementSibling;
        if (label && label.textContent) {
            if (currentPage === 'index.html' && label.textContent.toLowerCase().includes('home')) {
                input.checked = true;
            } else if (currentPage.includes('about') && label.textContent.toLowerCase().includes('about')) {
                input.checked = true;
            } else if (currentPage.includes('services') && label.textContent.toLowerCase().includes('services')) {
                input.checked = true;
            } else if (currentPage.includes('contact') && label.textContent.toLowerCase().includes('contact')) {
                input.checked = true;
            }
        }
    });
}

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
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Initialize Current Student toggle functionality
 */
function initializeCurrentStudentToggle()
{
    const currentStudentRadios = document.querySelectorAll('input[type="radio"][id*="nav-student"]');
    
    currentStudentRadios.forEach(radio => {
        radio.addEventListener('change', function()
        {
            if (this.checked)
            {
                handleCurrentStudentNavigation();
            }
        });
        
        // Also add click event to the label for better UX
        const label = document.querySelector(`label[for="${this.id}"]`);
        if (label)
        {
            label.addEventListener('click', function(e)
            {
                // Prevent default to handle via radio change
                setTimeout(() => {
                    if (radio.checked)
                    {
                        handleCurrentStudentNavigation();
                    }
                }, 10);
            });
        }
    });
    
    // Update student labels based on login status
    updateStudentLabels();
}

/**
 * Handle Current Student navigation
 */
function handleCurrentStudentNavigation()
{
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (currentUser)
    {
        // User is logged in, redirect to dashboard
        showNotification('Redirecting to your dashboard...', 'info');
        setTimeout(() => {
            const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
            window.location.href = basePath + 'dashboard.html';
        }, 1000);
    }
    else
    {
        // User not logged in, redirect to login
        showNotification('Please log in to access student features', 'info');
        setTimeout(() => {
            const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
            window.location.href = basePath + 'login.html';
        }, 1000);
    }
}

/**
 * Update student labels based on login status
 */
function updateStudentLabels()
{
    const studentLabels = document.querySelectorAll('#student-label, [id*="student-label"]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    studentLabels.forEach(label => {
        if (currentUser)
        {
            label.textContent = `Welcome, ${currentUser.firstName}`;
            label.style.color = 'var(--apple-blue)';
            label.style.fontWeight = '600';
        }
        else
        {
            label.textContent = 'Current Student';
            label.style.color = '';
            label.style.fontWeight = '';
        }
    });
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling()
{
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e)
        {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Handle "back to top" links
            if (targetId === '#')
            {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement)
            {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
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
    const forms = document.querySelectorAll('form:not(#login-form):not(#signup-form):not(#contactForm):not(#enrollment-form):not(#new-thread-form):not(#payment-form)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e)
        {
            e.preventDefault();
            
            if (validateForm(this))
            {
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                
                // Save form data to text file
                saveFormDataToFile(this);
                
                // Reset form
                this.reset();
            }
        });
    });
}

/**
 * Save form data to text file
 */
function saveFormDataToFile(form)
{
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries())
    {
        data[key] = value;
    }
    
    data.timestamp = new Date().toISOString();
    data.formName = form.id || 'unknown_form';
    data.pageUrl = window.location.href;
    
    // Save to general forms backup
    saveToTextFile('general_forms', data);
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
    form.querySelectorAll('.form-error').forEach(error => {
        error.style.display = 'none';
    });
    
    form.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.style.borderColor = '';
    });
    
    // Check required fields
    requiredFields.forEach(field => {
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
    field.style.borderColor = 'var(--apple-red)';
    
    // Create or find error element
    let errorElement = field.parentNode.querySelector('.form-error');
    
    if (!errorElement)
    {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.cssText = 'color: var(--apple-red); font-size: 0.875rem; margin-top: 0.5rem;';
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
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting)
                {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    else
    {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.classList.add('fade-in');
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
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === '../index.html'))
        {
            link.classList.add('active');
        }
        else
        {
            link.classList.remove('active');
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
            const selectedLanguage = this.options[this.selectedIndex].text;
            showNotification(`Language changed to ${selectedLanguage}`, 'info');
            
            // Save language preference
            localStorage.setItem('userLanguage', this.value);
            
            // For demo purposes, we'll just show a notification
            if (this.value === 'jp')
            {
                document.querySelectorAll('h1, h2, h3').forEach(element => {
                    element.style.fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', sans-serif";
                });
            }
            else
            {
                document.querySelectorAll('h1, h2, h3').forEach(element => {
                    element.style.fontFamily = "var(--font-heading)";
                });
            }
        });
        
        // Set initial language from storage
        const savedLanguage = localStorage.getItem('userLanguage') || 'en';
        languageSelector.value = savedLanguage;
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
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress') || '75';
        
        // Animate progress bar
        setTimeout(() => {
            bar.style.width = `${progress}%`;
            bar.style.transition = 'width 1s ease-in-out';
        }, 500);
    });
}

/**
 * Initialize Badges
 */
function initializeBadges()
{
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        if (badge.classList.contains('earned'))
        {
            // Add animation to earned badges
            badge.addEventListener('mouseenter', function()
            {
                this.style.transform = 'scale(1.1) rotate(5deg)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            badge.addEventListener('mouseleave', function()
            {
                this.style.transform = 'scale(1) rotate(0deg)';
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
            if (chatbotContainer.style.display === 'flex')
            {
                chatbotContainer.style.display = 'none';
                this.style.transform = 'scale(1)';
            }
            else
            {
                chatbotContainer.style.display = 'flex';
                this.style.transform = 'scale(1.1)';
                
                // Focus on input when opening
                setTimeout(() => {
                    if (chatbotInput) chatbotInput.focus();
                }, 300);
            }
        });
        
        if (chatbotClose)
        {
            chatbotClose.addEventListener('click', function()
            {
                chatbotContainer.style.display = 'none';
                chatbotToggle.style.transform = 'scale(1)';
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
                    
                    // Save chat history
                    saveChatHistory(message, 'user');
                    
                    // Simulate bot response
                    setTimeout(() => {
                        const response = respondToMessage(message);
                        addChatMessage('bot', response);
                        saveChatHistory(response, 'bot');
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
 * Save chat history to text file
 */
function saveChatHistory(message, sender)
{
    const chatData = {
        message: message,
        sender: sender,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    saveToTextFile('chat_history', chatData);
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
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey'))
    {
        response = "Hello! Welcome to Math and Language Synergy. How can I assist you today?";
    }
    else if (lowerMessage.includes('course') || lowerMessage.includes('program'))
    {
        response = "We offer comprehensive programs in English, Japanese, and Mathematics. Would you like more information about any of these?";
    }
    else if (lowerMessage.includes('english'))
    {
        response = "Our English programs focus on fluency, communication skills, academic writing, and cultural awareness. We offer courses for all levels from beginner to advanced.";
    }
    else if (lowerMessage.includes('japanese'))
    {
        response = "Our Japanese programs provide complete immersion in language and culture, with options for beginners to advanced learners, including business Japanese.";
    }
    else if (lowerMessage.includes('math') || lowerMessage.includes('mathematics'))
    {
        response = "Our Mathematics programs develop critical thinking and problem-solving skills, from basic algebra to advanced calculus and applied mathematics.";
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee'))
    {
        response = "Course fees vary by program. English courses start at ZAR 9,000 per semester, Japanese at ZAR 9,900, and Mathematics at ZAR 7,200. Would you like detailed pricing?";
    }
    else if (lowerMessage.includes('enroll') || lowerMessage.includes('apply') || lowerMessage.includes('register'))
    {
        response = "You can enroll through our enrollment page. Would you like me to direct you there? You can also visit our campus during business hours.";
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone'))
    {
        response = "You can reach us at info@mathlanguagesynergy.edu or +27 (0)11 234 5678. Our office hours are Monday to Friday, 9 AM to 6 PM, and Saturday 10 AM to 4 PM.";
    }
    else if (lowerMessage.includes('location') || lowerMessage.includes('address'))
    {
        response = "We're located at 123 Learning Lane, Knowledge City, EDU 45678, Gauteng, South Africa. We also offer online classes for remote students.";
    }
    else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks'))
    {
        response = "You're welcome! Is there anything else I can help you with today?";
    }
    else if (lowerMessage.includes('student') || lowerMessage.includes('dashboard') || lowerMessage.includes('login'))
    {
        response = "You can access your student dashboard by logging in. Would you like to be redirected to the login page?";
    }
    
    return response;
}

/**
 * Initialize User Menu based on authentication status
 */
function initializeUserMenu()
{
    const userMenuContainer = document.getElementById('user-menu-container');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (userMenuContainer)
    {
        if (currentUser)
        {
            // User is logged in - show user-specific options
            const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
            
            if (currentUser.accountType === 'student')
            {
                userMenuContainer.innerHTML = `
                    <li class="user-menu">
                        <a href="#" class="user-toggle">${currentUser.firstName} ▾</a>
                        <ul class="user-dropdown">
                            <li><a href="${basePath}dashboard.html">My Dashboard</a></li>
                            <li><a href="${basePath}enrollment.html">Enroll in Courses</a></li>
                            <li><a href="${basePath}forum.html">Student Forum</a></li>
                            <li><a href="#" id="switch-account">Switch Account</a></li>
                            <li><a href="#" id="logout">Logout</a></li>
                        </ul>
                    </li>
                `;
            }
            else if (currentUser.accountType === 'lecturer')
            {
                userMenuContainer.innerHTML = `
                    <li class="user-menu">
                        <a href="#" class="user-toggle">${currentUser.firstName} ▾</a>
                        <ul class="user-dropdown">
                            <li><a href="${basePath}dashboard.html">Instructor Dashboard</a></li>
                            <li><a href="${basePath}forum.html">Student Forum</a></li>
                            <li><a href="#" id="switch-account">Switch Account</a></li>
                            <li><a href="#" id="logout">Logout</a></li>
                        </ul>
                    </li>
                `;
            }
        }
        else
        {
            // User not logged in - show login/signup options
            const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
            userMenuContainer.innerHTML = `
                <li class="user-menu">
                    <a href="#" class="user-toggle">Account ▾</a>
                    <ul class="user-dropdown">
                        <li><a href="${basePath}login.html">Login</a></li>
                        <li><a href="${basePath}signup.html">Sign Up</a></li>
                        <li><a href="${basePath}enrollment.html">Enroll as Student</a></li>
                    </ul>
                </li>
            `;
        }
        
        // Initialize user menu functionality
        setupUserMenuFunctionality();
        
        // Update student labels
        updateStudentLabels();
    }
}

/**
 * Setup user menu functionality
 */
function setupUserMenuFunctionality()
{
    const userToggle = document.querySelector('.user-toggle');
    const userDropdown = document.querySelector('.user-dropdown');
    const switchAccount = document.getElementById('switch-account');
    const logout = document.getElementById('logout');

    if (userToggle && userDropdown)
    {
        userToggle.addEventListener('click', function(e)
        {
            e.preventDefault();
            userDropdown.classList.toggle('show');
            
            // Close other open dropdowns
            document.querySelectorAll('.user-dropdown').forEach(dropdown => {
                if (dropdown !== userDropdown)
                {
                    dropdown.classList.remove('show');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e)
        {
            if (userToggle && userDropdown && !userToggle.contains(e.target) && !userDropdown.contains(e.target))
            {
                userDropdown.classList.remove('show');
            }
        });
    }

    if (switchAccount)
    {
        switchAccount.addEventListener('click', function(e)
        {
            e.preventDefault();
            handleSwitchAccount();
        });
    }

    if (logout)
    {
        logout.addEventListener('click', function(e)
        {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e)
    {
        if (e.key === 'Escape' && userDropdown && userDropdown.classList.contains('show'))
        {
            userDropdown.classList.remove('show');
        }
    });
}

/**
 * Handle switch account
 */
function handleSwitchAccount()
{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    // Log account switch to text file
    if (currentUser)
    {
        const switchData = {
            action: 'account_switch',
            username: currentUser.username,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };
        saveToTextFile('user_actions', switchData);
    }
    
    localStorage.removeItem('currentUser');
    showNotification('Switching accounts...', 'info');
    setTimeout(() => {
        const currentPath = window.location.pathname;
        const loginPath = currentPath.includes('/pages/') ? 'login.html' : 'pages/login.html';
        window.location.href = loginPath;
    }, 1000);
}

/**
 * Handle logout
 */
function handleLogout()
{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    // Log logout action to text file
    if (currentUser)
    {
        const logoutData = {
            action: 'logout',
            username: currentUser.username,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };
        saveToTextFile('user_actions', logoutData);
    }
    
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    
    // Update UI
    initializeUserMenu();
    updateStudentLabels();
}

/**
 * Initialize Text File System for data storage
 */
function initializeTextFileSystem()
{
    console.log('Initializing text file storage system...');
    
    // Initialize required text file structures if they don't exist
    initializeRequiredFiles();
}

/**
 * Initialize required text files for data storage
 */
function initializeRequiredFiles()
{
    const requiredFiles = [
        'users_data',
        'contact_submissions', 
        'student_progress',
        'forum_threads',
        'user_events',
        'download_history',
        'chat_history',
        'user_actions',
        'general_forms'
    ];
    
    requiredFiles.forEach(fileType => {
        if (!localStorage.getItem(`${fileType}_backup`))
        {
            // Create initial file structure
            const initialContent = getInitialFileContent(fileType);
            localStorage.setItem(`${fileType}_backup`, initialContent);
            console.log(`Initialized ${fileType} backup file`);
        }
    });
}

/**
 * Get initial content for text files
 */
function getInitialFileContent(fileType)
{
    const timestamp = new Date().toISOString();
    
    switch(fileType)
    {
        case 'users_data':
            return `Math and Language Synergy - Users Database
===========================================
File Created: ${timestamp}
Total Users: 0

USER LIST:
==========
`;
        case 'contact_submissions':
            return `Math and Language Synergy - Contact Form Submissions
=====================================================
File Created: ${timestamp}
Total Submissions: 0

SUBMISSIONS:
============
`;
        case 'student_progress':
            return `Math and Language Synergy - Student Progress Reports
====================================================
File Created: ${timestamp}
Total Progress Records: 0

PROGRESS RECORDS:
=================
`;
        case 'forum_threads':
            return `Math and Language Synergy - Forum Discussions
============================================
File Created: ${timestamp}
Total Threads: 0

THREADS:
========
`;
        case 'user_events':
            return `Math and Language Synergy - User Events and Appointments
=======================================================
File Created: ${timestamp}
Total Events: 0

EVENTS:
=======
`;
        case 'download_history':
            return `Math and Language Synergy - Resource Download History
=====================================================
File Created: ${timestamp}
Total Downloads: 0

DOWNLOAD HISTORY:
=================
`;
        case 'chat_history':
            return `Math and Language Synergy - Chat History
=====================================
File Created: ${timestamp}
Total Messages: 0

CHAT HISTORY:
=============
`;
        case 'user_actions':
            return `Math and Language Synergy - User Actions Log
========================================
File Created: ${timestamp}
Total Actions: 0

USER ACTIONS:
=============
`;
        case 'general_forms':
            return `Math and Language Synergy - General Form Submissions
=================================================
File Created: ${timestamp}
Total Submissions: 0

FORM SUBMISSIONS:
=================
`;
        default:
            return `Math and Language Synergy - ${fileType}
================================
File Created: ${timestamp}
`;
    }
}

/**
 * Save data to text file system
 * @param {string} fileType - Type of data to save
 * @param {Object} data - Data to save
 */
function saveToTextFile(fileType, data)
{
    try
    {
        // Get existing file content
        const existingContent = localStorage.getItem(`${fileType}_backup`) || getInitialFileContent(fileType);
        
        // Parse existing content and update
        let newContent = existingContent;
        
        // Add new entry based on file type
        switch(fileType)
        {
            case 'general_forms':
                newContent += `\n\nForm Submission: ${data.formName}
Timestamp: ${new Date(data.timestamp).toLocaleString()}
Page: ${data.pageUrl}
Data: ${JSON.stringify(data, null, 2)}
----------------------------------------`;
                break;
                
            case 'chat_history':
                newContent += `\n\n[${new Date(data.timestamp).toLocaleString()}] ${data.sender.toUpperCase()}: ${data.message}
Page: ${data.page}
----------------------------------------`;
                break;
                
            case 'user_actions':
                newContent += `\n\nAction: ${data.action}
User: ${data.username}
Timestamp: ${new Date(data.timestamp).toLocaleString()}
Page: ${data.page}
----------------------------------------`;
                break;
                
            default:
                newContent += `\n\nNew Entry - ${new Date().toLocaleString()}
${JSON.stringify(data, null, 2)}
----------------------------------------`;
        }
        
        // Update counters in file header
        newContent = updateFileCounter(newContent, fileType);
        
        // Save back to localStorage
        localStorage.setItem(`${fileType}_backup`, newContent);
        
        console.log(`Data saved to ${fileType} backup file`);
        
    }
    catch (error)
    {
        console.error(`Error saving to ${fileType}:`, error);
    }
}

/**
 * Update counter in file header
 */
function updateFileCounter(content, fileType)
{
    const lines = content.split('\n');
    let updated = false;
    
    for (let i = 0; i < lines.length; i++)
    {
        if (lines[i].includes('Total'))
        {
            const match = lines[i].match(/Total (\w+): (\d+)/);
            if (match)
            {
                const currentCount = parseInt(match[2]);
                lines[i] = lines[i].replace(`: ${currentCount}`, `: ${currentCount + 1}`);
                updated = true;
                break;
            }
        }
    }
    
    return lines.join('\n');
}

/**
 * Update footer links based on current page location
 */
function updateFooterLinks()
{
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    
    // Define base paths for links
    const basePath = isInPagesFolder ? '../' : '';
    const pagesPath = isInPagesFolder ? '' : 'pages/';
    
    // Update all footer quick links
    const footerLinks = document.querySelectorAll('.footer-section ul');
    
    footerLinks.forEach(footerSection => {
        const links = footerSection.querySelectorAll('a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
            {
                if (href === '../index.html' || href === 'index.html')
                {
                    link.href = basePath + 'index.html';
                }
                else if (href.startsWith('../'))
                {
                    // Remove ../ from the beginning and add basePath
                    const cleanHref = href.replace('../', '');
                    link.href = basePath + cleanHref;
                }
                else if (href.startsWith('pages/'))
                {
                    // Remove pages/ from the beginning and add pagesPath
                    const cleanHref = href.replace('pages/', '');
                    link.href = pagesPath + cleanHref;
                }
                else
                {
                    link.href = pagesPath + href;
                }
            }
        });
    });
    
    // Update donation button specifically
    const donationButtons = document.querySelectorAll('a[href*="donation"]');
    donationButtons.forEach(button => {
        if (button.getAttribute('href').includes('donation'))
        {
            button.href = pagesPath + 'donation.html';
        }
    });
}

/**
 * Initialize SEO enhancements
 */
function initializeSEO()
{
    // Add structured data for better SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Math and Language Synergy",
        "description": "Comprehensive education in English, Japanese, and Mathematics for academic and professional success",
        "url": window.location.href,
        "logo": "assets/images/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+27-11-234-5678",
            "contactType": "customer service",
            "areaServed": "ZA",
            "availableLanguage": ["en", "ja"]
        },
        "sameAs": [
            "https://facebook.com/MathLanguageSynergy",
            "https://twitter.com/MathLangSynergy",
            "https://instagram.com/MathLanguageSynergy",
            "https://linkedin.com/company/mathlanguagesynergy"
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Track page views for analytics
    const pageViewData = {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        referrer: document.referrer
    };
    saveToTextFile('page_views', pageViewData);
}

/**
 * Initialize Apple-style animations
 */
function initializeAppleAnimations()
{
    // Add fade-in animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
            {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections for animation
    document.querySelectorAll('.apple-card, .program-card, .testimonial, .resource-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: var(--spacing-md);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        max-width: 400px;
        font-size: 0.9375rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode)
            {
                notification.remove();
            }
        }, 300);
    }, 5000);
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

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports)
{
    module.exports = {
        showNotification,
        validateForm,
        isValidEmail,
        isStrongPassword,
        saveToTextFile
    };
}