document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('You need to be logged in to see this page.');
        window.location.href = '../pages/login.html';
        return;
    }

    const profileForm = document.getElementById('profile-form');
    const profileDisplay = document.getElementById('profile-display');
    const deleteAccountButton = document.getElementById('delete-account');

    // Call loadProfile when the page is loaded
    loadProfile(token, profileForm, profileDisplay);

    // Event listener to handle profile update
    profileForm.addEventListener('submit', (event) => handleProfileUpdate(event, token, profileForm));

    // Event listener to handle account deletion
    deleteAccountButton.addEventListener('click', () => handleAccountDeletion(token));
});

// Function to load user profile data
async function loadProfile(token, profileForm, profileDisplay) {
    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Error while loading profile');
        }

        const profile = await response.json();
        console.log("profile:", profile);
        displayProfile(profile, profileForm, profileDisplay);
    } catch (error) {
        console.error(error);
        alert('Error while loading profile data.');
    }
}

// Function to display user profile information
function displayProfile(profile, profileForm, profileDisplay) {
    if (!profile) {
        console.error('Profile not found.');
        return;
    }

    profileDisplay.innerHTML = `
        <p><strong>Name:</strong>       ${profile.name || 'No data given'}</p>
        <p><strong>email:</strong>      ${profile.email || 'No data given'}</p>
        <p><strong>Phone:</strong>   ${profile.phone || 'No data given'}</p>
        <p><strong>Address:</strong>   ${profile.address || 'No data given'}</p>
        <p><strong>City:</strong>     ${profile.city || 'No data given'}</p>
        <p><strong>State:</strong>     ${profile.state || 'No data given'}</p>
        <p><strong>Country:</strong>       ${profile.country || 'No data given'}</p>
        <p><strong>ZIP Code:</strong>        ${profile.zip || 'No data given'}</p>
    `;

    // Populate form fields for editing
    profileForm.name.value = profile.name || '';
    profileForm.email.value = profile.email || '';
    profileForm.phone.value = profile.phone || '';
    profileForm.address.value = profile.address || '';
    profileForm.city.value = profile.city || '';
    profileForm.state.value = profile.state || '';
    profileForm.country.value = profile.country || '';
    profileForm.zip.value = profile.zip || '';
}

// Function to handle profile update
async function handleProfileUpdate(event, token, profileForm) {
    event.preventDefault();

    const profileData = {
        name: profileForm.name.value,
        email: profileForm.email.value,
        phone: profileForm.phone.value,
        address: profileForm.address.value,
        city: profileForm.city.value,
        state: profileForm.state.value,
        zip: profileForm.zip.value,
        country: profileForm.country.value,
    };

    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error('Error while loading profile');
        }

        const result = await response.json();
        alert('Profile update successfully!');
        displayProfile(result.profile, profileForm, document.getElementById('profile-display'));
    } catch (error) {
        console.error(error);
        alert('Error while saving profile updates.');
    }
}

// Function to handle account deletion
async function handleAccountDeletion(token) {
    if (!confirm('Are you sure you want to delete your account?')) return;

    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Error while deleting account.');
        }

        alert('Account deleted successfully.');
        localStorage.removeItem('authToken');
        window.location.href = '../pages/login.html';
    } catch (error) {
        console.error(error);
        alert('Error while deleting account.');
    }
}
