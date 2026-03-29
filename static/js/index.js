// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLoginPage();
});

// Initialize login page functionality
function initializeLoginPage() {
    setupRoleTabListeners();
    setupLoginFormListener();
    setDefaultActiveTab();
}

// Setup role tab selector logic
function setupRoleTabListeners() {
    const roleTabs = document.querySelectorAll('.role-tab');
    const userTypeInput = document.getElementById('userType');
    
    roleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            roleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            userTypeInput.value = this.getAttribute('data-role');
        });
    });
}

// Set default active tab
function setDefaultActiveTab() {
    const roleTabs = document.querySelectorAll('.role-tab');
    if (roleTabs.length > 0) {
        roleTabs[0].classList.add('active');
    }
}

// Setup login form submission listener
function setupLoginFormListener() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLoginSubmit();
    });
}

// Handle login form submission
function handleLoginSubmit() {
    const userType = document.getElementById('userType').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    // Clear previous errors
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';

    // Validation
    if (!username || !password) {
        displayLoginError(errorDiv, 'Please enter both username and password.');
        return;
    }

    // Simulate login success and redirect based on user type
    redirectBasedOnUserType(userType);
}

// Display login error message
function displayLoginError(errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    errorDiv.classList.add('animate-shake');
    
    setTimeout(() => {
        errorDiv.classList.remove('animate-shake');
    }, 500);
}

// Redirect to appropriate dashboard based on user type
function redirectBasedOnUserType(userType) {
    let redirectUrl = 'homepage.html';
    
    switch(userType) {
        case 'student':
            redirectUrl = 'studentdashboard.html';
            break;
        case 'kutir_supervisor':
            redirectUrl = 'supervisor.html';
            break;
        case 'post_office_supervisor':
            redirectUrl = 'suprvisorpo.html';
            break;
        case 'admin':
            redirectUrl = 'admin.html';
            break;
        default:
            redirectUrl = `homepage.html?userType=${encodeURIComponent(userType)}`;
    }
    
    window.location.href = redirectUrl;
}

// Handle back to home navigation
function goBackToHome() {
    window.location.href = 'homepage.html';
}
