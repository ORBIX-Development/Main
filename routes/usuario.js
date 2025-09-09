const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get("/", (req, res) => {
    const select = "SELECT * from usuario";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", (req,res)=>{
    const select = "SELECT * from usuario where id = ? ";
    bd.query(select, [req.params.id], function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.post("/insert", (req, res) => {
    const insert = "INSERT INTO usuario SET nome = ? ,email = ?, senha = ?,cargo = ?, cod_doc = ?";
    const body = req.body;
    bd.query(insert, [body.nome,body.email,body.senha,body.cargo,body.cod_doc], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Novo Usuário Inserido!");
            res.send("Novo Usuário Inserido!");
        }
    });
});

app.put("/insert/:id", (req, res) => {
    const update = "UPDATE usuario SET nome = ? ,email = ?, senha = ?, cod_doc = ? WHERE id=?";
    const body = req.body;
    bd.query(update, [body.nome,body.email,body.senha,body.cod_doc,req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Cliente atualizado!");
            res.send(results);
        }
    });
});

app.delete("/del/:id", (req,res)=>{
    const del = "DELETE FROM usuario WHERE id = ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Cliente Deletado!")
            res.send("Cliente Deletado!");
            
        }
    });
    
});


module.exports = app;
