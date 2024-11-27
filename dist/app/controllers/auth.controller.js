"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_schema_1 = require("../validators/auth.schema");
const auth_service_1 = require("../services/auth.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validating Incoming Data using Zod Validator
        const { username, email, password } = auth_schema_1.registerSchema.parse(req.body);
        //Checking if user already exists, method written in auth.service
        const isExistingUser = yield (0, auth_service_1.findUserByEmail)(email);
        if (isExistingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        //Registering User using method written in auth.service
        const user = yield (0, auth_service_1.registerUser)(username, email, password);
        //Generating JWT Token
        const token = (0, auth_service_1.generateToken)(user.id, user.username);
        res.status(201).json({
            message: "User Registered Successfully",
            token,
        });
    }
    catch (error) {
        res.status(400).json({ message: "Error Registering User" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = auth_schema_1.loginSchema.parse(req.body);
        //Check if user exists
        const user = yield (0, auth_service_1.findUserByEmail)(email);
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
        //Since the user exists, check if password is correct
        const isPasswordValid = yield (0, auth_service_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Password" });
            return;
        }
        //Generate a JWT Token
        const token = (0, auth_service_1.generateToken)(user.id, user.username);
        //Return token to user
        res.status(200).json({
            message: "User Logged In Successfully",
            token,
        });
    }
    catch (error) {
        res.status(400).json({ message: "Error Logging In User" });
    }
});
exports.login = login;
