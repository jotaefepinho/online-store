// Function to get user data from localStorage based on user ID
function getUserById(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.id === userId);
}

// Function to update user data in localStorage
function updateUserInLocalStorage(updatedUser) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to populate the form with user data
function populateUserProfile(user) {
    document.getElementById('full-name').value = user.address.fullName;
    document.getElementById('address').value = user.address.street;
    document.getElementById('city').value = user.address.city;
    document.getElementById('state').value = user.address.state;
    document.getElementById('zip').value = user.address.zip;
    document.getElementById('country').value = user.address.country;
    document.getElementById('email').value = user.email;
    document.getElementById('card-number').value = user.paymentDetails.cardNumber;
    document.getElementById('exp-date').value = user.paymentDetails.expDate;
    document.getElementById('cvv').value = user.paymentDetails.cvv;
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get updated values from the form
    const userId = parseInt(new URLSearchParams(window.location.search).get('id')); // Get user ID from query string
    const updatedUser = getUserById(userId);
    updatedUser.address.fullName = document.getElementById('full-name').value;
    updatedUser.address.street = document.getElementById('address').value;
    updatedUser.address.city = document.getElementById('city').value;
    updatedUser.address.state = document.getElementById('state').value;
    updatedUser.address.zip = document.getElementById('zip').value;
    updatedUser.address.country = document.getElementById('country').value;
    updatedUser.email = document.getElementById('email').value;
    updatedUser.paymentDetails.cardNumber = document.getElementById('card-number').value;
    updatedUser.paymentDetails.expDate = document.getElementById('exp-date').value;
    updatedUser.paymentDetails.cvv = document.getElementById('cvv').value;

    // Update the user in localStorage
    updateUserInLocalStorage(updatedUser);

    alert('User information updated successfully!');
}

// On page load, populate the user profile form
window.onload = function() {
    const userId = parseInt(new URLSearchParams(window.location.search).get('id')); // Get user ID from query string
    const user = getUserById(userId);
    if (user) {
        populateUserProfile(user);
        document.getElementById('profile-form').onsubmit = handleFormSubmit; // Set form submission handler
    } else {
        alert('User not found.');
    }
}
