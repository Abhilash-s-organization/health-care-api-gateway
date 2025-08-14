const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use(
    '/',
    createProxyMiddleware({
        target: process.env.CHAT_SERVICE,
        changeOrigin: true,
        pathRewrite: {'^/chat': ''},

    })
);

module.exports = router;