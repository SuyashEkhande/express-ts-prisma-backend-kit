import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../../config/app.config";
import prisma from "../../config/prisma.client";

const AuthService = {

    // Function to hash password
    hashPassword: async (
        password: string
    ): Promise<string> => {
        //console.log(password)
        const salt = await bcrypt.genSalt(10);
        //console.log(salt)
        return bcrypt.hash(password, salt)
    },

    // Function to compare hashed password with plain text password
    comparePassword: async (
        password: string,
        hashedPassword: string
    ): Promise<boolean> => {
        return bcrypt.compare(password, hashedPassword);
    },

    //Function to generate JWT token
    generateToken: (
        userId: number,
        username: string
    ): string => {
        return jwt.sign(
            { userId, username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );
    },

    // Function to register a new user
    registerUser: async (
        username: string,
        email: string,
        password: string
    ) => {
        //console.log(username, email, password);
        const hashedPassword = await AuthService.hashPassword(password);
        console.log("creating user")
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        }).catch((error) => {
            console.log(error);
        });

        console.log(user)
        return user;
    },

    //Function to find user by email
    findUserByEmail: async (
        email: string
    ) => {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }

};

export default AuthService;



