const mysql = require("mysql2");
const senha = require("./senha");//Import para rodar com o node app. Caso for usar apena o docker, essa linha pode ser excluida
const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || senha(),
        database: process.env.DB_NAME || "obx",
    }
);

module.exports = connection;