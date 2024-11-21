import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";

require('dotenv').config();

export const generateToken = (req:Request, res:Response): Response=>{
    const userName = req.body.userName;
    const user = {name: userName};
    const accessToken = jwt.sign(user, `${process.env.CLAVE_JWT}` , {expiresIn: '1h'});
    return res.status(200).json({accessToken});
};

