import { Router } from "express";
import { getTabla, getTablaById, createTabla, deleteTabla, updateTabla } from "../controllers/tabla_controller";

export const tablasRoutes = Router();


tablasRoutes.get('/gettabla', getTabla);
tablasRoutes.get('/gettablabyid/:id', getTablaById);
tablasRoutes.post('/createtabla', createTabla);
tablasRoutes.delete('/deletetabla/:id', deleteTabla);
tablasRoutes.put('/updatetabla/:id', updateTabla);