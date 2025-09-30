const bd = require('../connection');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express.Router();

app.get("/", async(req, res) => {
    const select = "SELECT * from usuario";
    try{
        const [results] = await bd.query(select);
        res.send(results);
        
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (usuario)!");
    }
});


app.get("/:id", async (req,res)=>{
    const select = "SELECT * from usuario where id = ? ";
    try{
        const [results] =  await bd.query(select, [req.params.id]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (usuario)!")
    }
    await bd.query(select, [req.params.id], function(err,results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.post("/register", async (req, res) => { 
    const insert = "INSERT INTO usuario (nome,email,senha,cargo,cod_doc) VALUES (?,?,?,?,?)";
    const {nome,email,senha,cargo,cod_doc} = req.body;
    const hash = await bcrypt.hash(senha, 10);

    await bd.query(insert, [nome,email,hash,cargo,cod_doc]);
    res.json({message:"Usuário Registrado Com Sucesso!"})
});

app.post("/login", async (req, res) => { 
    const {email,senha} = req.body;
    const [rows] = await bd.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({erros:"Usuário não encontrado"});

    const user = rows[0];
    const valid = await bcrypt.compare(senha, user.senha);
    if(!valid) return res.status(401).json({erros:"Senha Incorreta"});

    const token = jwt.sign({id: user.id,email: user.email,}, process.env.JWT_SECRET,{expiresIn:"1h"});
    res.json({token})

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

app.delete("/del/:id", async(req,res)=>{
    const del = "DELETE FROM usuario WHERE id = ?";
    try{
        bd.query(del, [req.params.id]);
        res.send(results);
    }catch{ 
        console.log(err);
        res.status(500).send("Erro ao deletar usuario")
    }
    
});


module.exports = app;
