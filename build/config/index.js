"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud = exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloud", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const access = {
    user: 'huzaifa',
    password: 'abc123',
    database: 'social',
    port: 3306
};
const db = mysql2_1.default.createPool(access);
exports.db = db;
cloudinary_1.v2.config({
    cloud_name: 'drwg6wons',
    api_key: '979426751757924',
    api_secret: process.env.CLOUD_API_SECRET
});
