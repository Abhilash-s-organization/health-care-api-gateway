const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = require('../server'); // Gateway app

const testToken = jwt.sign({ userId: 1, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('API Gateway Tests', () => {
  
  // Root route
  test('GET / should return API Gateway is running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/API Gateway is running/);
  });

  // Chat route tests
  describe('Chat Service Proxy', () => {
    test('Should block access without token', async () => {
      const res = await request(app).get('/chat/test');
      expect(res.statusCode).toBe(401);
    });

    test('Should block access with invalid token', async () => {
      const res = await request(app)
        .get('/chat/test')
        .set('Authorization', 'Bearer invalidtoken');
      expect(res.statusCode).toBe(403);
    });

    test('Should allow access with valid token', async () => {
      // Mock chat service
      app.use('/chat/test', (req, res) => {
        res.status(200).json({ message: 'Chat service OK' });
      });

      const res = await request(app)
        .get('/chat/test')
        .set('Authorization', `Bearer ${testToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Chat service OK');
    });
  });

  // File route tests
  describe('File Service Proxy', () => {
    test('Should block access without token', async () => {
      const res = await request(app).get('/file/test');
      expect(res.statusCode).toBe(401);
    });

    test('Should block access with invalid token', async () => {
      const res = await request(app)
        .get('/file/test')
        .set('Authorization', 'Bearer invalidtoken');
      expect(res.statusCode).toBe(403);
    });

    test('Should allow access with valid token', async () => {
      // Mock file service
      app.use('/file/test', (req, res) => {
        res.status(200).json({ message: 'File service OK' });
      });

      const res = await request(app)
        .get('/file/test')
        .set('Authorization', `Bearer ${testToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'File service OK');
    });
  });

});
