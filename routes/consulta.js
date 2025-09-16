const bd = require('../connection');
const express = require('express');
const app = express.Router();


app.get("/", (req,res)=>{
    const select = "SELECT * FROM consulta";
    bd.query(select, function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", (req,res)=>{
    const select = "SELECT * FROM consulta WHERE id= ?";
    bd.query(select,[req.params.id], function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.post("/insert",(req,res)=>{
    const insert= "INSERT INTO consulta SET status_consulta = ?,data_consulta = ?, id_medico = ?, id_cliente = ?";
    const body = req.body;
    bd.query(insert,[body.status_consulta,body.data_consulta,body.id_medico,body.id_cliente],function(err,results){
        if(err){
            console.log(err);
        }else{
            console.log("Consulta Registrada!")
            res.send("Consulta Registrada!");
        }
    });

});

app.put("/insert/:id",(req,res)=>{
    const update= "UPDATE consulta SET status_consulta = ?,data_consulta = ?, id_medico = ?, id_cliente = ? WHERE id =?";
    const body = req.body;
    bd.query(update,[body.status_consulta,body.data_consulta,body.id_medico,body.id_cliente,req.params.id],function(err,results){
        if(err){
            console.log(err);
        }else{
            console.log("Consulta Atualizada!")
            res.send(results);
        }
    });

});

app.delete("/del/:id",(req,res)=>{
    const del= "DELETE FROM consulta WHERE id =?";
    bd.query(del,[req.params.id],function(err,results){
        if(err){
            console.log(err);
        }else{
            console.log("Consulta Deletada!")
            res.send("Consulta Deletada!");
        }
    });

});


module.exports = app;