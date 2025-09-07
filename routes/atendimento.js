const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get("/", (req,res)=>{
    const select = "SELECT *FROM atendimento";
    bd.query(select,function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        };
    });
});

app.get("/:id", (req,res)=>{
    const select = "SELECT * FROM atendimento WHERE id =?";
    bd.query(select,req.params.id,function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        };
    });
});

app.post("/insert", (req,res)=>{
    const insert = "INSERT INTO atendimento SET nome = ?,datachamado = ?,status_atendimento = ? ,descricao = ?, id_cliente = ?"
    const body = req.body;
    bd.query(insert,[body.nome,body.datachamado,body.status_atendimento,body.descricao,body.id_cliente], function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        };
    });
     
});

app.put("/insert/:id", (req,res)=>{
    const update = "UPDATE atendimento SET nome = ?,datachamado = ?,status_atendimento = ? ,descricao = ?, id_cliente = ?";
    const body = req.body;
    bd.query(update,[body.nome,body.datachamado,body.status_atendimento,body.descricao,body.id_cliente, req.params.id] , function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        };
    });
});

app.delete("/del/:id", (req,res)=>{
    const insert = "DELETE FROM atendimento where id = ? ";
    bd.query(insert,[req.params.id],function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        };
    });
});


module.exports = app;