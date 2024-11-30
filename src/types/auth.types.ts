import { z } from "zod";
import { registerSchema, loginSchema } from "../app/validators/auth.schema";

export type AuthUserData = {
  username?: string;
  email?: string;
  userId?: number;
}

export type RegisterUserDTO = z.infer<typeof registerSchema>;

export type LoginUserDTO = z.infer<typeof loginSchema>;

export type RegisterUserResponseDTO = {
  message: string;
  token: string;
};

export type LoginUserResponseDTO = RegisterUserResponseDTO;
