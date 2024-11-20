import express, { Router } from "express";
import pool from "./dataBase/databaseconnection";
import { createProducto, getProducto, getProductoById } from "./controllers/productos_controller";


require('dotenv').config();

const app =  express();
const port = process.env.PORT

const productosRoutes = Router();
app.use(express.json())


productosRoutes.get('/getproductos', getProducto);
productosRoutes.get('/getproductosbyid/:id', getProductoById);
productosRoutes.post('/createproductos', createProducto);


app.use(productosRoutes);
app.listen(port, ()=>{
    return console.log(`App listening on port ${port}`)
});