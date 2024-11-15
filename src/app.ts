import express, { Router } from "express";
import pool from "./dataBase/databaseconnection";
import { getProducto } from "./controllers/productos_controller";


require('dotenv').config();

const app =  express();
const port = process.env.PORT

const productosRoutes = Router();

productosRoutes.get('/getproductos', getProducto)

app.get('/', async (req,res)=>{
    const query = 'select * from productos;'
    const response = await pool.query(query);
    console.log(response);
    res.send('Hola Mundo Soy david Roa')
});

app.use(productosRoutes);

app.listen(port, ()=>{
    return console.log(`App listening on port ${port}`)
});