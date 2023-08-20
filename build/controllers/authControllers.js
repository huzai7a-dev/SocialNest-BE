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
exports.handleLogin = exports.handleSignup = void 0;
const authValidations_1 = require("../validations/authValidations");
const utils_1 = require("../utils");
const users_1 = require("../utils/dbUtils/users");
const handleSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, authValidations_1.validateSignup)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const { email, full_name, password } = req.body;
    let profile_image_url;
    if (req === null || req === void 0 ? void 0 : req.files) {
        try {
            profile_image_url = yield (0, utils_1.uploadImage)(req === null || req === void 0 ? void 0 : req.files);
        }
        catch (error) {
            res.status(500).send('Internel Server Error');
        }
    }
    const hashedPassword = yield (0, utils_1.encryptPassword)(password);
    try {
        yield (0, users_1.createUser)({ email, full_name, password: hashedPassword, profile_image_url });
        res.status(201).json({ message: 'User added successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'An error occurred while adding a new user' });
    }
});
exports.handleSignup = handleSignup;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = (0, authValidations_1.validateLogin)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const user = yield (0, users_1.searchUserByEmail)(email);
        if (user) {
            const isCorrectPassword = yield (0, utils_1.comparePpassword)(password, user === null || user === void 0 ? void 0 : user.password);
            const token = (0, utils_1.getToken)({ id: user.id, email: user.email });
            if (!isCorrectPassword)
                return res.status(400).send('Invalid email or password');
            return res.status(200).send({ token, message: 'Login successful' });
        }
        else {
            res.status(400).send('Invalid email or password');
        }
    }
    catch (error) {
        console.log(error.stack);
        res.status(500).send('Interval Server Error');
    }
});
exports.handleLogin = handleLogin;
