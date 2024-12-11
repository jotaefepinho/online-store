async function updateHeader() {
    const token = localStorage.getItem('authToken');
    const loginNavbar = document.querySelector('.login-navbar');
    const adminLink = document.querySelector('nav ul li a[href="../pages/admin.html"]'); // Seleciona o link Admin

    if (token) {
        try {
            const response = await fetch('http://localhost:3000/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const user = await response.json();

                if (user && user.name) {
                    loginNavbar.innerHTML = `
                    <a href="../pages/shopping-cart.html"><img class="shopping-cart" src="../images/shopping-cart.svg"></img></a>

                    <a href="../pages/profile.html">Check your Profile, ${user.name}</a>
                    `;

                    // Show admin link only if user is Admin
                    if (user.role === 'admin') {
                        adminLink.style.display = 'block'; // Show Admin Link
                    } else {
                        adminLink.style.display = 'none'; // Hide Admin Link
                    }
                } else {
                    throw new Error('Invalid user or user with no data.');
                }
            } else {
                throw new Error('Invalid or Expired Token.');
            }
        } catch (error) {
            console.log(error);
            console.error('Error while updating header: ', error);
        }
    } else {
        // If no login, show login/signup options
        loginNavbar.innerHTML = `
            <a href="../pages/login.html">Log in/Sign Up</a>
        `;
        adminLink.style.display = 'none'; // Hide admin link if no login
    }
}


// Calling header update to make sure header is updated upon page load.
document.addEventListener('DOMContentLoaded', updateHeader);
