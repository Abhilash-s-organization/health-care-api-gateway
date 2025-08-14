const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = { userId: 1, role: 'admin' }; // Example payload
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);