// donation.js - Donation functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeDonationPage();
});

/**
 * Initialize donation page functionality
 */
function initializeDonationPage() {
    initializeCopyAddress();
    initializeAmountButtons();
    initializeDonationForm();
}

/**
 * Initialize copy address functionality
 */
function initializeCopyAddress() {
    const copyButton = document.getElementById('copy-address');
    const btcAddress = document.getElementById('btc-address');
    
    if (copyButton && btcAddress) {
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(btcAddress.textContent).then(() => {
                showNotification('Bitcoin address copied to clipboard!', 'success');
                
                // Change button text temporarily
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.disabled = true;
                
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.disabled = false;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy address: ', err);
                showNotification('Failed to copy address. Please copy manually.', 'error');
            });
        });
    }
}

/**
 * Initialize amount buttons
 */
function initializeAmountButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set custom amount input value
            if (customAmountInput) {
                customAmountInput.value = this.getAttribute('data-amount');
            }
        });
    });
    
    // Clear active button when custom amount is entered
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }
}

/**
 * Initialize donation form
 */
function initializeDonationForm() {
    const donationForm = document.getElementById('donation-form');
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateDonationForm(this)) {
                processDonation(this);
            }
        });
    }
}

/**
 * Validate donation form
 */
function validateDonationForm(form) {
    const customAmountInput = document.getElementById('custom-amount');
    const amountButtons = document.querySelectorAll('.amount-btn.active');
    
    // Check if an amount is selected
    if (!customAmountInput.value && amountButtons.length === 0) {
        showNotification('Please select or enter a donation amount', 'error');
        return false;
    }
    
    // Validate custom amount if provided
    if (customAmountInput.value) {
        const amount = parseFloat(customAmountInput.value);
        if (isNaN(amount) || amount <= 0) {
            showNotification('Please enter a valid donation amount', 'error');
            return false;
        }
    }
    
    return true;
}

/**
 * Process donation
 */
function processDonation(form) {
    const formData = new FormData(form);
    const donationData = {};
    
    for (let [key, value] of formData.entries()) {
        donationData[key] = value;
    }
    
    // Get donation amount
    const customAmountInput = document.getElementById('custom-amount');
    const activeAmountButton = document.querySelector('.amount-btn.active');
    
    if (customAmountInput.value) {
        donationData.amount = customAmountInput.value;
    } else if (activeAmountButton) {
        donationData.amount = activeAmountButton.getAttribute('data-amount');
    }
    
    // Add Bitcoin address and timestamp
    donationData.bitcoinAddress = document.getElementById('btc-address').textContent;
    donationData.timestamp = new Date().toISOString();
    donationData.currency = 'BTC';
    
    // Show processing message
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Save donation data
    saveDonationToFile(donationData);
    
    // Simulate processing delay
    setTimeout(() => {
        showNotification('Thank you for your donation! We appreciate your support.', 'success');
        
        // Reset form
        form.reset();
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
        
        // Restore button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show confirmation
        showDonationConfirmation(donationData);
        
    }, 2000);
}

/**
 * Save donation data to file
 */
function saveDonationToFile(donationData) {
    try {
        // Get existing donations
        let donations = JSON.parse(localStorage.getItem('donations') || '[]');
        
        // Add new donation
        donations.push(donationData);
        
        // Save back to localStorage
        localStorage.setItem('donations', JSON.stringify(donations));
        
        // Also save to text file format
        const donationText = `
New Donation Received
====================
Timestamp: ${new Date(donationData.timestamp).toLocaleString()}
Amount: ${donationData.amount} BTC
Donor Name: ${donationData.donorName || 'Anonymous'}
Donor Email: ${donationData.donorEmail || 'Not provided'}
Bitcoin Address: ${donationData.bitcoinAddress}
Anonymous: ${donationData.anonymous ? 'Yes' : 'No'}
Newsletter: ${donationData.newsletter ? 'Yes' : 'No'}
----------------------------------------
        `.trim();
        
        // Save to text file backup
        let donationFiles = JSON.parse(localStorage.getItem('donationFiles') || '[]');
        donationFiles.push({
            filename: `donation_${Date.now()}.txt`,
            content: donationText,
            timestamp: donationData.timestamp
        });
        
        localStorage.setItem('donationFiles', JSON.stringify(donationFiles));
        
        console.log('Donation recorded:', donationData);
        
    } catch (error) {
        console.error('Error saving donation:', error);
    }
}

/**
 * Show donation confirmation
 */
function showDonationConfirmation(donationData) {
    const confirmationHTML = `
        <div class="donation-confirmation">
            <h3>Donation Confirmed!</h3>
            <p>Thank you for supporting Math and Language Synergy.</p>
            <div class="confirmation-details">
                <p><strong>Amount:</strong> ${donationData.amount} BTC</p>
                <p><strong>Bitcoin Address:</strong> ${donationData.bitcoinAddress}</p>
                <p><strong>Transaction ID:</strong> Please include your transaction ID in an email to donations@mathlanguagesynergy.edu for tracking</p>
            </div>
            <div class="confirmation-actions">
                <button class="btn" onclick="closeConfirmation()">Close</button>
                <button class="btn secondary" onclick="printConfirmation()">Print Receipt</button>
            </div>
        </div>
    `;
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.id = 'donation-confirmation-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Donation Confirmation</h2>
                <span class="modal-close" onclick="closeConfirmation()">&times;</span>
            </div>
            <div class="modal-body">
                ${confirmationHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

/**
 * Close confirmation modal
 */
function closeConfirmation() {
    const modal = document.getElementById('donation-confirmation-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * Print confirmation
 */
function printConfirmation() {
    window.print();
}

/**
 * Show notification
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