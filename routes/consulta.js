const bd = require('../connection');
const express = require('express');
const app = express.Router();


app.get("/", async(req,res)=>{
    const select = "SELECT * FROM consulta";
    try{
        const [results] = await bd.query(select);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (consulta)")};
});

app.get("/:id", async(req,res)=>{
    const select = "SELECT * FROM consulta WHERE id= ?";
    try{
        const [results]= await bd.query(select,[req.params.id]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (consulta)")};
});

app.post("/insert", async(req,res)=>{
    const insert= "INSERT INTO consulta (status_consulta,data_consulta,id_medico,id_medico) VALUES (?,?,?,?)";
    const {status_consulta,data_consulta,id_medico,id_cliente} = req.body;
    try{
        const [results]= await bd.query(insert,[status_consulta,data_consulta,id_medico,id_cliente]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao inserir dados na tabela (consulta)")};
});

app.put("/insert/:id", async(req,res)=>{
    const update= "UPDATE consulta SET status_consulta = ?,data_consulta = ?, id_medico = ?, id_cliente = ? WHERE id =?";
    const {status_consulta,data_consulta,id_medico,id_cliente} = req.body;
    try{
        const [results] = await bd.query(update,[status_consulta,data_consulta,id_medico,id_cliente,req.params.id])
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao atualizar dados da tabela (consulta)")};
});

app.delete("/del/:id", async(req,res)=>{
    const del= "DELETE FROM consulta WHERE id =?";
    try{
        const [results]= await bd.query(del,[req.params.id]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao deletar consulta")};
       

});


module.exports = app;