import { Request, RequestHandler, Response } from 'express';
import { registerSchema, loginSchema } from '../validators/auth.schema';
import { registerUser, findUserByEmail, comparePassword, generateToken } from '../services/auth.service';

export const register = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        //Validating Incoming Data using Zod Validator
        const { username, email, password } = registerSchema.parse(req.body);

        //Checking if user already exists, method written in auth.service
        const isExistingUser = await findUserByEmail(email);
        if (isExistingUser) {
            res.status(400).json({ message: "User already exists" });
        }

        //Registering User using method written in auth.service
        const user = await registerUser(username, email, password);

        //Generating JWT Token
        const token = generateToken(user.id, user.username,);

        res.status(201).json({
            message: "User Registered Successfully",
            token,
        });

    } catch (error) {
        res.status(400).json({ message: "Error Registering User" });
    }
};

export const login = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { email, password } = loginSchema.parse(req.body);

        //Check if user exists
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }

        //Since the user exists, check if password is correct
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Password" });
            return;
        }

        //Generate a JWT Token
        const token = generateToken(user.id, user.username);

        //Return token to user
        res.status(200).json({
            message: "User Logged In Successfully",
            token,
        });

    } catch (error) {
        res.status(400).json({ message: "Error Logging In User" });
    }
};