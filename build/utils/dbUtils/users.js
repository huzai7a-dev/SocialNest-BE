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
exports.searchUserByEmail = exports.createUser = void 0;
const config_1 = require("../../config");
const createUser = ({ email, full_name, password, profile_image_url }) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO users (email, full_name, password, profile_image_url) VALUES (?, ?, ?, ?)';
    const values = [email, full_name, password, profile_image_url];
    const [rows] = yield config_1.db.promise().query(query, values);
    return rows || null;
});
exports.createUser = createUser;
const searchUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM users WHERE email = ?";
    const [result] = yield config_1.db.promise().query(query, [email]);
    const row = result;
    return row[0] || null;
});
exports.searchUserByEmail = searchUserByEmail;
