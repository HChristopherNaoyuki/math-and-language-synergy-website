// Authentication functionality with text file storage simulation
document.addEventListener('DOMContentLoaded', function()
{
    // Check if user is logged in
    checkAuthStatus();
    
    // Initialize forms
    initializeAuthForms();
});

function initializeAuthForms()
{
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm)
    {
        loginForm.addEventListener('submit', function(e)
        {
            e.preventDefault();
            handleLogin(this);
        });
    }
    
    if (signupForm)
    {
        signupForm.addEventListener('submit', function(e)
        {
            e.preventDefault();
            handleSignup(this);
        });
    }
}

function handleLogin(form)
{
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;
    
    // Get users from storage
    getUsers().then(users => 
    {
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user)
        {
            // Store user session
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification('Login successful!', 'success');
            
            // Update navigation
            updateNavigationForLoggedInUser(user);
            
            // Redirect to dashboard
            setTimeout(() => 
            {
                const basePath = window.location.pathname.includes('/pages/') ? '' : '../';
                window.location.href = basePath + 'pages/dashboard.html';
            }, 1000);
        }
        else
        {
            showNotification('Invalid username or password', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }).catch(error => 
    {
        showNotification('Error accessing user data', 'error');
        console.error('Error:', error);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

function handleSignup(form)
{
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const username = formData.get('username');
    const password = formData.get('password');
    const accountType = formData.get('accountType');
    const dob = formData.get('dob');
    
    // Validate required fields
    if (!firstName || !lastName || !username || !password || !accountType || !dob)
    {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate password length
    if (password.length < 12)
    {
        showNotification('Password must be at least 12 characters long', 'error');
        return;
    }
    
    const userData = 
    {
        id: generateUserId(),
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        accountType: accountType,
        dob: dob,
        joinDate: new Date().toISOString(),
        progress: 
        {
            english: 0,
            japanese: 0,
            math: 0
        },
        badges: [],
        events: []
    };
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;
    
    // Get existing users
    getUsers().then(users => 
    {
        // Check if username already exists
        if (users.some(u => u.username === userData.username))
        {
            showNotification('Username already exists', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            return;
        }
        
        // Add new user
        users.push(userData);
        
        // Save users to storage
        saveUsersToFile(users).then(() => 
        {
            showNotification('Account created successfully!', 'success');
            
            // Auto login
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Update navigation
            updateNavigationForLoggedInUser(userData);
            
            // Redirect to dashboard
            setTimeout(() => 
            {
                const basePath = window.location.pathname.includes('/pages/') ? '' : '../';
                window.location.href = basePath + 'pages/dashboard.html';
            }, 1000);
        }).catch(error => 
        {
            showNotification('Error saving user data', 'error');
            console.error('Error:', error);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }).catch(error => 
    {
        // If no users file exists, create one with this user
        saveUsersToFile([userData]).then(() => 
        {
            showNotification('Account created successfully!', 'success');
            localStorage.setItem('currentUser', JSON.stringify(userData));
            updateNavigationForLoggedInUser(userData);
            
            setTimeout(() => 
            {
                const basePath = window.location.pathname.includes('/pages/') ? '' : '../';
                window.location.href = basePath + 'pages/dashboard.html';
            }, 1000);
        }).catch(saveError => 
        {
            showNotification('Error creating account', 'error');
            console.error('Error:', saveError);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}

function generateUserId()
{
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getUsers()
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            // Check localStorage first (for demo purposes)
            const usersData = localStorage.getItem('userData');
            
            if (usersData)
            {
                const users = JSON.parse(usersData);
                resolve(users);
            }
            else
            {
                // Initialize with empty array if no data exists
                resolve([]);
            }
        }
        catch (error)
        {
            console.error('Error parsing user data:', error);
            // Return empty array if there's an error
            resolve([]);
        }
    });
}

function saveUsersToFile(users)
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            // Save to localStorage for this demo
            localStorage.setItem('userData', JSON.stringify(users));
            
            // Simulate saving to .txt file
            simulateUserSaveToTxtFile(users);
            
            resolve();
        }
        catch (error)
        {
            reject(error);
        }
    });
}

function simulateUserSaveToTxtFile(users)
{
    try
    {
        // This simulates what would happen on the server
        const txtContent = users.map(user => `
User Account
============
User ID: ${user.id}
Name: ${user.firstName} ${user.lastName}
Username: ${user.username}
Account Type: ${user.accountType}
Join Date: ${new Date(user.joinDate).toLocaleString()}
Progress: 
  English: ${user.progress.english}%
  Japanese: ${user.progress.japanese}%
  Math: ${user.progress.math}%
Badges: ${user.badges.join(', ') || 'None'}
Events: ${user.events.length}

`).join('\n' + '='.repeat(50) + '\n');
        
        // In a real application, this would be saved to a file on the server
        // For demo purposes, we'll store it in localStorage
        localStorage.setItem('users_backup.txt', txtContent);
        
        console.log('Simulated user data .txt file creation');
    }
    catch (error)
    {
        console.error('Error creating backup file:', error);
    }
}

function checkAuthStatus()
{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (currentUser)
    {
        // Update navigation to show user options
        updateNavigationForLoggedInUser(currentUser);
    }
}

function updateNavigationForLoggedInUser(user)
{
    const userMenuContainer = document.getElementById('user-menu-container');
    
    if (userMenuContainer)
    {
        let menuItems = '';
        
        if (user.accountType === 'student')
        {
            menuItems = `
                <li><a href="enrollment.html">Enroll in Courses</a></li>
                <li><a href="dashboard.html">My Dashboard</a></li>
                <li><a href="forum.html">Student Forum</a></li>
                <li><a href="#" id="switch-account">Switch Account</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            `;
        }
        else if (user.accountType === 'lecturer')
        {
            menuItems = `
                <li><a href="dashboard.html">My Dashboard</a></li>
                <li><a href="forum.html">Student Forum</a></li>
                <li><a href="#" id="switch-account">Switch Account</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            `;
        }
        
        userMenuContainer.innerHTML = `
            <li class="user-menu">
                <a href="#" class="user-toggle">${user.firstName || 'User'} ▾</a>
                <ul class="user-dropdown">
                    ${menuItems}
                </ul>
            </li>
        `;
        
        // Re-initialize user menu functionality
        const userToggle = userMenuContainer.querySelector('.user-toggle');
        const userDropdown = userMenuContainer.querySelector('.user-dropdown');
        const switchAccount = userMenuContainer.querySelector('#switch-account');
        const logout = userMenuContainer.querySelector('#logout');
        
        if (userToggle && userDropdown)
        {
            userToggle.addEventListener('click', function(e)
            {
                e.preventDefault();
                userDropdown.classList.toggle('show');
            });
        }
        
        if (switchAccount)
        {
            switchAccount.addEventListener('click', function(e)
            {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                showNotification('Switching accounts...', 'info');
                setTimeout(() => 
                {
                    window.location.href = 'login.html';
                }, 1000);
            });
        }
        
        if (logout)
        {
            logout.addEventListener('click', function(e)
            {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                showNotification('Logged out successfully', 'success');
                setTimeout(() => 
                {
                    window.location.reload();
                }, 1000);
            });
        }
    }
    
    // Update student labels in radio navigation
    updateStudentLabels();
}

// Helper function to show notifications
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
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 400px;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: white;
    `;
    
    // Set background color based on type
    if (type === 'success')
    {
        notification.style.backgroundColor = '#34c759';
    }
    else if (type === 'error')
    {
        notification.style.backgroundColor = '#ff3b30';
    }
    else if (type === 'info')
    {
        notification.style.backgroundColor = '#007aff';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => 
    {
        notification.style.opacity = '1';
    }, 10);
    
    // Hide notification after 5 seconds
    setTimeout(() => 
    {
        notification.style.opacity = '0';
        
        setTimeout(() => 
        {
            if (notification.parentNode)
            {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Update student labels based on login status
function updateStudentLabels()
{
    const studentLabels = document.querySelectorAll('#student-label, [id*="student-label"]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    studentLabels.forEach(label => 
    {
        if (currentUser)
        {
            label.textContent = `Welcome, ${currentUser.firstName || 'User'}`;
            label.style.color = 'var(--apple-blue)';
            label.style.fontWeight = '600';
            label.classList.add('logged-in');
        }
        else
        {
            label.textContent = 'Current Student';
            label.style.color = '';
            label.style.fontWeight = '';
            label.classList.remove('logged-in');
        }
    });
}

// Initialize student labels when auth.js loads
document.addEventListener('DOMContentLoaded', function()
{
    updateStudentLabels();
});