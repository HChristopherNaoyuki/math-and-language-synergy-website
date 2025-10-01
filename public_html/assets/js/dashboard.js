// dashboard.js - Dashboard specific functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize dashboard functionality
    initializeDashboard();
});

/**
 * Check if user is authenticated
 */
function checkAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
        showNotification('Please log in to access the dashboard', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
}

/**
 * Initialize dashboard functionality
 */
function initializeDashboard() {
    loadUserData();
    initializeProgressBars();
    initializeBadges();
    initializeCalendar();
    initializeResourceDownloads();
    setupCourseEnrollment();
    setupUserMenu();
    initializeEventRSVP();
    initializeDashboardStats();
}

/**
 * Setup user menu functionality
 */
function setupUserMenu() {
    const userToggle = document.querySelector('.user-toggle');
    const userDropdown = document.querySelector('.user-dropdown');
    const switchAccount = document.getElementById('switch-account');
    const logout = document.getElementById('logout');

    if (userToggle && userDropdown) {
        userToggle.addEventListener('click', function(e) {
            e.preventDefault();
            userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    if (switchAccount) {
        switchAccount.addEventListener('click', function(e) {
            e.preventDefault();
            handleSwitchAccount();
        });
    }

    if (logout) {
        logout.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
}

/**
 * Handle switch account
 */
function handleSwitchAccount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    // Log account switch to text file
    if (currentUser) {
        const switchData = {
            action: 'account_switch',
            username: currentUser.username,
            timestamp: new Date().toISOString(),
            page: 'dashboard'
        };
        saveToTextFile('user_actions', switchData);
    }
    
    localStorage.removeItem('currentUser');
    showNotification('Switching accounts...', 'info');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

/**
 * Handle logout
 */
function handleLogout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    // Log logout action to text file
    if (currentUser) {
        const logoutData = {
            action: 'logout',
            username: currentUser.username,
            timestamp: new Date().toISOString(),
            page: 'dashboard'
        };
        saveToTextFile('user_actions', logoutData);
    }
    
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

/**
 * Load user data and populate dashboard
 */
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Update welcome message
    if (user.firstName) {
        document.getElementById('user-name').textContent = user.firstName;
    }
    
    // Load user progress
    loadUserProgress(user);
    
    // Initialize full calendar
    initializeFullCalendar();
    
    // Load user events
    loadUserEvents();
    
    // Update stats based on user data
    updateDashboardStats(user);
    
    // Log dashboard access
    logDashboardAccess(user);
}

/**
 * Log dashboard access to text file
 */
function logDashboardAccess(user) {
    const accessData = {
        action: 'dashboard_access',
        username: user.username,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    saveToTextFile('user_actions', accessData);
}

/**
 * Initialize dashboard statistics
 */
function initializeDashboardStats() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userProgress = user.progress || { english: 0, japanese: 0, math: 0 };
    
    // Calculate stats based on progress
    const activeCourses = Object.keys(userProgress).filter(course => userProgress[course] > 0 && userProgress[course] < 100).length;
    const completedLessons = Object.values(userProgress).reduce((sum, progress) => sum + Math.floor(progress / 10), 0);
    
    // Get download history
    const downloadHistory = JSON.parse(localStorage.getItem(`downloadHistory_${user.username}`) || '[]');
    const downloadCount = downloadHistory.length;
    
    // Get upcoming events
    const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    const now = new Date();
    const upcomingEvents = userEvents.filter(event => new Date(event.date) >= now).length;
    
    // Update stat cards
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = activeCourses || 3;
        statNumbers[1].textContent = completedLessons || 12;
        statNumbers[2].textContent = upcomingEvents || 5;
        statNumbers[3].textContent = downloadCount || 8;
    }
}

/**
 * Update dashboard statistics
 */
function updateDashboardStats(user) {
    // This function is called by other components to update stats
    initializeDashboardStats();
}

/**
 * Load user progress
 */
function loadUserProgress(user) {
    const userProgress = user.progress || {
        english: Math.floor(Math.random() * 30) + 70,
        japanese: Math.floor(Math.random() * 50) + 30,
        math: Math.floor(Math.random() * 20) + 80
    };
    
    const courses = [
        { 
            id: 'eng-101', 
            name: 'English Language Mastery', 
            progress: userProgress.english 
        },
        { 
            id: 'jpn-101', 
            name: 'Japanese Language Immersion', 
            progress: userProgress.japanese 
        },
        { 
            id: 'math-101', 
            name: 'Advanced Mathematics', 
            progress: userProgress.math 
        }
    ];
    
    // Update overall progress
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;
    document.getElementById('progress-percentage').textContent = `${Math.round(totalProgress)}%`;
    
    // Save progress to text file
    saveProgressToTextFile(user.username, userProgress);
    
    // Render progress cards
    const progressContainer = document.getElementById('progress-cards');
    if (progressContainer) {
        progressContainer.innerHTML = '';
        
        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'progress-card';
            card.innerHTML = `
                <div class="progress-header">
                    <h3 class="progress-title">${course.name}</h3>
                    <span class="progress-percentage">${course.progress}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${course.progress}%"></div>
                </div>
                <div class="progress-actions">
                    <a href="#" class="btn continue-learning-btn" data-course="${course.id}">Continue Learning</a>
                    <a href="#" class="btn secondary view-resources-btn" data-course="${course.id}">View Resources</a>
                </div>
            `;
            progressContainer.appendChild(card);
        });
        
        // Add event listeners to action buttons
        initializeProgressActions();
    }
    
    // Reinitialize progress bars
    initializeProgressBars();
}

/**
 * Save progress to text file
 */
function saveProgressToTextFile(username, progress) {
    const progressData = {
        username: username,
        progress: progress,
        timestamp: new Date().toISOString(),
        overall: Math.round((progress.english + progress.japanese + progress.math) / 3)
    };
    
    saveToTextFile('student_progress', progressData);
    
    // Also update user data in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.progress = progress;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update users data file
    updateUserProgressInMainFile(username, progress);
}

/**
 * Update user progress in main users file
 */
function updateUserProgressInMainFile(username, progress) {
    const usersData = JSON.parse(localStorage.getItem('userData') || '[]');
    const userIndex = usersData.findIndex(u => u.username === username);
    
    if (userIndex !== -1) {
        usersData[userIndex].progress = progress;
        localStorage.setItem('userData', JSON.stringify(usersData));
        
        // Update text file backup
        const user = usersData[userIndex];
        const userUpdateData = {
            action: 'progress_update',
            username: username,
            progress: progress,
            timestamp: new Date().toISOString()
        };
        saveToTextFile('users_data_updates', userUpdateData);
    }
}

/**
 * Initialize progress bar animations
 */
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    progressBars.forEach(bar => {
        const progress = bar.style.width || '0%';
        
        // Reset to 0 for animation
        bar.style.width = '0%';
        
        // Animate progress bar
        setTimeout(() => {
            bar.style.width = progress;
        }, 500);
    });
}

/**
 * Initialize progress action buttons
 */
function initializeProgressActions() {
    // Continue learning buttons
    document.querySelectorAll('.continue-learning-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-course');
            continueLearning(courseId);
        });
    });
    
    // View resources buttons
    document.querySelectorAll('.view-resources-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-course');
            viewCourseResources(courseId);
        });
    });
}

/**
 * Continue learning function
 */
function continueLearning(courseId) {
    const courseNames = {
        'eng-101': 'English Language Mastery',
        'jpn-101': 'Japanese Language Immersion', 
        'math-101': 'Advanced Mathematics'
    };
    
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    showNotification(`Continuing with ${courseNames[courseId]}...`, 'info');
    
    // Log learning activity
    const learningData = {
        action: 'continue_learning',
        username: user.username,
        course: courseId,
        courseName: courseNames[courseId],
        timestamp: new Date().toISOString()
    };
    saveToTextFile('learning_activities', learningData);
    
    // Simulate loading next lesson
    setTimeout(() => {
        // Update progress
        const userProgress = user.progress || { english: 0, japanese: 0, math: 0 };
        
        const courseKey = courseId.split('-')[0]; // eng, jpn, math
        if (userProgress[courseKey] < 100) {
            userProgress[courseKey] = Math.min(userProgress[courseKey] + 5, 100);
            
            // Save updated progress
            saveProgressToTextFile(user.username, userProgress);
            
            // Reload progress
            loadUserProgress(user);
            showNotification('Progress updated!', 'success');
        } else {
            showNotification('Course already completed!', 'info');
        }
    }, 1000);
}

/**
 * View course resources
 */
function viewCourseResources(courseId) {
    const resources = {
        'eng-101': [
            { name: 'Grammar Guide', type: 'PDF', size: '2.5 MB' },
            { name: 'Vocabulary List', type: 'PDF', size: '1.8 MB' },
            { name: 'Writing Exercises', type: 'PDF', size: '3.2 MB' }
        ],
        'jpn-101': [
            { name: 'Kanji Practice Sheets', type: 'PDF', size: '4.1 MB' },
            { name: 'Conversation Guide', type: 'PDF', size: '2.3 MB' },
            { name: 'Cultural Notes', type: 'PDF', size: '1.9 MB' }
        ],
        'math-101': [
            { name: 'Problem Sets', type: 'PDF', size: '3.8 MB' },
            { name: 'Formula Sheet', type: 'PDF', size: '1.2 MB' },
            { name: 'Solution Guide', type: 'PDF', size: '4.5 MB' }
        ]
    };
    
    const courseResources = resources[courseId] || [];
    showResourceModal(courseResources, courseId);
}

/**
 * Show resource modal
 */
function showResourceModal(resources, courseId) {
    let resourcesHTML = '<h3>Course Resources</h3><div class="resources-list">';
    
    resources.forEach(resource => {
        resourcesHTML += `
            <div class="resource-item">
                <div class="resource-info">
                    <h4>${resource.name}</h4>
                    <p>${resource.type} • ${resource.size}</p>
                </div>
                <button class="btn small download-resource-btn" data-resource="${resource.name}" data-course="${courseId}">Download</button>
            </div>
        `;
    });
    
    resourcesHTML += '</div>';
    
    showModal('Course Resources', resourcesHTML);
    
    // Add download functionality
    setTimeout(() => {
        document.querySelectorAll('.download-resource-btn').forEach(button => {
            button.addEventListener('click', function() {
                const resourceName = this.getAttribute('data-resource');
                const courseId = this.getAttribute('data-course');
                downloadResource(resourceName, courseId);
            });
        });
    }, 100);
}

/**
 * Download resource
 */
function downloadResource(resourceName, courseId) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    showNotification(`Downloading ${resourceName}...`, 'info');
    
    // Log download activity
    const downloadData = {
        action: 'resource_download',
        username: user.username,
        resource: resourceName,
        course: courseId,
        timestamp: new Date().toISOString()
    };
    saveToTextFile('download_history', downloadData);
    
    setTimeout(() => {
        showNotification(`${resourceName} downloaded successfully!`, 'success');
        updateDownloadProgress();
        updateDownloadHistory(resourceName, 'PDF', courseId);
    }, 2000);
}

/**
 * Update download progress
 */
function updateDownloadProgress() {
    // This would update visual progress indicators
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const downloadHistory = JSON.parse(localStorage.getItem(`downloadHistory_${user.username}`) || '[]');
    
    // Update download count stat
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[3].textContent = downloadHistory.length;
    }
}

/**
 * Update download history
 */
function updateDownloadHistory(resourceName, resourceType, courseId) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let downloadHistory = JSON.parse(localStorage.getItem(`downloadHistory_${user.username}`) || '[]');
    
    const now = new Date();
    const downloadRecord = {
        name: resourceName,
        type: resourceType,
        course: courseId,
        date: now.toISOString(),
        timestamp: now.getTime()
    };
    
    downloadHistory.unshift(downloadRecord);
    
    // Keep only last 10 downloads
    downloadHistory = downloadHistory.slice(0, 10);
    
    localStorage.setItem(`downloadHistory_${user.username}`, JSON.stringify(downloadHistory));
}

/**
 * Initialize badges with interactive features
 */
function initializeBadges() {
    const badges = document.querySelectorAll('.badge-card');
    
    badges.forEach(badge => {
        if (badge.classList.contains('earned')) {
            // Add animation to earned badges
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Show badge details on click
            badge.addEventListener('click', function() {
                const badgeName = this.querySelector('.badge-name').textContent;
                showBadgeDetails(badgeName);
            });
        } else {
            // Show how to earn the badge
            badge.addEventListener('click', function() {
                const badgeName = this.querySelector('.badge-name').textContent;
                showBadgeRequirements(badgeName);
            });
        }
    });
}

/**
 * Show badge details
 */
function showBadgeDetails(badgeName) {
    const badgeInfo = {
        'Language Learner': 'Awarded for completing your first language course module.',
        'Math Whiz': 'Earned by achieving 90% or higher in mathematics assessments.',
        'Consistent Learner': 'Given for logging in and studying for 7 consecutive days.',
        'Forum Contributor': 'Awarded for actively participating in forum discussions.'
    };
    
    showModal(`Badge: ${badgeName}`, `<p>${badgeInfo[badgeName] || 'Details not available.'}</p>`);
}

/**
 * Show badge requirements
 */
function showBadgeRequirements(badgeName) {
    const requirements = {
        'Consistent Learner': 'Log in and complete at least one lesson for 7 consecutive days.',
        'Forum Contributor': 'Post 5 threads or replies in the forum discussions.'
    };
    
    showModal(`Earn: ${badgeName}`, `<p>To earn this badge:</p><p>${requirements[badgeName] || 'Requirements not specified.'}</p>`);
}

/**
 * Initialize full calendar with timezone support
 */
function initializeFullCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Render calendar
    renderCalendar(currentMonth, currentYear);
    
    // Navigation event listeners
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    function renderCalendar(month, year) {
        // Update month header with timezone info
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        currentMonthEl.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of month
        const today = new Date();
        const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
        
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = i;
            
            // Check if today
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                day.classList.add('today');
            }
            
            // Check for events
            const hasEvent = userEvents.some(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === i && 
                       eventDate.getMonth() === month && 
                       eventDate.getFullYear() === year;
            });
            
            if (hasEvent) {
                day.classList.add('has-event');
            }
            
            // Add click event for scheduling
            day.addEventListener('click', () => {
                showTimeSelection(i, month, year);
            });
            
            calendarDays.appendChild(day);
        }
    }
}

/**
 * Show time selection with timezone support
 */
function showTimeSelection(day, month, year) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = new Date(year, month, day);
    const dateString = currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', 
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
    
    let timeOptions = `<h3>Schedule Tutoring for ${dateString}</h3>`;
    timeOptions += `<p><small>Timezone: ${timezone}</small></p>`;
    timeOptions += '<div class="time-slots">';
    
    timeSlots.forEach(time => {
        timeOptions += `<div class="time-slot" data-time="${time}">${time}</div>`;
    });
    
    timeOptions += '</div>';
    
    // Show modal with time options
    showModal('Schedule Tutoring Session', timeOptions);
    
    // Add event listeners to time slots
    setTimeout(() => {
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', function() {
                const time = this.getAttribute('data-time');
                confirmAppointment(day, month, year, time, timezone);
            });
        });
    }, 100);
}

/**
 * Confirm appointment scheduling
 */
function confirmAppointment(day, month, year, time, timezone) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const appointmentDate = new Date(year, month, day);
    
    const modalContent = `
        <p>Confirm your tutoring appointment:</p>
        <p><strong>Date:</strong> ${appointmentDate.toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${time} (${timezone})</p>
        <p><strong>Student:</strong> ${currentUser.firstName} ${currentUser.lastName}</p>
        <div class="form-group">
            <label for="appointment-subject">Subject:</label>
            <select id="appointment-subject" required>
                <option value="">Select subject</option>
                <option value="english">English</option>
                <option value="japanese">Japanese</option>
                <option value="math">Mathematics</option>
            </select>
        </div>
        <div class="form-group">
            <label for="appointment-notes">Notes (optional):</label>
            <textarea id="appointment-notes" placeholder="Any specific topics you want to focus on..."></textarea>
        </div>
        <div class="button-group">
            <button class="btn secondary" id="cancel-appointment">Cancel</button>
            <button class="btn" id="confirm-appointment">Confirm Appointment</button>
        </div>
    `;
    
    showModal('Confirm Appointment', modalContent);
    
    document.getElementById('confirm-appointment').addEventListener('click', function() {
        const subject = document.getElementById('appointment-subject').value;
        const notes = document.getElementById('appointment-notes').value;
        
        if (!subject) {
            showNotification('Please select a subject', 'error');
            return;
        }
        
        scheduleAppointment(day, month, year, time, subject, notes);
    });
    
    document.getElementById('cancel-appointment').addEventListener('click', function() {
        closeModal();
    });
}

/**
 * Schedule the appointment
 */
function scheduleAppointment(day, month, year, time, subject, notes) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const appointmentDate = new Date(year, month, day);
    
    const appointment = {
        id: Date.now(),
        date: appointmentDate.toISOString(),
        time: time,
        subject: subject,
        notes: notes,
        student: currentUser.firstName + ' ' + currentUser.lastName,
        username: currentUser.username,
        status: 'scheduled'
    };
    
    // Save to user events
    let userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    userEvents.push(appointment);
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
    
    // Save to text file
    saveToTextFile('user_events', appointment);
    
    // Simulate API call
    setTimeout(() => {
        closeModal();
        showNotification('Tutoring appointment scheduled successfully!', 'success');
        
        // Update upcoming appointments
        updateUpcomingAppointments();
        
        // Refresh calendar
        initializeFullCalendar();
    }, 1000);
}

/**
 * Update upcoming appointments list
 */
function updateUpcomingAppointments() {
    const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    const now = new Date();
    
    // Filter future appointments and sort by date
    const upcomingAppointments = userEvents
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Update events count
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[2].textContent = upcomingAppointments.length;
    }
}

/**
 * Load user events
 */
function loadUserEvents() {
    updateUpcomingAppointments();
}

/**
 * Initialize Resource Downloads
 */
function initializeResourceDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resourceName = this.closest('.resource-card').querySelector('.resource-name').textContent;
            const courseId = this.getAttribute('data-course') || 'general';
            
            showNotification(`Downloading ${resourceName}...`, 'info');
            
            // Simulate download delay
            setTimeout(() => {
                showNotification(`${resourceName} downloaded successfully!`, 'success');
                
                // Update progress
                updateDownloadProgress();
                
                // Update download history
                updateDownloadHistory(resourceName, 'PDF', courseId);
            }, 2000);
        });
    });
}

/**
 * Setup Course Enrollment
 */
function setupCourseEnrollment() {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course');
            const courseName = this.getAttribute('data-course-name');
            
            showEnrollmentModal(courseId, courseName);
        });
    });
}

/**
 * Show enrollment modal
 */
function showEnrollmentModal(courseId, courseName) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const modalContent = `
        <h3>Enroll in ${courseName}</h3>
        <p>Please confirm your enrollment details:</p>
        <div class="form-group">
            <label for="enrollment-name">Full Name</label>
            <input type="text" id="enrollment-name" value="${currentUser.firstName} ${currentUser.lastName}" readonly>
        </div>
        <div class="form-group">
            <label for="enrollment-email">Email</label>
            <input type="email" id="enrollment-email" value="${currentUser.username}" readonly>
        </div>
        <div class="form-group">
            <label for="enrollment-level">Current Level</label>
            <select id="enrollment-level" required>
                <option value="">Select your level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
        </div>
        <div class="button-group">
            <button class="btn secondary" id="cancel-enrollment">Cancel</button>
            <button class="btn" id="confirm-enrollment">Enroll Now</button>
        </div>
    `;
    
    showModal('Course Enrollment', modalContent);
    
    document.getElementById('confirm-enrollment').addEventListener('click', function() {
        const level = document.getElementById('enrollment-level').value;
        
        if (!level) {
            showNotification('Please select your level', 'error');
            return;
        }
        
        processEnrollment(courseId, courseName, currentUser, level);
    });
    
    document.getElementById('cancel-enrollment').addEventListener('click', function() {
        closeModal();
    });
}

/**
 * Process enrollment
 */
function processEnrollment(courseId, courseName, user, level) {
    const enrollmentData = {
        courseId: courseId,
        courseName: courseName,
        username: user.username,
        studentName: `${user.firstName} ${user.lastName}`,
        level: level,
        enrollmentDate: new Date().toISOString(),
        status: 'enrolled'
    };
    
    // Save enrollment to text file
    saveToTextFile('course_enrollments', enrollmentData);
    
    // Show success message
    showNotification(`Successfully enrolled in ${courseName}!`, 'success');
    
    // Close modal
    closeModal();
    
    // Redirect to course page or update dashboard
    setTimeout(() => {
        // You could redirect to a course page here
        // window.location.href = `course.html?id=${courseId}`;
    }, 1000);
}

/**
 * Initialize Event RSVP functionality
 */
function initializeEventRSVP() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('rsvp-btn')) {
            const eventCard = e.target.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventDate = eventCard.querySelector('.event-date').textContent;
            
            handleEventRSVP(eventTitle, eventDate, e.target);
        }
    });
}

/**
 * Handle event RSVP
 */
function handleEventRSVP(eventTitle, eventDate, button) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (button.textContent === 'RSVP') {
        button.textContent = 'Registered ✓';
        button.classList.add('registered');
        showNotification(`Successfully registered for ${eventTitle}`, 'success');
        
        // Save RSVP to text file
        const rsvpData = {
            event: eventTitle,
            date: eventDate,
            username: user.username,
            registeredAt: new Date().toISOString()
        };
        saveToTextFile('event_registrations', rsvpData);
        
    } else {
        button.textContent = 'RSVP';
        button.classList.remove('registered');
        showNotification(`Cancelled registration for ${eventTitle}`, 'info');
    }
}

/**
 * Save data to text file system
 * @param {string} fileType - Type of data to save
 * @param {Object} data - Data to save
 */
function saveToTextFile(fileType, data) {
    try {
        // Get existing file content
        const existingContent = localStorage.getItem(`${fileType}_backup`) || getInitialFileContent(fileType);
        
        // Parse existing content and update
        let newContent = existingContent;
        
        // Add new entry based on file type
        switch(fileType) {
            case 'student_progress':
                newContent += `\n\nProgress Update - ${new Date(data.timestamp).toLocaleString()}
Student: ${data.username}
English: ${data.progress.english}%
Japanese: ${data.progress.japanese}%
Math: ${data.progress.math}%
Overall: ${data.overall}%
----------------------------------------`;
                break;
                
            case 'user_events':
                newContent += `\n\nEvent Scheduled - ${new Date(data.timestamp).toLocaleString()}
Student: ${data.student} (${data.username})
Date: ${new Date(data.date).toLocaleDateString()}
Time: ${data.time}
Subject: ${data.subject}
Status: ${data.status}
----------------------------------------`;
                break;
                
            case 'download_history':
                newContent += `\n\nDownload - ${new Date(data.timestamp).toLocaleString()}
Student: ${data.username}
Resource: ${data.resource}
Course: ${data.course}
----------------------------------------`;
                break;
                
            case 'learning_activities':
                newContent += `\n\nLearning Activity - ${new Date(data.timestamp).toLocaleString()}
Student: ${data.username}
Course: ${data.courseName} (${data.course})
Action: ${data.action}
----------------------------------------`;
                break;
                
            case 'course_enrollments':
                newContent += `\n\nEnrollment - ${new Date(data.enrollmentDate).toLocaleString()}
Student: ${data.studentName} (${data.username})
Course: ${data.courseName} (${data.courseId})
Level: ${data.level}
Status: ${data.status}
----------------------------------------`;
                break;
                
            case 'event_registrations':
                newContent += `\n\nEvent Registration - ${new Date(data.registeredAt).toLocaleString()}
Student: ${data.username}
Event: ${data.event}
Date: ${data.date}
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
        
    } catch (error) {
        console.error(`Error saving to ${fileType}:`, error);
    }
}

/**
 * Get initial content for text files
 */
function getInitialFileContent(fileType) {
    const timestamp = new Date().toISOString();
    
    switch(fileType) {
        case 'student_progress':
            return `Math and Language Synergy - Student Progress Reports
====================================================
File Created: ${timestamp}
Total Progress Records: 0

PROGRESS RECORDS:
=================
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
        case 'learning_activities':
            return `Math and Language Synergy - Learning Activities
============================================
File Created: ${timestamp}
Total Activities: 0

LEARNING ACTIVITIES:
====================
`;
        case 'course_enrollments':
            return `Math and Language Synergy - Course Enrollments
============================================
File Created: ${timestamp}
Total Enrollments: 0

ENROLLMENTS:
============
`;
        case 'event_registrations':
            return `Math and Language Synergy - Event Registrations
=============================================
File Created: ${timestamp}
Total Registrations: 0

REGISTRATIONS:
==============
`;
        default:
            return `Math and Language Synergy - ${fileType}
================================
File Created: ${timestamp}
Total Entries: 0

ENTRIES:
========
`;
    }
}

/**
 * Update counter in file header
 */
function updateFileCounter(content, fileType) {
    const lines = content.split('\n');
    let updated = false;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Total')) {
            const match = lines[i].match(/Total (\w+): (\d+)/);
            if (match) {
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
 * Show modal dialog
 */
function showModal(title, content) {
    // Remove any existing modals
    const existingModal = document.getElementById('custom-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'custom-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

/**
 * Close modal dialog
 */
function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * Show notification message
 */
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.display = 'block';
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}