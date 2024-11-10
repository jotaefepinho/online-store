document.addEventListener('DOMContentLoaded', function() {
    const addUserBtn = document.getElementById('add-user-btn');
    const userModal = document.getElementById('user-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const modalTitle = document.getElementById('modal-title');

    let editingUserId = null;

    function populateUserList() {
        userList.innerHTML = '';
        getUsers().forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUserAndRefresh(${user.id})">Delete</button>
                </td>
            `;
            userList.appendChild(row);
        });
    }

    function openModal(title) {
        modalTitle.textContent = title;
        userModal.style.display = 'block';
    }

    function closeModalAndReset() {
        userModal.style.display = 'none';
        userForm.reset();
        editingUserId = null;
    }

    addUserBtn.onclick = function() {
        openModal('Add User');
    }

    closeModal.onclick = closeModalAndReset;

    window.onclick = function(event) {
        if (event.target == userModal) {
            closeModalAndReset();
        }
    }

    userForm.onsubmit = function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        if (editingUserId) {
            updateUser({ id: editingUserId, name, email, role });
        } else {
            addUser({ name, email, role });
        }

        populateUserList();
        closeModalAndReset();
    }

    window.editUser = function(id) {
        const user = getUsers().find(u => u.id === id);
        if (user) {
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('role').value = user.role;
            editingUserId = id;
            openModal('Edit User');
        }
    }

    window.deleteUserAndRefresh = function(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
            populateUserList();
        }
    }

    // Initial population of the user list
    populateUserList();
});