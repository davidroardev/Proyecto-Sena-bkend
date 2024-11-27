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
exports.getUsers = exports.createUser = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const databaseconnection_1 = __importDefault(require("../dataBase/databaseconnection"));
require('dotenv').config();
const generateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    const query = yield databaseconnection_1.default.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [userName, password]);
    console.log(query);
    console.log(query.rows[0]);
    const user = query.rows[0];
    if (query.rowCount !== null && query.rowCount > 0) {
        const accessToken = jsonwebtoken_1.default.sign(user, `${process.env.CLAVE_JWT}`, { expiresIn: '1h' });
        return res.status(200).json({ accessToken });
    }
    else {
        return res.status(400).json('El Usuario o la contraseña son Incorrectas');
    }
});
exports.generateToken = generateToken;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, apellido, numeroTelefonico, direccion, correoElectronico } = req.body;
    if (userName !== null && password !== null && correoElectronico !== null && direccion !== null) {
        try {
            yield databaseconnection_1.default.query('INSERT INTO users (user_name,password,apellido,numero_telefonico,direccion,correo_electronico) values ($1, $2, $3, $4, $5, $6)', [userName, password, apellido, numeroTelefonico, direccion, correoElectronico]);
            return res.status(201).json({
                message: 'Se creo el Usuario satisfactoriamente',
                Producto: {
                    userName,
                    apellido,
                    numeroTelefonico,
                    direccion,
                    correoElectronico
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    }
    else {
        return res.status(500).json('Los datos: "Nombre de usuario, Contraseña, Email y Direccion " no pueden estar vacios');
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield databaseconnection_1.default.query('SELECT * FROM users');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsers = getUsers;
