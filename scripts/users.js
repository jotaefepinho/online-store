let users = [
    { id: 1, name: 'Joao Pinho', email: 'jota@usp33.br', role: 'admin' },
    { id: 2, name: 'Arturo Borges', email: 'arturo@icmc.usp.br', role: 'admin' },
    { id: 3, name: 'José', email: 'jose@gmail.com', role: 'viewer' }
];

function getUsers() {
    return users;
}

function addUser(user) {
    user.id = users.length + 1;
    users.push(user);
}

function updateUser(updatedUser) {
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
    }
}

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
}