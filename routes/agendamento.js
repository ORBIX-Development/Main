const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get("/", async(req, res) => {
    const select = "SELECT * from agendamento";
    try{
    const [results]= await bd.query(select);
    res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (agendamento)!")};
});

app.get("/:id", async(req,res)=>{
    const select = "SELECT * from agendamento where id = ? ";
    try{
    const [results] = await bd.query(select, [req.params.id])
        res.send(results)
    }catch(err){   
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (agendamento)!")};
});


app.post("/insert", async(req, res) => {
    const insert = "INSERT INTO agendamento (data_dia,id_usuario) VALUES (?,?)";
    const {data_dia,id_usuario} = req.body;
    try{
        const results = await bd.query(insert, [data_dia,id_usuario]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao inserir dados na tabela (usuario)!")};
});

app.put("/insert/:id", async(req, res) => {
    const update = "UPDATE agendamento SET data_dia = ?, id_usuario = ? WHERE id=?";
    const {data_dia,id_usuario} = req.body;
    try{
    const [results] = await bd.query(update, [data_dia,id_usuario,req.params.id]);
    res.send(results)
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao inserir dados na tabela (usuario)!")};

});

app.delete("/del/:id", async(req,res)=>{

    const del = "DELETE FROM agendamento WHERE id = ?";
    try{
        const [results] = await bd.query(del, [req.params.id]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao deletar agendamento")};
    
});


module.exports = app;

