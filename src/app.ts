import express, { Router } from "express";
import pool from "./dataBase/databaseconnection";
import { createProducto, deleteProducto, getProducto, getProductoById, updateProducto } from "./controllers/productos_controller";
import { authToken, generateToken } from "./controllers/user_controller";

require('dotenv').config();

const app =  express();
const port = process.env.PORT

const productosRoutes = Router();
const userRoutes = Router();

productosRoutes.get('/getproductos', authToken, getProducto);
productosRoutes.get('/getproductosbyid/:id', authToken,getProductoById);
productosRoutes.post('/createproductos', authToken,createProducto);
productosRoutes.delete('/deleteproducto/:id', authToken, deleteProducto);
productosRoutes.put('/updateproducto/:id', authToken ,updateProducto);

userRoutes.post('/api/login', generateToken)


app.use(express.json())
app.use(productosRoutes);
app.use(userRoutes);
app.listen(port, ()=>{
    return console.log(`App listening on port ${port}`)
});