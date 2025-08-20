const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('./middlewares/auth');

// dotenv.config();
// Load .env by default, but if NODE_ENV=test, load .env.test
dotenv.config({
    path: process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '.env.test')
        : path.resolve(__dirname, '.env')
});
console.log(process.env.PORT); // Reads value from .env

const app = express();
const port = process.env.PORT || 3000;

// 1. Logging middleware
app.use(morgan('dev'));


// 2. Rate Limiter middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 req per min
    message: { error: 'Too Many requests, please try againn later.' }
});
app.use(limiter); // Apply to all routes


// Public route (no authen)
app.get('/', (req, res) => res.send('API Gateway is running'));


// 3. Routes
app.use('/chat', authMiddleware, require('./routes/chat'));
app.use('/file', authMiddleware, require('./routes/file'));


// Start Server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`API Gateway running on port ${port}`);
    });
}

module.exports = app