import express, { Router } from "express";
import { errorHandler } from "./middleware/error";
import { productosRoutes } from "./Routes/productos_routes";
import { tablasRoutes } from "./Routes/tabla_routes";
import { userRoutes } from "./Routes/user_routes";
import cors from "cors";

require('dotenv').config();

const app =  express();
const port = process.env.PORT


app.use(express.json());
app.use(errorHandler);
app.use(cors());


app.use(productosRoutes);
app.use(userRoutes);
app.use(tablasRoutes);

app.listen(port, ()=>{
    return console.log(`App listening on port ${port}`)
});

