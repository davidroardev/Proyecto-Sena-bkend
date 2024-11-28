import {Pool} from "pg";

require('dotenv').config();

let pool: Pool;



if (process.env.PRODUCTION){
    pool = new Pool({
        connectionString: process.env.POSTGRES_POSTGRES_URL,
    });
    
}else{
    pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(`${process.env.DB_PORT}`),
        idleTimeoutMillis: 3000
    });

}



export default pool;