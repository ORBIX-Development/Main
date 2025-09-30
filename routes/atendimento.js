const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get("/", async(req,res)=>{
    const select = "SELECT *FROM atendimento";
    try{
        const [results]= bd.query(select);
        res.send(results)
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (atendimento)!")};
});

app.get("/:id", async(req,res)=>{
    const select = "SELECT * FROM atendimento WHERE id =?";
    try{
        const [results] = await bd.query(select,req.params.id)
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (atendimento)!")};
});

app.post("/insert", async(req,res)=>{
    const insert = "INSERT INTO atendimento (nome,datachamado,status_atendimento,id_cliente) VALUES (?,?,?,?)";
    const {nome,datachamado,status_atendimento,descricao,id_cliente} = req.body;
    try{
        const [results] = await bd.query(insert,[nome,datachamado,status_atendimento,descricao,id_cliente]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao inserir dados na tabela (atendimento)!")};
});

app.put("/insert/:id", async(req,res)=>{
    const update = "UPDATE atendimento SET nome = ?,datachamado = ?,status_atendimento = ? ,descricao = ?, id_cliente = ? WHERE id=?";
    const {nome,datachamado,status_atendimento,descricao,id_cliente} = req.body;
    try{
        bd.query(update,[nome,datachamado,status_atendimento,descricao,id_cliente, req.params.id]);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao atualizar dados da tabela (atendimento)!")};
});

app.delete("/del/:id", async(req,res)=>{
    const del = "DELETE FROM atendimento where id = ? ";
    try{
    const [results] = await bd.query(del,[req.params.id]);
    res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao deletar atendimento!")};
});


module.exports = app;