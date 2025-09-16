const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get("/:status_consulta", (req, res)=>{
    const select = "SELECT * FROM consulta WHERE status_consulta =?";
    const status_consulta = req.params.status_consulta;
    bd.query(select, [status_consulta], function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.get("/date/:data_consulta", (req,res)=>{
    const select = "SELECT * FROM consulta WHERE data_consulta=?";
    const data_consulta = req.params.data_consulta;
    bd.query(select,[data_consulta], function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});


module.exports = app;