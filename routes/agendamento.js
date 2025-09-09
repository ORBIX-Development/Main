const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get("/", (req, res) => {
    const select = "SELECT * from agendamento";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", (req,res)=>{
    const select = "SELECT * from agendamento where id = ? ";
    bd.query(select, [req.params.id], function(err,results){
        if(err){
            console.log(err);
        }else{ 
            res.send(results);
        }
    });
});

app.post("/insert", (req, res) => {
    const insert = "INSERT INTO agendamento SET data_dia = ?, id_usuario = ?";
    const body = req.body;
    bd.query(insert, [body.data_dia,body.id_usuario], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Novo Agendamento Inserido ao BD!");
            res.send("Novo Agendamento Inserido ao BD!");
        }
    });
});

app.put("/insert/:id", (req, res) => {
    const update = "UPDATE agendamento SET data_dia = ?, id_usuario = ? WHERE id=?";
    const body = req.body;
    bd.query(update, [body.data_dia,body.id_usuario,req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Agendamento atualizado!");
            res.send(results);
        }
    });
});

app.delete("/del/:id", (req,res)=>{
    const del = "DELETE FROM agendamento WHERE id = ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Agendamento deletado!")
            res.send("Agendamento deletado!");
            
        }
    });
    
});


module.exports = app;

