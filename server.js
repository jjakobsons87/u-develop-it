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

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// handle user requests that are not supported (404 not found)
app.use((req,res) => {
    res.status(404).end();
});

//  start express.js on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});