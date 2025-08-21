const express = require("express");
const app = express();
const cors = require("cors");
const body = require("body-parser");
const doctorRoutes = require("./routes/doctor");
const costumerRoutes = require("./routes/costumer");


app.use(cors());
app.use(body.json());

app.use('/doctor', doctorRoutes);
app.use('/costumer', costumerRoutes);

app.listen(8080, function(){
    console.log("Servidor rodando na porta 8080!");
});