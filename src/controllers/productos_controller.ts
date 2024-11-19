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
}


export