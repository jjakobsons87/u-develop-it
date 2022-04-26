const mysql = require("mysql2");
require("dotenv").config({ path: "./.env" });

// connect to the database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: [],
        database: "election",
    },
    console.log("Connected to the election database")
);

module.exports = db;