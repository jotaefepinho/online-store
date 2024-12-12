const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { authenticate } = require('./auth');

// Get user profile
router.get('/', authenticate, (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Sending only useful fields
        const { _id, name, email, role, phone, address, city, state, zip, country } = req.user;

        // Sending response
        res.status(200).json({
            id: _id,
            name,
            email,
            role,
            phone,
            address,
            city,
            state,
            zip,
            country
        });

    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
 
// Update user profile
router.put('/', authenticate, async (req, res) => {
    const { name, email, phone, address, city, state, zip, country } = req.body;
    
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Update user data
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.city = city || user.city;
        user.state = state || user.state;
        user.zip = zip || user.zip;
        user.country = country || user.country;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}
);

// Delete user profile
router.delete('/', authenticate, async (req, res) => {
    try {
        const deletedProfile = await User.deleteOne({"_id": req.user._id});
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error while deleting profile:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
