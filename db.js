import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const db = new Pool({

    host: `localhost` ,
    database:'shortly',
    user:'postgres',
    port:5432,
    password:'postgres'

});

export default db;


   