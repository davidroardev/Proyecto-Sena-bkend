import { Router } from "express";
import { getProducto, getProductoById, createProducto, deleteProducto, updateProducto } from "../controllers/productos_controller";
import { authToken } from "../middleware/authorization";

export const productosRoutes = Router();

productosRoutes.get('/getproductos', getProducto);
productosRoutes.get('/getproductosbyid/:id', getProductoById);
productosRoutes.post('/createproductos', createProducto);
productosRoutes.delete('/deleteproducto/:id',  deleteProducto);
productosRoutes.put('/updateproducto/:id', updateProducto);