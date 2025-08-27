const mysql = require("mysql2")
const conection = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"12345",
        database:"obx",
    }
);

module.exports = conection;