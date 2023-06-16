import mysql from "mysql2";

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_DATABASE,
    password: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306
})