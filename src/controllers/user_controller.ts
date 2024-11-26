import { json, query, Request,response,Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../dataBase/databaseconnection";
import { QueryResult } from "pg";


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


export const createUser = async(req: Request, res:Response): Promise<Response> =>{
    const {userName, password,apellido, numeroTelefonico,direccion, correoElectronico}= req.body;

    if (userName !== null && password !==null && correoElectronico !== null && direccion !== null ){
        try {
            await pool.query ('INSERT INTO users (user_name,password,apellido,numero_telefonico,direccion,correo_electronico) values ($1, $2, $3, $4, $5, $6)',
                [userName,password,apellido,numeroTelefonico,direccion,correoElectronico]
            );
            return res.status(201).json({
                message:'Se creo el Usuario satisfactoriamente',
                Producto:{
                    userName,
                    apellido,
                    numeroTelefonico,
                    direccion,
                    correoElectronico
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else{
        
        return res.status(500).json('Los datos: "Nombre de usuario, Contraseña, Email y Direccion " no pueden estar vacios');
    }
};

export const getUsers = async(req:Request,res:Response): Promise<Response>=>{

    try {
        const response: QueryResult = await pool.query('SELECT * FROM users');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }

};