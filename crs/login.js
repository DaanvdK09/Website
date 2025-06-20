// Toggle between login and sign-up
function toggleForms() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("form-title");
    const toggleLink = document.getElementById("toggle-link");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        formTitle.textContent = "Login";
        toggleLink.innerHTML = `Don't have an account? <a href="#" class="Login-page-switch" onclick="toggleForms()">Sign up</a>`;
    }
    
    else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        formTitle.textContent = "Sign Up";
        toggleLink.innerHTML = `Already have an account? <a href="#" class="login-page-switch" onclick="toggleForms()">Login</a>`;
    }
}

// login form submission
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const identifier = document.getElementById("login-identifier").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('email', data.email);
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// sign-up form submission
document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("new-email").value;
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            toggleForms();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Toggle Password
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = '<i class="fa fa-eye-slash"></i>';
    } else {
        input.type = "password";
        btn.innerHTML = '<i class="fa fa-eye"></i>';
    }
}