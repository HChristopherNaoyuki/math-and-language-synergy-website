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
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '../index.html';
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
}

/**
 * Update dashboard statistics
 */
function updateDashboardStats(user) {
    const userProgress = JSON.parse(localStorage.getItem(`progress_${user.username}`) || '{}');
    
    // Update stats cards with real data
    const activeCourses = Object.keys(userProgress).filter(course => userProgress[course] > 0 && userProgress[course] < 100).length;
    const completedLessons = Object.values(userProgress).reduce((sum, progress) => sum + Math.floor(progress / 10), 0);
    
    document.querySelectorAll('.stat-number')[0].textContent = activeCourses || 3;
    document.querySelectorAll('.stat-number')[1].textContent = completedLessons || 12;
}

/**
 * Load user progress
 */
function loadUserProgress(user) {
    const userProgress = JSON.parse(localStorage.getItem(`progress_${user.username}`) || '{}');
    
    const courses = [
        { 
            id: 'eng-101', 
            name: 'English Language Mastery', 
            progress: userProgress.english || Math.floor(Math.random() * 30) + 70 
        },
        { 
            id: 'jpn-101', 
            name: 'Japanese Language Immersion', 
            progress: userProgress.japanese || Math.floor(Math.random() * 50) + 30 
        },
        { 
            id: 'math-101', 
            name: 'Advanced Mathematics', 
            progress: userProgress.math || Math.floor(Math.random() * 20) + 80 
        }
    ];
    
    // Update overall progress
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;
    document.getElementById('progress-percentage').textContent = `${Math.round(totalProgress)}%`;
    
    // Save progress back to localStorage
    userProgress.english = courses[0].progress;
    userProgress.japanese = courses[1].progress;
    userProgress.math = courses[2].progress;
    localStorage.setItem(`progress_${user.username}`, JSON.stringify(userProgress));
    
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
    
    showNotification(`Continuing with ${courseNames[courseId]}...`, 'info');
    
    // Simulate loading next lesson
    setTimeout(() => {
        // Update progress
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userProgress = JSON.parse(localStorage.getItem(`progress_${user.username}`) || '{}');
        
        const courseKey = courseId.split('-')[0]; // eng, jpn, math
        if (userProgress[courseKey] < 100) {
            userProgress[courseKey] = Math.min(userProgress[courseKey] + 5, 100);
            localStorage.setItem(`progress_${user.username}`, JSON.stringify(userProgress));
            
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
    showResourceModal(courseResources);
}

/**
 * Show resource modal
 */
function showResourceModal(resources) {
    let resourcesHTML = '<h3>Course Resources</h3><div class="resources-list">';
    
    resources.forEach(resource => {
        resourcesHTML += `
            <div class="resource-item">
                <div class="resource-info">
                    <h4>${resource.name}</h4>
                    <p>${resource.type} • ${resource.size}</p>
                </div>
                <button class="btn small download-resource-btn">Download</button>
            </div>
        `;
    });
    
    resourcesHTML += '</div>';
    
    showModal('Course Resources', resourcesHTML);
    
    // Add download functionality
    setTimeout(() => {
        document.querySelectorAll('.download-resource-btn').forEach(button => {
            button.addEventListener('click', function() {
                const resourceName = this.closest('.resource-item').querySelector('h4').textContent;
                downloadResource(resourceName);
            });
        });
    }, 100);
}

/**
 * Download resource
 */
function downloadResource(resourceName) {
    showNotification(`Downloading ${resourceName}...`, 'info');
    
    setTimeout(() => {
        showNotification(`${resourceName} downloaded successfully!`, 'success');
        updateDownloadProgress();
    }, 2000);
}

/**
 * Update download progress
 */
function updateDownloadProgress() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userDownloads = JSON.parse(localStorage.getItem(`downloads_${user.username}`) || '{}');
    
    userDownloads.count = (userDownloads.count || 0) + 1;
    userDownloads.lastDownload = new Date().toISOString();
    
    localStorage.setItem(`downloads_${user.username}`, JSON.stringify(userDownloads));
    
    // Update download count stat
    document.querySelectorAll('.stat-number')[3].textContent = userDownloads.count || 8;
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
        status: 'scheduled'
    };
    
    // Save to user events
    let userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    userEvents.push(appointment);
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
    
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
    document.querySelectorAll('.stat-number')[2].textContent = upcomingAppointments.length;
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
            
            showNotification(`Downloading ${resourceName}...`, 'info');
            
            // Simulate download delay
            setTimeout(() => {
                showNotification(`${resourceName} downloaded successfully!`, 'success');
                
                // Update progress
                updateDownloadProgress();
                
                // Update download history
                updateDownloadHistory(resourceName, 'PDF');
            }, 2000);
        });
    });
}

/**
 * Update download history
 */
function updateDownloadHistory(resourceName, resourceType) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let downloadHistory = JSON.parse(localStorage.getItem(`downloadHistory_${user.username}`) || '[]');
    
    const now = new Date();
    const downloadRecord = {
        name: resourceName,
        type: resourceType,
        date: now.toISOString(),
        timestamp: now.getTime()
    };
    
    downloadHistory.unshift(downloadRecord);
    
    // Keep only last 10 downloads
    downloadHistory = downloadHistory.slice(0, 10);
    
    localStorage.setItem(`downloadHistory_${user.username}`, JSON.stringify(downloadHistory));
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
        
        // Save RSVP
        let userRSVPs = JSON.parse(localStorage.getItem(`rsvps_${user.username}`) || '[]');
        userRSVPs.push({
            event: eventTitle,
            date: eventDate,
            registeredAt: new Date().toISOString()
        });
        localStorage.setItem(`rsvps_${user.username}`, JSON.stringify(userRSVPs));
    } else {
        button.textContent = 'RSVP';
        button.classList.remove('registered');
        showNotification(`Cancelled registration for ${eventTitle}`, 'info');
    }
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