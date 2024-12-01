export const mockAuthService = {
    registerUser: jest.fn().mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashedpassword123',
    }),
    findUserByEmail: jest.fn().mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashedpassword123',
    }),
    comparePassword: jest.fn().mockResolvedValue(true),
    generateToken: jest.fn().mockReturnValue('mocked-jwt-token'),
};
  