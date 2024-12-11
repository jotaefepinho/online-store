document.addEventListener('DOMContentLoaded', function () {
    const addUserBtn = document.getElementById('add-user-btn');
    const userModal = document.getElementById('user-modal');
    const closeModal = document.querySelector('.close');
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const modalTitle = document.getElementById('modal-title');
    const saveUserBtn = document.getElementById('save-user-btn'); // Save button

    let editingUserId = null;
    const token = localStorage.getItem('authToken'); // Get token

    if (!addUserBtn || !userModal || !closeModal || !userForm || !userList || !modalTitle || !saveUserBtn) {
        console.error('Some elements were not found on DOM.');
        return;
    }

    // Open modal function
    function openModal(title) {
        modalTitle.textContent = title;
        userModal.style.display = 'block'; // Show modal
    }

    // Close modal function
    function closeModalAndReset() {
        userModal.style.display = 'none'; // Hide modal
        userForm.reset();
        editingUserId = null;
    }

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/auth/users', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token on request
                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Error while searching users:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error while searching users:', error);
            return [];
        }
    }

    async function populateUserList() {
        userList.innerHTML = '';
        const users = await fetchUsers();

        users.forEach(user => {
            const row = document.createElement('tr');
            const isProtectedUser = ['admin'].includes(user.role);

            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="edit-user-btn" data-id="${user._id}">Edit</button>
                    <button class="delete-user-btn" data-id="${user._id}" ${isProtectedUser ? 'disabled' : ''}>
                        Delete
                    </button>
                </td>
            `;
            userList.appendChild(row);
        });

        document.querySelectorAll('.edit-user-btn').forEach(btn => {
            btn.addEventListener('click', () => editUser(btn.dataset.id));
        });

        document.querySelectorAll('.delete-user-btn').forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', () => deleteUserAndRefresh(btn.dataset.id));
            }
        });
    }

    async function editUser(id) {
        try {
            const response = await fetch(`http://localhost:3000/auth/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const user = await response.json();
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('role').value = user.role;
                editingUserId = user._id;
                openModal('Edit User');
            } else {
                console.error('Error while searching user:', response.statusText);
            }
        } catch (error) {
            console.error('Error while searching user:', error);
        }
    }

    async function saveUserChanges(event) {
        event.preventDefault(); // Prevent standard form functions

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        if (editingUserId) {
            const updatedUser = { id: editingUserId, name, email, role };
            await updateUser(updatedUser);
            closeModalAndReset();
            await populateUserList(); // Reload user list
        }
    }

    async function updateUser(user) {
        try {
            const response = await fetch(`http://localhost:3000/auth/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('User updated successfully.');
            } else {
                console.error('Error while updating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error while updating user:', error);
        }
    }

    async function deleteUserAndRefresh(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:3000/auth/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error('Error while deleting user:', errorResponse.message);
                }
            } catch (error) {
                console.error('Error while deleting user:', error);
            }
    
            await populateUserList();
        }
    }
    

    populateUserList();

    // Add event on save button
    saveUserBtn.addEventListener('click', saveUserChanges);
});
