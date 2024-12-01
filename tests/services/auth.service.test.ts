import AuthService from '../../src/app/services/auth.service';
import prisma from '../../src/config/prisma.client';

jest.mock('../src/config/prisma.client', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe('AuthService Tests', () => {
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      prisma.user.create.mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      const result = await AuthService.registerUser('testuser', 'test@example.com', 'password123');
      
      expect(result).toBeDefined();
      expect(result.username).toBe('testuser');
    });

    it('should throw an error if user creation fails', async () => {
      prisma.user.create.mockRejectedValue(new Error('Error creating user'));

      try {
        await AuthService.registerUser('testuser', 'test@example.com', 'password123');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Error creating user');
      }
    });
  });
});
