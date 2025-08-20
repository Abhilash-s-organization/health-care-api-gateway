const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use(
    '/',
    createProxyMiddleware({
        target: process.env.FILE_SERVICE || "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: {'^/file': ''},

    })
);

module.exports = router;