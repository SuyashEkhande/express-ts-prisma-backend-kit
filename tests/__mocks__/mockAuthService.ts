export const mockAuthService = {
  registerUser: jest.fn().mockResolvedValue({
    message: 'User Registered Successfully',
    token: 'mockToken123',
  }),
  findUserByEmail: jest.fn().mockResolvedValue(null),  // Default to simulate no user found

  // Optionally, mock when user exists
  findUserByEmailExisting: jest.fn().mockResolvedValue({
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'hashedpassword123',
  }),

  comparePassword: jest.fn().mockResolvedValue(true),
  generateToken: jest.fn().mockReturnValue('mocked-jwt-token'),
};
