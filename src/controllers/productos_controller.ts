import { QueryResult } from "pg";
import pool from "../dataBase/databaseconnection";
import { Request, Response } from "express";


export const getProducto = async (req: Request, res: Response): Promise<Response>=>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM productos;');
        return res.status(200).json(response.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

export const getProductoById = async (req: Request, res: Response): Promise<Response>=>{
    
    const id = parseInt(req.params.id);

    try {
        const response: QueryResult= await pool.query('SELECT * FROM productos WHERE id = $1;', [id]);

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


export const createProducto = async (req: Request, res: Response): Promise<Response> =>{
    const {id,idProducto,tipoProducto,nombreproducto,tallaProducto,colorProducto, existenciasProducto,estadoProducto}=req.body;

    if (id !== null && idProducto !==null && tipoProducto !== null && nombreproducto !== null && estadoProducto !==null ){
        try {
            await pool.query ('INSERT INTO productos (id, id_producto, tipo_producto, nombre, talla,color, existencias, estado) values ($1, $2, $3, $4, $5, $6, $7, $8)',
                [id,idProducto,tipoProducto,nombreproducto,tallaProducto,colorProducto,existenciasProducto,estadoProducto]
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