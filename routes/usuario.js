const bd = require('../connection');
const express = require('express');
const bcrypt = require('bcrypt')
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

app.post("/insert", async (req, res) => {
    try{ 
        const body = req.body;
        const hashPassword = await bcrypt.hash(body.senha, 10);
        const insert = "INSERT INTO usuario SET nome = ? ,email = ?, senha = ?,cargo = ?, cod_doc = ?";

        bd.query(insert, [body.nome,body.email,hashPassword,body.cargo,body.cod_doc],
             function(err, results){
        if(err){
            console.log(err);
            res.status(500).send("Erro ao inserir usuário");
        }else{
            console.log("Novo Usuário Inserido!");
            res.send("Novo Usuário Inserido!");
        }
    });
       } catch (err){
        console.error(err);
        res.status(500).send("Erro ao processar a requisição");
    }
});

app.put("/insert/:id", async (req, res) => {
    try{
        const body = req.body;
        let hashPassword = null;
        if(body.senha) {
            hashPassword = await bcrypt.hash(body.senha, 10);
        }
        const update = "UPDATE usuario SET nome = ? ,email = ?, senha = ?,cargo = ?, cod_doc = ? WHERE id=?";
        bd.query(update, [body.nome,body.email,hashPassword,body.cargo,body.cod_doc,req.params.id], function(err, results){
        if(err){
            console.log(err);
            res.status(500).send("Erro ao atualizar usuário")
        }else{
            console.log("Usuário atualizado!");
            res.send(results);
        }
    });
    }catch (err){
        console.error(err);
        res.status(500).send("Erro ao processar a requisição");
    }
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
