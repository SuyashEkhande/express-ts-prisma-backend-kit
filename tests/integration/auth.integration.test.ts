import request from 'supertest';
import {app} from '../../src/index'; // Assuming you have an Express app initialized in src/app.ts
import { mockAuthService } from '../__mocks__/mockAuthService';

jest.mock('../../src/services/auth.service', () => mockAuthService);

describe('AuthController', () => {
  let token: string;

  const user = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword123',
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User Registered Successfully');
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should login a user and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User Logged In Successfully');
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should fail to login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: 'wrongpassword',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid Password');
  });
});
