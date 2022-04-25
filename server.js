//  import express and mysql2
const express = require("express");
const mysql = require('mysql2');
const e = require('express');
const inputCheck = require('./utils/inputCheck');
const dotenv = require('dotenv');

dotenv.config();

// server local 
const PORT = process.env.PORT ||3001;
const app = express();

//  express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to the database 
const db = mysql.createConnection(
    {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    },
    console.log('Connected to the election database')
);

//  pull list of candidates from DB 
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single candidate 
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
        res.status(400).json({ error: err.message });
        return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// delete a candidate 
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a candidate 
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(
        body, 
        'first_name', 
        'last_name', 
        'industry_connected'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// handle user requests that are not supported (404 not found)
app.use((req,res) => {
    res.status(404).end();
});

//  start express.js on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});