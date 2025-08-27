const bd = require('../conection');
const express = require('express');
const app = express.Router();

app.get("/", (req, res) => {
    const select = "SELECT * from doctor";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", (req,res)=>{
    const select = "SELECT * from doctor where id_medico = ? ";
    bd.query(select, [req.params.id], function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.post("/insert", (req, res) => {
    const insert = "INSERT INTO doctor SET licenca = ?, nome = ?";
    const body = req.body;
    bd.query(insert, [body.licenca,body.nome], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Novo Cliente Inserido ao BD!");
            res.send("Novo Cliente Inserido ao BD!");
            res.send(results);
        }
    });
});

app.put("/insert/:id", (req, res) => {
    const insert = "UPDATE doctor SET licenca = ?, nome = ? WHERE id_medico=?";
    const body = req.body;
    bd.query(insert, [body.licenca,body.nome,req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            console.log("Médico atualizado com sucesso!");
            res.send("Médico atualizado com sucesso!");
            res.send(results);
        }
    });
});

app.delete("/del/:id", (req,res)=>{
    const del = "DELETE FROM doctor WHERE id_medico = ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Doutor deletado!");
            
        }
    });
    
});


module.exports = app;

