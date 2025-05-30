//Function that sends login info to server
async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            //Stores token on local storage to make operations easier
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); //Store user data

            // Redirects user to homepage upon login
            window.location.href = '../pages/index.html';
        } else {
            alert(data.message || 'Login failed, check your credentials!');
        }
    } catch (error) {
        console.error('Error in login:', error);
        alert('Error while trying to login. Try again later.');
    }
}

// Signup function, register new user
async function registerUser(name, email, password) {
    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        console.log(response);
        if (response.ok) {
            alert('Signup Successful! Now you can login.');
            // Redirect to login page
            window.location.href = '../pages/login.html';
        } else {
            alert(data.message || 'Error while Signing up! Try again later.');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Error while Signing up. Try again later.');
    }
}

// Handle if user is trying to login or signup
function handleFormSubmit(event) {
    event.preventDefault();

    const isLoginForm = event.target.id === 'login-form'; // checks if it's login

    let email, password, name;

    if (isLoginForm) {
        email = document.getElementById('login-email').value;
        password = document.getElementById('login-password').value;
    } else {
        name = document.getElementById('register-name').value;
        email = document.getElementById('register-email').value;
        password = document.getElementById('register-password').value;
    }

    if (!email || !password || (isLoginForm ? false : !name)) {
        alert('Please fill all fields.');
        return;
    }

    if (isLoginForm) {
        // Calls login
        loginUser(email, password);
    } else {
        // Calls register, which is signup
        registerUser(name, email, password);
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    alert('You signed out!');
    updateHeader(); // Update header to show no-user header
    window.location.href = '../pages/index.html'; // Redirect to home
}

// Add listener events to login and signup.
document.getElementById('login-form').addEventListener('submit', handleFormSubmit);
document.getElementById('register-form').addEventListener('submit', handleFormSubmit);