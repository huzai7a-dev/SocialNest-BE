"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object({
    full_name: joi_1.default.string().min(3).max(355).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(255).required(),
    profile_image: joi_1.default.any()
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(255).required(),
});
const validateSignup = (req) => {
    return signupSchema.validate(req);
};
exports.validateSignup = validateSignup;
const validateLogin = (req) => {
    return loginSchema.validate(req);
};
exports.validateLogin = validateLogin;
