const users = [
    {
        id: 1,
        name: 'Joao Pinho',
        email: 'jota@usp33.br',
        role: 'admin'
    },
    {
        id: 2,
        name: 'Arturo Borges',
        email: 'arturo@icmc.usp.br',
        role: 'admin'
    },
    {
        id: 3,
        name: 'José',
        email: 'jose@gmail.com',
        role: 'viewer'
    }
];

// Function to populate the user list on page load
window.onload = function() {
    const userList = document.getElementById('user-list');
    users.forEach(user => {
        const userRow = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><button>Edit</button> <button>Delete</button></td>
        </tr>`;
        userList.innerHTML += userRow;
    });
}
localStorage.setItem('users', JSON.stringify(users));