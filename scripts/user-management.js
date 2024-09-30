// Example script for managing the dialogue functionality
const addUserBtn = document.getElementById('add-user-btn');
const userModal = document.getElementById('user-modal');

const closeModal = document.getElementsByClassName('close')[0];

const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
console.log(users);
// Open modal
addUserBtn.onclick = function() {
    userModal.style.display = 'block';
}

// Close modal
closeModal.onclick = function() {
    userModal.style.display = 'none';
}

// Submit form
userForm.onsubmit = function(event) {
    event.preventDefault();
    
    // Logic to add/edit user
    // Inject a new row into the table
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    const newRow = `<tr>
        <td>${users.length + 1}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td><button>Edit</button> <button>Delete</button></td>
    </tr>`;

    userList.innerHTML += newRow;

}