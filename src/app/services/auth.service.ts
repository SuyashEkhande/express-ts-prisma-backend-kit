import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../../config/app.config";
import prisma from "../../config/prisma.client";


// Function to hash password
export const hashPassword = async (
    password: string
): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
};

// Function to compare hashed password with plain text password
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

//Function to generate JWT token
export const generateToken = (
    userId: number, 
    username: string
) : string => {
    return jwt.sign(
        {userId, username},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRATION}
    );
};

// Function to register a new user
export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data:{
            username,
            email,
            password: hashedPassword
        }
    });
    return user;
}

//Function to find user by email
export const findUserByEmail = async (
    email: string
) => {
    return prisma.user.findUnique({
        where: {
            email
        }
    });  
};



