import { Router } from "express";
import { generateToken } from "../controllers/user_controller";

export const userRoutes = Router();


userRoutes.post('/api/login', generateToken)
