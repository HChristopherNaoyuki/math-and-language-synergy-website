// dashboard.js - Dashboard specific functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize dashboard functionality
    initializeProgressBars();
    initializeBadges();
    initializeCalendar();
    initializeResourceDownloads();
    setupCourseEnrollment();
});

/**
 * Initialize Progress Bars with animation
 */
function initializeProgressBars()
{
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => 
    {
        const progress = bar.getAttribute('data-progress') || '0';
        
        // Animate progress bar
        setTimeout(() => 
        {
            bar.style.width = `${progress}%`;
        }, 500);
    });
}

/**
 * Initialize Badges with interactive features
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
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            });
            
            badge.addEventListener('mouseleave', function()
            {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
            
            // Show badge details on click
            badge.addEventListener('click', function()
            {
                const badgeName = this.getAttribute('data-badge');
                const badgeDescription = this.getAttribute('data-description');
                alert(`${badgeName}: ${badgeDescription}`);
            });
        }
        else
        {
            // Show how to earn the badge
            badge.addEventListener('click', function()
            {
                const badgeName = this.getAttribute('data-badge');
                const requirement = this.getAttribute('data-requirement');
                alert(`Earn the ${badgeName} badge by: ${requirement}`);
            });
        }
    });
}

/**
 * Initialize Calendar functionality for scheduling
 */
function initializeCalendar()
{
    const calendarDays = document.querySelectorAll('.calendar-day');
    const currentDate = new Date();
    
    if (calendarDays.length)
    {
        // Mark today's date
        const today = currentDate.getDate();
        calendarDays.forEach(day => 
        {
            const dayNumber = parseInt(day.textContent);
            if (dayNumber === today)
            {
                day.classList.add('today');
            }
            
            day.addEventListener('click', function()
            {
                // Remove selected class from all days
                calendarDays.forEach(d => d.classList.remove('selected'));
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Show time selection
                showTimeSelection(this.textContent);
            });
        });
    }
}

/**
 * Show time selection for scheduling
 * @param {string} day - The selected day
 */
function showTimeSelection(day)
{
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', 
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
    
    let timeOptions = '<h3>Select a time slot:</h3><div class="time-slots">';
    
    timeSlots.forEach(time => 
    {
        timeOptions += `<div class="time-slot" data-time="${time}">${time}</div>`;
    });
    
    timeOptions += '</div>';
    
    // Show modal with time options
    showModal(`Schedule Tutoring for Day ${day}`, timeOptions);
    
    // Add event listeners to time slots
    setTimeout(() => 
    {
        document.querySelectorAll('.time-slot').forEach(slot => 
        {
            slot.addEventListener('click', function()
            {
                const time = this.getAttribute('data-time');
                confirmAppointment(day, time);
            });
        });
    }, 100);
}

/**
 * Confirm appointment scheduling
 * @param {string} day - The selected day
 * @param {string} time - The selected time
 */
function confirmAppointment(day, time)
{
    const modalContent = `
        <p>Confirm your tutoring appointment:</p>
        <p><strong>Date:</strong> Day ${day} of next month</p>
        <p><strong>Time:</strong> ${time}</p>
        <div class="form-group">
            <label for="appointment-notes">Notes (optional):</label>
            <textarea id="appointment-notes" placeholder="Any specific topics you want to focus on..."></textarea>
        </div>
        <div class="button-group">
            <button class="btn secondary" id="cancel-appointment">Cancel</button>
            <button class="btn" id="confirm-appointment">Confirm</button>
        </div>
    `;
    
    showModal('Confirm Appointment', modalContent);
    
    document.getElementById('confirm-appointment').addEventListener('click', function()
    {
        const notes = document.getElementById('appointment-notes').value;
        scheduleAppointment(day, time, notes);
    });
    
    document.getElementById('cancel-appointment').addEventListener('click', function()
    {
        closeModal();
    });
}

/**
 * Schedule the appointment
 * @param {string} day - The selected day
 * @param {string} time - The selected time
 * @param {string} notes - Appointment notes
 */
function scheduleAppointment(day, time, notes)
{
    // Simulate API call to schedule appointment
    setTimeout(() => 
    {
        closeModal();
        showNotification('Tutoring appointment scheduled successfully!', 'success');
        
        // Update upcoming appointments
        updateUpcomingAppointments(day, time);
    }, 1000);
}

/**
 * Update upcoming appointments list
 * @param {string} day - The appointment day
 * @param {string} time - The appointment time
 */
function updateUpcomingAppointments(day, time)
{
    const appointmentsList = document.getElementById('upcoming-appointments');
    if (appointmentsList)
    {
        const appointmentItem = document.createElement('li');
        appointmentItem.innerHTML = `
            <strong>Day ${day}, ${time}</strong> - Mathematics Tutoring
            <button class="btn small cancel-btn">Cancel</button>
        `;
        appointmentsList.appendChild(appointmentItem);
        
        // Add event listener to cancel button
        appointmentItem.querySelector('.cancel-btn').addEventListener('click', function()
        {
            appointmentItem.remove();
            showNotification('Appointment cancelled', 'info');
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
            const resourceType = this.getAttribute('data-type');
            
            showNotification(`Downloading ${resourceName}...`, 'info');
            
            // Simulate download delay
            setTimeout(() => 
            {
                showNotification(`${resourceName} downloaded successfully!`, 'success');
                
                // Update progress
                updateDownloadProgress();
                
                // Update download history
                updateDownloadHistory(resourceName, resourceType);
            }, 2000);
        });
    });
}

/**
 * Update download progress
 */
function updateDownloadProgress()
{
    const progressBar = document.querySelector('.progress-fill[data-progress]');
    if (progressBar)
    {
        let currentProgress = parseInt(progressBar.getAttribute('data-progress')) || 0;
        if (currentProgress < 100)
        {
            currentProgress += 10;
            progressBar.style.width = `${currentProgress}%`;
            progressBar.setAttribute('data-progress', currentProgress);
            
            // Update progress text
            const progressText = document.querySelector('.progress-text');
            if (progressText)
            {
                progressText.textContent = `${currentProgress}% Complete`;
            }
            
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

/**
 * Update download history
 * @param {string} resourceName - The name of the resource
 * @param {string} resourceType - The type of resource
 */
function updateDownloadHistory(resourceName, resourceType)
{
    const downloadHistory = document.getElementById('download-history');
    if (downloadHistory)
    {
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();
        
        const historyItem = document.createElement('li');
        historyItem.innerHTML = `
            <span class="download-date">${dateString} ${timeString}</span>
            <span class="download-name">${resourceName}</span>
            <span class="download-type">${resourceType}</span>
        `;
        
        // Add to beginning of list
        if (downloadHistory.firstChild)
        {
            downloadHistory.insertBefore(historyItem, downloadHistory.firstChild);
        }
        else
        {
            downloadHistory.appendChild(historyItem);
        }
        
        // Limit to 10 items
        if (downloadHistory.children.length > 10)
        {
            downloadHistory.removeChild(downloadHistory.lastChild);
        }
    }
}

/**
 * Setup Course Enrollment
 */
function setupCourseEnrollment()
{
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    enrollButtons.forEach(button => 
    {
        button.addEventListener('click', function()
        {
            const courseId = this.getAttribute('data-course');
            const courseName = this.getAttribute('data-course-name');
            
            showEnrollmentModal(courseId, courseName);
        });
    });
}

/**
 * Show enrollment modal
 * @param {string} courseId - The course ID
 * @param {string} courseName - The course name
 */
function showEnrollmentModal(courseId, courseName)
{
    const modalContent = `
        <h3>Enroll in ${courseName}</h3>
        <p>Please confirm your enrollment details:</p>
        <div class="form-group">
            <label for="enrollment-name">Full Name</label>
            <input type="text" id="enrollment-name" required>
        </div>
        <div class="form-group">
            <label for="enrollment-email">Email</label>
            <input type="email" id="enrollment-email" required>
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
    
    document.getElementById('confirm-enrollment').addEventListener('click', function()
    {
        const name = document.getElementById('enrollment-name').value;
        const email = document.getElementById('enrollment-email').value;
        const level = document.getElementById('enrollment-level').value;
        
        if (name && email && level)
        {
            processEnrollment(courseId, courseName, name, email, level);
        }
        else
        {
            showNotification('Please fill in all fields', 'error');
        }
    });
    
    document.getElementById('cancel-enrollment').addEventListener('click', function()
    {
        closeModal();
    });
}

/**
 * Process enrollment
 * @param {string} courseId - The course ID
 * @param {string} courseName - The course name
 * @param {string} name - Student name
 * @param {string} email - Student email
 * @param {string} level - Student level
 */
function processEnrollment(courseId, courseName, name, email, level)
{
    // Simulate API call
    setTimeout(() => 
    {
        closeModal();
        showNotification(`Successfully enrolled in ${courseName}!`, 'success');
        
        // Update enrolled courses
        updateEnrolledCourses(courseId, courseName);
    }, 1500);
}

/**
 * Update enrolled courses list
 * @param {string} courseId - The course ID
 * @param {string} courseName - The course name
 */
function updateEnrolledCourses(courseId, courseName)
{
    const enrolledCourses = document.getElementById('enrolled-courses');
    if (enrolledCourses)
    {
        const courseItem = document.createElement('li');
        courseItem.innerHTML = `
            <span class="course-name">${courseName}</span>
            <span class="course-status">Enrolled</span>
            <progress value="0" max="100"></progress>
        `;
        enrolledCourses.appendChild(courseItem);
        
        // Animate progress
        setTimeout(() => 
        {
            courseItem.querySelector('progress').value = 10;
        }, 100);
    }
}

/**
 * Show modal dialog
 * @param {string} title - The modal title
 * @param {string} content - The modal content
 */
function showModal(title, content)
{
    // Remove any existing modals
    const existingModal = document.getElementById('custom-modal');
    if (existingModal)
    {
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
    modal.addEventListener('click', function(e)
    {
        if (e.target === modal)
        {
            closeModal();
        }
    });
    
    // Show modal
    setTimeout(() => 
    {
        modal.classList.add('active');
    }, 10);
}

/**
 * Close modal dialog
 */
function closeModal()
{
    const modal = document.getElementById('custom-modal');
    if (modal)
    {
        modal.classList.remove('active');
        setTimeout(() => 
        {
            modal.remove();
        }, 300);
    }
}