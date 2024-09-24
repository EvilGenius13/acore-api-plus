import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
// TODO: Need to find out max connections we should set for the pools

const charactersPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'acore_characters',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export default charactersPool;