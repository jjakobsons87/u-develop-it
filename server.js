//  import express and mysql2
const mysql = require('mysql2');
// const dotenv = require('dotenv');
const express = require('express');

// server local 
const PORT = process.env.PORT ||3001;
const app = express();

//  express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to the database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: '',
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database')
);

// GET a single candidate 
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row)
// });

//  pull list of candidates from DB 
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// delete a candidate 
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// Create a candidate 
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// })

// handle user requests that are not supported (404 not found)
app.use((req,res) => {
    res.status(404).end();
});

//  start express.js on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});