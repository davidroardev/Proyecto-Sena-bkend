import express, { Router } from "express";
import pool from "./dataBase/databaseconnection";
import { getProducto, getProductoById } from "./controllers/productos_controller";


require('dotenv').config();

const app =  express();
const port = process.env.PORT

const productosRoutes = Router();

productosRoutes.get('/getproductos', getProducto)
productosRoutes.get('/getproductosbyid/:id', getProductoById)


app.use(productosRoutes);

app.listen(port, ()=>{
    return console.log(`App listening on port ${port}`)
});