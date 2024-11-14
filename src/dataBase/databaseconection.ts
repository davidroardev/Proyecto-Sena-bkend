import {Pool} from "pg";

require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(`${process.env.DB_PORT}`),
    idleTimeoutMillis: 3000
});

export default pool;