const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use(
    '/',
    createProxyMiddleware({
        target: process.env.CHAT_SERVICE || "http://localhost:4000",
        changeOrigin: true,
        pathRewrite: {'^/chat': ''},

    })
);
console.log("test+++++++++++++++"),

module.exports = router;