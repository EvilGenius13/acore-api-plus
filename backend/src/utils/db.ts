import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
// Note: The DB container can handle a maximum of 155 connections at a time
// 5 connections in the pool seems reasonable for each DB

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