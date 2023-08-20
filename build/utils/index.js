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
exports.getToken = exports.comparePpassword = exports.encryptPassword = exports.uploadImage = void 0;
const config_1 = require("../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uploadImage = (imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield config_1.cloud.uploader.upload(imageFile[0].path, {
            folder: 'uploads'
        });
        return result.secure_url;
    }
    catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
});
exports.uploadImage = uploadImage;
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt();
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    return hashedPassword;
});
exports.encryptPassword = encryptPassword;
const comparePpassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashedPassword);
});
exports.comparePpassword = comparePpassword;
const getToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET || '123');
};
exports.getToken = getToken;
