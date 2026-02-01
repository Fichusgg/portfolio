// ===========================
// Hero Animation Trigger
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Add 'loaded' class to body to trigger hero animations
    document.body.classList.add('loaded');
});

// ===========================
// Copy Email Functionality
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const email = 'filip@jaern.se';
            const label = copyBtn.querySelector('.copy-label');
            
            // Try modern Clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email)
                    .then(function() {
                        showCopiedState(copyBtn, label);
                    })
                    .catch(function(err) {
                        // Fallback if Clipboard API fails
                        fallbackCopy(email, copyBtn, label);
                    });
            } else {
                // Fallback for older browsers
                fallbackCopy(email, copyBtn, label);
            }
        });
    }
});

// Show "Copied" state for 1.2 seconds
function showCopiedState(button, label) {
    const originalText = label.textContent;
    
    label.textContent = 'Copied';
    button.classList.add('copied');
    
    setTimeout(function() {
        label.textContent = originalText;
        button.classList.remove('copied');
    }, 1200);
}

// Fallback copy method using hidden input
function fallbackCopy(text, button, label) {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.value = text;
    
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopiedState(button, label);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(input);
}