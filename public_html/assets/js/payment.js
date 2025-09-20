// Payment functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePayment();
});

function initializePayment() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const plan = user.accountPlan || 'plus';
    
    // Update plan info
    const planName = document.getElementById('plan-name');
    const planPrice = document.getElementById('plan-price');
    
    if (plan === 'plus') {
        planName.textContent = 'Plus';
        planPrice.textContent = '$20';
    } else if (plan === 'pro') {
        planName.textContent = 'Pro';
        planPrice.textContent = '$200';
    }
    
    // Copy wallet address
    document.getElementById('copy-address').addEventListener('click', function() {
        const address = document.getElementById('wallet-address').textContent;
        navigator.clipboard.writeText(address).then(() => {
            showNotification('Wallet address copied to clipboard', 'success');
        });
    });
    
    // Handle form submission
    document.getElementById('payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate payment processing
        showNotification('Processing your payment...', 'info');
        
        setTimeout(() => {
            // Update user account to paid
            user.paymentStatus = 'paid';
            user.paymentDate = new Date().toISOString();
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            showNotification('Payment processed successfully!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 3000);
    });
}