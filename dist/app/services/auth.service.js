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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.registerUser = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../../config/app.config");
const prisma_client_1 = __importDefault(require("../../config/prisma.client"));
// Function to hash password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
// Function to compare hashed password with plain text password
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(password, hashedPassword);
});
exports.comparePassword = comparePassword;
//Function to generate JWT token
const generateToken = (userId, username) => {
    return jsonwebtoken_1.default.sign({ userId, username }, app_config_1.JWT_SECRET, { expiresIn: app_config_1.JWT_EXPIRATION });
};
exports.generateToken = generateToken;
// Function to register a new user
const registerUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, exports.hashPassword)(password);
    const user = yield prisma_client_1.default.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });
    return user;
});
exports.registerUser = registerUser;
//Function to find user by email
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_client_1.default.user.findUnique({
        where: {
            email
        }
    });
});
exports.findUserByEmail = findUserByEmail;
