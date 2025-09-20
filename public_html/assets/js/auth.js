// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Initialize forms
    initializeAuthForms();
});

function initializeAuthForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup(this);
        });
    }
}

function handleLogin(form) {
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Get users from file
    getUsers().then(users => {
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Store user session
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification('Login successful!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showNotification('Invalid username or password', 'error');
        }
    }).catch(error => {
        showNotification('Error accessing user data', 'error');
        console.error('Error:', error);
    });
}

function handleSignup(form) {
    const formData = new FormData(form);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        username: formData.get('username'),
        password: formData.get('password'),
        accountType: formData.get('accountType'),
        dob: formData.get('dob'),
        accountPlan: formData.get('accountPlan'),
        joinDate: new Date().toISOString()
    };
    
    // Validate password length
    if (userData.password.length < 12) {
        showNotification('Password must be at least 12 characters long', 'error');
        return;
    }
    
    // Get existing users
    getUsers().then(users => {
        // Check if username already exists
        if (users.some(u => u.username === userData.username)) {
            showNotification('Username already exists', 'error');
            return;
        }
        
        // Add new user
        users.push(userData);
        
        // Save users
        saveUsers(users).then(() => {
            showNotification('Account created successfully!', 'success');
            
            // Auto login
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Redirect based on account plan
            setTimeout(() => {
                if (userData.accountPlan === 'free') {
                    window.location.href = 'dashboard.html';
                } else {
                    // Redirect to payment page for paid plans
                    window.location.href = 'payment.html';
                }
            }, 1000);
        }).catch(error => {
            showNotification('Error saving user data', 'error');
            console.error('Error:', error);
        });
    }).catch(error => {
        // If no users file exists, create one with this user
        saveUsers([userData]).then(() => {
            showNotification('Account created successfully!', 'success');
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            setTimeout(() => {
                if (userData.accountPlan === 'free') {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'payment.html';
                }
            }, 1000);
        }).catch(saveError => {
            showNotification('Error creating account', 'error');
            console.error('Error:', saveError);
        });
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        // In a real application, this would be a server API call
        // For this demo, we'll use localStorage as a fallback
        const usersData = localStorage.getItem('userData');
        
        if (usersData) {
            try {
                resolve(JSON.parse(usersData));
            } catch (error) {
                reject(error);
            }
        } else {
            // Try to read from a file (simulated)
            setTimeout(() => {
                // For demo purposes, we'll return an empty array
                resolve([]);
            }, 100);
        }
    });
}

function saveUsers(users) {
    return new Promise((resolve, reject) => {
        try {
            // Save to localStorage for this demo
            localStorage.setItem('userData', JSON.stringify(users));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (currentUser) {
        // Update navigation to show user options
        updateNavigationForLoggedInUser(currentUser);
    }
}

function updateNavigationForLoggedInUser(user) {
    const nav = document.querySelector('nav ul');
    
    if (nav) {
        // Add user menu
        const userMenu = document.createElement('li');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <a href="#" class="user-toggle">${user.firstName} ▾</a>
            <ul class="user-dropdown">
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="#" id="switch-account">Switch Account</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            </ul>
        `;
        
        // Find the last nav item and insert before it
        const lastItem = nav.querySelector('li:last-child');
        nav.insertBefore(userMenu, lastItem);
        
        // Add event listeners
        document.getElementById('logout').addEventListener('click', handleLogout);
        document.getElementById('switch-account').addEventListener('click', handleSwitchAccount);
        
        // Toggle dropdown
        document.querySelector('.user-toggle').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.user-dropdown').classList.toggle('show');
        });
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

function handleSwitchAccount(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}