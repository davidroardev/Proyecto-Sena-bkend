import express, { Router } from "express";
import { createProducto, deleteProducto, getProducto, getProductoById, updateProducto } from "./controllers/productos_controller";
import { generateToken } from "./controllers/user_controller";
import { authToken } from "./middleware/authorization";
import { errorHandler } from "./middleware/errorHandler";

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


app.use(express.json());
app.use(errorHandler);
app.use(productosRoutes);
app.use(userRoutes);
app.listen(port, ()=>{
    return console.log(`App listening on port ${port}`)
});