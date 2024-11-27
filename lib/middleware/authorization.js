"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const authToken = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token de autorizacion no encontrado' });
    }
    jsonwebtoken_1.default.verify(token, `${process.env.CLAVE_JWT}`, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalido' });
        }
    });
    next();
};
exports.authToken = authToken;
