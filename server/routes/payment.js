const express = require('express');
const router = express.Router();
const { authenticate } = require('./auth');
const crypto = require('crypto');

// Payment route
router.post('/', authenticate, async (req, res) => {
    const { address, cardNumber, expirationDate, code } = req.body;

    try {
        // Simulating safe transactions with simple hash
        const hashedCardNumber = crypto.createHash('sha256').update(cardNumber).digest('hex');
        const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

        console.log('Payment made successfully:');
        console.log('Card Number:', hashedCardNumber);
        console.log('Code:', hashedCode);


        res.status(200).json({ success: true, message: 'Payment Successful!' });
    } catch (error) {
        console.error('Error while processing payment:', error);
        res.status(500).json({ success: false, message: 'Error while processing payment.' });
    }
});

module.exports = router;
