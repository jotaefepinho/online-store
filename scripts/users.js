const mongoose = require('mongoose');
const User = require('../server/models/Users'); // Path to mongo model

// Default Users
const users = [
    {
        name: 'Joao Pinho',
        email: 'jota@usp33.br',
        password: 'password123', // Will be hashed by mongoose pre-save
        role: 'admin',
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    },
    {
        name: 'Arturo Borges',
        email: 'arturo@icmc.usp.br',
        password: 'password',
        role: 'admin',
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    },
    {
        name: 'José',
        email: 'jose@gmail.com',
        password: 'jose123',
        role: 'viewer',
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    },
];

// Functions to manipulate user
async function getUsers() {
    return await User.find();
}

async function addUser(user) {
    const newUser = new User(user);
    return await newUser.save();
}

async function updateUser(updatedUser) {
    const user = await User.findById(updatedUser.id);
    if (user) {
        Object.assign(user, updatedUser);
        return await user.save();
    }
    throw new Error('User not found');
}

async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}

// Script to import users to mongo db
async function importUsers() {
    try {
        await mongoose.connect('mongodb://localhost:27017/online-store');
        console.log('Conected to MongoDB.');

        // Verify if users do not exist yet.
        for (const user of users) {
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                await addUser(user);
            } else {
                console.log(`User with ${user.email} already exists in database.`);
            }
        }

        console.log('Users imported successfully!');
    } catch (error) {
        console.error('Error while importing users:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Import users upon script execution
if (require.main === module) {
    importUsers();
}

module.exports = { getUsers, addUser, updateUser, deleteUser };