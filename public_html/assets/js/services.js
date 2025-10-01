// services.js - Services page functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeProgramTabs();
    initializeEnrollmentButtons();
});

/**
 * Initialize program tabs functionality
 */
function initializeProgramTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/**
 * Initialize enrollment buttons
 */
function initializeEnrollmentButtons() {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course');
            const courseName = this.getAttribute('data-course-name');
            
            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            
            if (currentUser) {
                // Redirect to enrollment page with course pre-selected
                window.location.href = `enrollment.html?course=${courseId}`;
            } else {
                // Redirect to login page
                showNotification('Please log in to enroll in courses', 'info');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    });
}