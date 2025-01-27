import request from 'supertest';
import { Application } from 'express';
import jwt from 'jsonwebtoken';
import app from '../app'; // Ensure `app.ts` exports the Express application

describe('KYC Tests', () => {
  let server: Application;
  let token: string;

  beforeAll(() => {
    server = app;

    // Generate a mock token for testing
    token = jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  });

  it('should submit KYC information', async () => {
    const res = await request(server)
      .post('/kyc/submit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 1,
        documentUrl: 'path/to/document.png',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('kyc');
    expect(res.body.kyc).toHaveProperty('status', 'Pending');
  });

  it('should get KYC status', async () => {
    const res = await request(server).get('/kyc/status').set('Authorization', `Bearer ${token}`).query({ userId: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('kyc');
  });
});
