const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use(
    '/',
    createProxyMiddleware({
        target: process.env.FILE_SERVICE,
        changeOrigin: true,
        pathRewrite: {'^/file': ''},

    })
);

module.exports = router;