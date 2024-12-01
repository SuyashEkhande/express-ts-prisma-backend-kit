import request from 'supertest';
import {app} from '../../src/index';  // Import your Express app
import { mockAuthService } from './__mocks/mockAuthService';

// Mocking AuthService methods used in the controller
jest.mock('../src/app/services/auth.service', () => mockAuthService);

describe('AuthController Tests', () => {
  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      mockAuthService.findUserByEmail.mockResolvedValue(null);  // No existing user
      mockAuthService.registerUser.mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      const response = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User Registered Successfully');
      expect(response.body.token).toBeDefined();
    });

    it('should return an error if the user already exists', async () => {
      mockAuthService.findUserByEmail.mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      const response = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in an existing user successfully', async () => {
      mockAuthService.findUserByEmail.mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      });
      mockAuthService.comparePassword.mockResolvedValue(true);  // Correct password
      mockAuthService.generateToken.mockReturnValue('mocked-token');

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User Logged In Successfully');
      expect(response.body.token).toBe('mocked-token');
    });

    it('should return an error if the password is incorrect', async () => {
      mockAuthService.findUserByEmail.mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      });
      mockAuthService.comparePassword.mockResolvedValue(false);  // Incorrect password

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid Password');
    });
  });
});