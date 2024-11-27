"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = require("./middleware/error");
const productos_routes_1 = require("./Routes/productos_routes");
const tabla_routes_1 = require("./Routes/tabla_routes");
const user_routes_1 = require("./Routes/user_routes");
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(error_1.errorHandler);
app.use((0, cors_1.default)());
app.use(productos_routes_1.productosRoutes);
app.use(user_routes_1.userRoutes);
app.use(tabla_routes_1.tablasRoutes);
app.listen(port, () => {
    return console.log(`App listening on port ${port}`);
});
