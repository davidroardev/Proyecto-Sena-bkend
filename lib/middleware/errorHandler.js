"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res) => {
    console.error(`Error ${error.message}`);
    return res.status(500).json({ message: 'Error en el servidor' });
};
exports.errorHandler = errorHandler;