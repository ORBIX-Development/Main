const mysql = require("mysql2")
const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "12345",
        database: process.env.DB_NAME || "obx",
    }
);

module.exports = connection;