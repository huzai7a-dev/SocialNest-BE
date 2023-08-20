"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
var joi_1 = require("joi");
var signupSchema = joi_1.default.object({
    full_name: joi_1.default.string().min(3).max(355).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(255).required(),
    profile_image: joi_1.default.any()
});
var loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(255).required(),
});
var validateSignup = function (req) {
    return signupSchema.validate(req);
};
exports.validateSignup = validateSignup;
var validateLogin = function (req) {
    return loginSchema.validate(req);
};
exports.validateLogin = validateLogin;
