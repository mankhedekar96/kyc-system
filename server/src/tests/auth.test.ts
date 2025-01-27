import request from 'supertest';
import { Application } from 'express';
import app from '../app'; // Ensure `app.ts` exports the Express application

describe('Auth Tests', () => {
  let server: Application;

  beforeAll(() => {
    server = app;
  });

  it('should register a new user', async () => {
    const res = await request(server).post('/auth/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password',
      role: 'user',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });

  it('should login the user', async () => {
    const res = await request(server).post('/auth/login').send({
      email: 'testuser@example.com',
      password: 'password',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
