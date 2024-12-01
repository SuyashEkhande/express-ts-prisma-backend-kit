import AuthService from '../../src/app/services/auth.service';
import prisma from '../../src/config/prisma.client';

// Mock the Prisma client
jest.mock('../../src/config/prisma.client', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

// Mock bcrypt for password comparison
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'), // mock genSalt
  hash: jest.fn().mockResolvedValue('hashedpassword'),// mock hash
  compare: jest.fn(), 
}));

describe('AuthService Tests', () => {
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      // Mocking the resolved value of prisma.user.create
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      const result = await AuthService.registerUser('testuser', 'test@example.com', 'password123');
      
      expect(result).toBeDefined();
      expect(result?.username).toBe('testuser');
    });

    it('should throw an error if user creation fails', async () => {
      // Mocking the rejected value of prisma.user.create
      (prisma.user.create as jest.Mock).mockRejectedValue(new Error('Error creating user'));

      try {
        await AuthService.registerUser('testuser', 'test@example.com', 'password123');
      } catch (error: any) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Error creating user');
      }
    });
  });
});

