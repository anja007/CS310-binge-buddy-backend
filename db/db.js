const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("Connected to MySQL database");
        connection.release();
    }
});

module.exports = pool;
