"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: './uploads' });
const router = (0, express_1.Router)();
router.post('/signup', upload.any(), authControllers_1.handleSignup);
router.post('/login', authControllers_1.handleLogin);
exports.default = router;
