const db = require('./db/connection');
//  import express and mysql2
const express = require("express");
const apiRoutes = require('./routes/apiRoutes');
const e = require("express");
const inputCheck = require("./utils/inputCheck");

// server local
const PORT = process.env.PORT || 3001;
const app = express();

//  express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('api', apiRoutes);



// get all party info 
app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
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

// get a party by ID 
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
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

// delete a party by id
app.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted 
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found'
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

// handle user requests that are not supported (404 not found)
app.use((req, res) => {
    res.status(404).end();
});

//  start express.js on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = db;
