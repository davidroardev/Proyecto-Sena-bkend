import { QueryResult } from "pg";
import pool from "../dataBase/databaseconnection";
import { Request, response, Response } from "express";



/**
 * Funcion que solicita todos los datos de una tabla
 * @param req 
 * @param res 
 * @returns todos los datos de una tabla
 */
export const getTabla = async (req: Request, res: Response): Promise<Response>=>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM productos;'); //cambiar el codigo sql segun el caso de la tabla 
        return res.status(200).json(response.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Funcion que retorna un registro con un id especifico
 * @param req 
 * @param res 
 * @returns registro con id 
 */
export const getTablaById = async (req: Request, res: Response): Promise<Response>=>{
    
    const id = parseInt(req.params.id);

    try {
        const response: QueryResult= await pool.query('SELECT * FROM productos WHERE id = $1;', [id]); //cambiar el codigo sql segun el caso de la tabla 

        if (response.rows.length === 0) {
            // ID inexistente
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        return res.json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Hace la solicitud para crear un registro en la tabla productos 
 * @param req 
 * @param res 
 * @returns Respuesta para la solicitud del tipo post
 */

export const createTabla = async (req: Request, res: Response): Promise<Response> =>{
    const {id,idProducto,tipoProducto,nombreproducto,tallaProducto,colorProducto, existenciasProducto,estadoProducto}=req.body; // Añadir o quitar, poner las columnas de la tabla en la cual se busca hacer la insercion

    if (id !== null && idProducto !==null && tipoProducto !== null && nombreproducto !== null && estadoProducto !==null ){
        try {
            await pool.query ('INSERT INTO productos (id, id_producto, tipo_producto, nombre, talla,color, existencias, estado) values ($1, $2, $3, $4, $5, $6, $7, $8)',
                [id,idProducto,tipoProducto,nombreproducto,tallaProducto,colorProducto,existenciasProducto,estadoProducto] // cambiar la consulta de acuerdo a la tabla 
            );
            return res.status(201).json({
                message:'Se creo el producto satisfactoriamente',
                Producto:{
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
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else{
        
        return res.status(500).json('Los datos id, IdProducto, Tipo, Nombre o Estado no pueden estar vacios');
    }
};

/**
 * Solicita Actualizar un registro
 * @param req 
 * @param res 
 * @returns 
 */

export const deleteTabla  = async (req:Request,res:Response): Promise<Response> =>{
    const id = parseInt(req.params.id);

    try {
            await pool.query('DELETE FROM productos WHERE id = $1;', [id] );
            return res.status(200).json(`El producto con id: ${id} ha sido eliminado exitosamente`)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }

};

/**
 * Funcion que actualiza un registro de la tabla
 * @param req 
 * @param res 
 * @returns Mensaje de error o exito de la funcion segun el caso
 */
export const updateTabla = async (req: Request, res:Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const {idProducto,tipoProducto,nombreproducto,tallaProducto,colorProducto, existenciasProducto,estadoProducto}=req.body;

    try {
        await pool.query('UPDATE productos SET id_producto = $1, tipo_producto =$2, nombre= $3, talla = $4,color =$5 , existencias=$6 , estado=$7 WHERE id = $8 ',
            [idProducto,tipoProducto,nombreproducto,tallaProducto,colorProducto,existenciasProducto,estadoProducto,id]
        );
        return res.json({
            message: `El registro del producto con id: ${id} ha sido actiualizado exitosamente`,
            Producto:{
                id,
                idProducto,
                tipoProducto,
                nombreproducto,
                tallaProducto,
                colorProducto,
                existenciasProducto,
                estadoProducto
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }


};