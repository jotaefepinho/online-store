document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const deleteAccountButton = document.getElementById('delete-account');
    const profileDisplay = document.getElementById('profile-display');

    // Load user data from localStorage or use default values
    let userData = JSON.parse(localStorage.getItem('userData')) || {
        'full-name': 'John Doe',
        'email': 'john@example.com',
        'phone': '+1 (555) 555-5555',
        'address': '123 Main St',
        'city': 'Los Angeles',
        'state': 'CA',
        'zip': '90001',
        'country': 'USA'
    };

    // Function to update the profile display
    function updateProfileDisplay() {
        profileDisplay.innerHTML = `
            <h3>Current Profile Information</h3>
            <p><strong>Name:</strong> ${userData['full-name']}</p>
            <p><strong>Email:</strong> ${userData['email']}</p>
            <p><strong>Phone:</strong> ${userData['phone']}</p>
            <p><strong>Address:</strong> ${userData['address']}</p>
            <p><strong>City:</strong> ${userData['city']}</p>
            <p><strong>State:</strong> ${userData['state']}</p>
            <p><strong>Zip Code:</strong> ${userData['zip']}</p>
            <p><strong>Country:</strong> ${userData['country']}</p>
        `;
    }

    // Function to populate form with user data
    function populateForm() {
        for (const [key, value] of Object.entries(userData)) {
            const input = document.getElementById(key);
            if (input) {
                input.value = value;
            }
        }
    }

    // Initial population of form and display of profile information
    populateForm();
    updateProfileDisplay();

    // Handle form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update userData with form values
        for (const [key, value] of Object.entries(userData)) {
            const input = document.getElementById(key);
            if (input) {
                userData[key] = input.value;
            }
        }

        // Save updated userData to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update the profile display
        updateProfileDisplay();
        
        alert('Profile updated successfully!');
    });

    // Handle account deletion
    deleteAccountButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Clear user data from localStorage
            localStorage.removeItem('userData');
            alert('Your account has been deleted.');
            // Reset form and display to default values
            userData = {
                'full-name': '',
                'email': '',
                'phone': '',
                'address': '',
                'city': '',
                'state': '',
                'zip': '',
                'country': ''
            };
            populateForm();
            updateProfileDisplay();
        }
    });
});