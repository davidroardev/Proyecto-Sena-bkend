import { Router } from "express";
import { getProducto, getProductoById, createProducto, deleteProducto, updateProducto } from "../controllers/productos_controller";
import { authToken } from "../middleware/authorization";

export const productosRoutes = Router();

productosRoutes.get('/getproductos', authToken, getProducto);
productosRoutes.get('/getproductosbyid/:id', authToken,getProductoById);
productosRoutes.post('/createproductos', authToken,createProducto);
productosRoutes.delete('/deleteproducto/:id', authToken, deleteProducto);
productosRoutes.put('/updateproducto/:id', authToken ,updateProducto);