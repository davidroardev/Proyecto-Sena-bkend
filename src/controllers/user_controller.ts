import { query, Request,response,Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../dataBase/databaseconnection";

require('dotenv').config();

export const generateToken = async (req:Request, res:Response): Promise<Response>=>{
    const userName = req.body.userName;
    const password = req.body.password
    const query = await pool.query('SELECT * FROM users WHERE user_name = $1 AND password = $2',[userName,password]);
    console.log(query);
    console.log(query.rows[0]);
    const user = query.rows[0];
    if (query.rowCount !== null && query.rowCount > 0 ){
        const accessToken = jwt.sign(user, `${process.env.CLAVE_JWT}` , {expiresIn: '1h'});
        return res.status(200).json({accessToken});
    } else{
        return res.status(400).json('El Usuario o la contraseña son Incorrectas');
    }
};

