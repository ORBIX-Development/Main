const mysql = require("mysql2/promise");
const connection = mysql.createPool(
    {
        host: process.env.DB_HOST  || "localhost",
        user: process.env.DB_USER || "root" ,
        password: process.env.DB_PASSWORD || "12345",
        database: process.env.DB_NAME || "obx",
    }
);

module.exports = connection; 