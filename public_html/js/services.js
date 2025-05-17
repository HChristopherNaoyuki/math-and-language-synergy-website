// Services Page Specific JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize Program Tabs
    initializeProgramTabs();
    
    // Setup Accordion for Mobile View
    setupMobileAccordion();
});

// Initialize Program Tabs
function initializeProgramTabs()
{
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length && tabPanes.length)
    {
        tabButtons.forEach(button => 
        {
            button.addEventListener('click', function()
            {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding pane
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

// Setup Accordion for Mobile View
function setupMobileAccordion()
{
    const audienceCards = document.querySelectorAll('.audience-card');
    
    if (audienceCards.length)
    {
        audienceCards.forEach(card => 
        {
            const header = card.querySelector('h3');
            
            header.addEventListener('click', function()
            {
                if (window.innerWidth <= 768)
                {
                    card.classList.toggle('active');
                }
            });
        });
    }
}