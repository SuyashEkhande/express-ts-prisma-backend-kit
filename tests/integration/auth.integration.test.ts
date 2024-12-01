import request from 'supertest';
import { mockAuthService } from '../__mocks__/mockAuthService'; 
jest.mock('../../src/app/services/auth.service', () => mockAuthService); 
import prisma from '../../src/config/prisma.client';
import { app, server } from '../../src/index'; 

// Mock the AuthMiddleware to simulate a valid user for authentication
jest.mock('../../src/app/middlewares/auth.middleware', () => ({
  authMiddleware: jest.fn().mockImplementation((req, res, next) => {
    req.authUser = { id: 1, username: 'testuser' }; // Mocked user data
    next(); // Proceed to the next middleware
  }),
}));

describe('AuthController', () => {
  let token: string;
  let userEmail: string; 

  // Define the user object here
  let user: { username: string, email: string, password: string };

  // Before all tests, generate a unique email and delete the user if it exists
  beforeAll(async () => {
    userEmail = `testuser-${Date.now()}@example.com`; // Generate a unique email based on timestamp

    // Define the user object after the email is generated
    user = {
      username: 'testuser',
      email: userEmail,
      password: 'testpassword123',
    };

    try {
      // Delete the user if it already exists in the database
      const deletedUser = await prisma.user.deleteMany({
        where: {
          email: user.email,
        },
      });

      if (deletedUser.count > 0) {
        console.log('Test user deleted');
      } else {
        console.log('No test user found to delete');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  });

  // Test for user registration
  it('should register a new user', async () => {
    // Ensure the registerUser mock resolves as expected and does not simulate user already existing
    mockAuthService.findUserByEmail.mockResolvedValue(null); // No existing user

    mockAuthService.registerUser.mockResolvedValue({
      message: 'User Registered Successfully',
      token: 'mocked-token', // Mocked token to simulate successful registration
    });

    const res = await request(app)
      .post('/auth/register')
      .send(user);

    console.log(res.body); // Log the response body to debug

    // Check the status code and the response body
    expect(res.status).toBe(201);  // Expect status 201 for successful creation
    expect(res.body.message).toBe('User Registered Successfully');
    expect(res.body.token).toBeDefined();
    token = res.body.token;  // Store token for further tests
  });

  it('should return an error if the user already exists', async () => {
    mockAuthService.findUserByEmail.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: userEmail,
      password: 'hashedpassword123',
    }); // Simulate existing user

    const res = await request(app)
      .post('/auth/register')
      .send(user);

    console.log(res.body); // Log the response body to debug

    // Check if it returns the appropriate error message
    expect(res.status).toBe(400); // Expect status 400 for user already exists
    expect(res.body.message).toBe('User already exists');
  });

  // Cleanup after all tests
  afterAll(() => {
    server.close(); // Close the server to release resources
  });
});
