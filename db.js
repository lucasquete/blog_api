import mysql from "mysql2";

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_DATABASE,
    password: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
    multipleStatements: true
})