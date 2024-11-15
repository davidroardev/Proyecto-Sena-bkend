import { QueryResult } from "pg";
import pool from "../dataBase/databaseconnection";
import { Request, Response } from "express";


export const getProducto = async (req: Request, res: Response): Promise<Response>=>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM productos;');
        return res.status(200).json(response.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error')
    }
};