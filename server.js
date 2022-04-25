//  import express 
const express = require('express');

// server local 
const PORT = process.env.PORT ||3001;
const app = express();

//  express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// handle user requests that are not supported (404 not found)
app.use((req,res) => {
    res.status(404).end();
});

//  start express.js on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});