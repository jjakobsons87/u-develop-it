const express = require("express");
const db = require("./db/connection");
const apiRoutes = require('./routes/apiRoutes');

// server local
const PORT = process.env.PORT || 3001;
const app = express();

//  express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use apiRoutes
app.use('/api', apiRoutes);

// handle user requests that are not supported (404 not found)
app.use((req, res) => {
    res.status(404).end();
});

//  start express.js on port 3001
// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

module.exports = db;
