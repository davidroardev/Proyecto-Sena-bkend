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
exports.updateProducto = exports.deleteProducto = exports.createProducto = exports.getProductoById = exports.getProducto = void 0;
const databaseconnection_1 = __importDefault(require("../dataBase/databaseconnection"));
/**
 * Funcion que solicita todos los datos de una tabla
 * @param req
 * @param res
 * @returns todos los datos de una tabla
 */
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield databaseconnection_1.default.query('SELECT * FROM productos ORDER BY id;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getProducto = getProducto;
/**
 * Funcion que retorna un registro con un id especifico
 * @param req
 * @param res
 * @returns registro con id
 */
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield databaseconnection_1.default.query('SELECT * FROM productos WHERE id = $1;', [id]);
        if (response.rows.length === 0) {
            // ID inexistente
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        return res.json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getProductoById = getProductoById;
/**
 * Hace la solicitud para crear un registro en la tabla productos
 * @param req
 * @param res
 * @returns Respuesta para la solicitud del tipo post
 */
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, idProducto, tipoProducto, nombreproducto, tallaProducto, colorProducto, existenciasProducto, estadoProducto } = req.body;
    if (id !== null && idProducto !== null && tipoProducto !== null && nombreproducto !== null && estadoProducto !== null) {
        try {
            yield databaseconnection_1.default.query('INSERT INTO productos (id, id_producto, tipo_producto, nombre, talla,color, existencias, estado) values ($1, $2, $3, $4, $5, $6, $7, $8)', [id, idProducto, tipoProducto, nombreproducto, tallaProducto, colorProducto, existenciasProducto, estadoProducto]);
            return res.status(201).json({
                message: 'Se creo el producto satisfactoriamente',
                Producto: {
                    id,
                    idProducto,
                    tipoProducto,
                    nombreproducto,
                    tallaProducto,
                    colorProducto,
                    existenciasProducto,
                    estadoProducto
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    }
    else {
        return res.status(500).json('Los datos id, IdProducto, Tipo, Nombre o Estado no pueden estar vacios');
    }
});
exports.createProducto = createProducto;
/**
 * Solicita Actualizar un registro
 * @param req
 * @param res
 * @returns
 */
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield databaseconnection_1.default.query('DELETE FROM productos WHERE id = $1;', [id]);
        return res.status(200).json(`El producto con id: ${id} ha sido eliminado exitosamente`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.deleteProducto = deleteProducto;
/**
 * Funcion que actualiza un registro de la tabla
 * @param req
 * @param res
 * @returns Mensaje de error o exito de la funcion segun el caso
 */
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { idProducto, tipoProducto, nombreproducto, tallaProducto, colorProducto, existenciasProducto, estadoProducto } = req.body;
    try {
        yield databaseconnection_1.default.query('UPDATE productos SET id_producto = $1, tipo_producto =$2, nombre= $3, talla = $4,color =$5 , existencias=$6 , estado=$7 WHERE id = $8 ', [idProducto, tipoProducto, nombreproducto, tallaProducto, colorProducto, existenciasProducto, estadoProducto, id]);
        return res.json({
            message: `El registro del producto con id: ${id} ha sido actiualizado exitosamente`,
            Producto: {
                id,
                idProducto,
                tipoProducto,
                nombreproducto,
                tallaProducto,
                colorProducto,
                existenciasProducto,
                estadoProducto
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.updateProducto = updateProducto;
