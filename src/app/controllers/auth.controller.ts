import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../validators/auth.schema';
import AuthService from '../services/auth.service';
import { RegisterUserResponseDTO, RegisterUserDTO, LoginUserResponseDTO, LoginUserDTO } from '../../types/auth.types';

const AuthController = {

    register: async (
        req: Request<{},{}, RegisterUserDTO>,
        res: Response
    ) => {

        try {
            //Validating Incoming Data using Zod Validator
            const { username, email, password } = registerSchema.parse(req.body);

            //Checking if user already exists, method written in auth.service
            const isExistingUser = await AuthService.findUserByEmail(email);
            if (isExistingUser) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            //Registering User using method written in auth.service
            const user = await AuthService.registerUser(username, email, password);

            // If user creation fails, handle the issue
            if (!user) {
                res.status(500).json({ message: "Error registering user" });
                return;
            }

            //Generating JWT Token
            const token = AuthService.generateToken(user.id, user.username);

            const response: RegisterUserResponseDTO = {
                message: "User Registered Successfully",
                token,
            }

            res.status(201).json(response);

        } catch (error) {
            res.status(400).json({ message: "Error Registering User" });
        }
    },

    login: async (
        req: Request<{},{}, LoginUserDTO>,
        res: Response
    ) => {

        try {

            const { email, password } = loginSchema.parse(req.body);

            //Check if user exists
            const user = await AuthService.findUserByEmail(email);
            if (!user) {
                res.status(400).json({ message: "User does not exist" });
                return;
            }

            //Since the user exists, check if password is correct
            const isPasswordValid = await AuthService.comparePassword(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: "Invalid Password" });
                return;
            }

            //Generate a JWT Token
            const token = AuthService.generateToken(user.id, user.username);

            const response: LoginUserResponseDTO = {
                message: "User Logged In Successfully",
                token,
            };

            //Return token to user
            res.status(200).json(response);

        } catch (error) {
            res.status(400).json({ message: "Error Logging In User" });
        }
    }
};

export default AuthController;

