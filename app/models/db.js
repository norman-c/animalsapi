const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database

let pool = mysql.createPool({
    connectionLimit: 10,
    host: "us-cdbr-east-02.cleardb.com",
    user: "b64404cf689cb3",
    password: "c57933b1",
    database: "heroku_248f2bc82734799"
});

// const connection = mysql.createConnection({

//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

// let pool = mysql.createPool({
//     connectionLimit: 10,
//     host: "us-cdbr-east-02.cleardb.com",
//     user: "b64404cf689cb3",
//     password: "c57933b1",
//     database: "heroku_248f2bc82734799"
// });

// open the MySQL connection
// connection.connect(error => {
//     if (error) throw error;
//     console.log("Successfully connected to the database.");
// });

module.exports = pool;