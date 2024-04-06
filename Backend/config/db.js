import express from 'express';
import mysql from 'mysql2';
const app = express();
app.use(express.json());
const database = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'nkmkb', // MySQL password
    database: 'userscheema' // MySQL database name
});

// Test the MySQL connection
database.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection
});
export default database;