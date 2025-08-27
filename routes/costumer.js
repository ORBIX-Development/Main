const bd = require('../conection');
const express = require('express');
const app = express.Router();

app.get("/", (req, res) => {
    const select = "SELECT * from costumer";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", (req,res)=>{
    const select = "SELECT * from costumer where id_cliente = ? ";
    bd.query(select, [req.params.id], function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.post("/insert", (req, res) => {
    const insert = "INSERT INTO costumer SET CPF_CNPJ = ?, nome = ?";
    const body = req.body;
    bd.query(insert, [body.CPF_CNPJ,body.nome], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Novo Cliente Inserido ao BD!");
            res.send(results);
        }
    });
});

app.put("/insert/:id", (req, res) => {
    const insert = "UPDATE costumer SET CPF_CNPJ = ?, nome = ? WHERE id_cliente=?";
    const body = req.body;
    bd.query(insert, [body.CPF_CNPJ,body.nome,req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Cliente atualizado com sucesso!");
            res.send("Cliente atualizado com sucesso!");
            res.send(results);
        }
    });
});

app.delete("/del/:id", (req,res)=>{
    const del = "DELETE FROM costumer WHERE id_cliente = ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Cliente deletado!");
            
        }
    });
    
});


module.exports = app;
