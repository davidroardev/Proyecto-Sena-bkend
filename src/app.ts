import express from "express";
import pool from "./dataBase/databaseconection";

require('dotenv').config();

const app =  express();
const port = process.env.PORT

app.get('/', async (req,res)=>{
    const query = 'select * from productos;'
    const response = await pool.query(query);
    console.log(response);
    res.send('Hola Mundo Soy david Roa')
});

app.listen(port, ()=>{
    return console.log(`App listening on port ${port}`)
});