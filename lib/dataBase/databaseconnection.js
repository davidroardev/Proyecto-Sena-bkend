"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
let pool;
if (process.env.PRODUCTION) {
    pool = new pg_1.Pool({
        connectionString: process.env.POSTGRES_URL,
    });
}
else {
    pool = new pg_1.Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(`${process.env.DB_PORT}`),
        idleTimeoutMillis: 3000
    });
}
exports.default = pool;
