const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get("/", async(req,res)=>{
    const select = "SELECT * FROM receitas";
    try{
        const [results] = await bd.query(select);
        res.send(results);
        
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (receitas)")};
});

app.get("/:id", async(req,res)=>{
    const select = "SELECT * FROM receitas WHERE id= ?";
    try{
        const [results]= await bd.query(select,[req.params.id]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao buscar dados da tabela (receitas)")};
});

app.post("/insert", async(req,res)=>{
    const insert= "INSERT INTO receitas (farmaco,dosagem,duracao,instrucao,id_medico,id_consulta) VALUES (?,?,?,?,?,?)";
    const {farmaco,dosagem,duracao,instrucao,id_medico,id_consulta} = req.body;
    try{
        const [results]= await bd.query(insert,[farmaco,dosagem,duracao,instrucao,id_medico,id_consulta]);
        res.json("Consulta inserida!");
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao inserir dados na tabela (receitas)")};
});

app.put("/insert/:id", async(req,res)=>{
    const update= "UPDATE receitas SET farmaco=?,dosagem=?,duracao=?,instrucao=? WHERE id =?";
    const {farmaco,dosagem,duracao,instrucao} = req.body;
    try{
        const [results] = await bd.query(update,[farmaco,dosagem,duracao,instrucao,req.params.id]);
        res.json("Consulta atualizada!");
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao atualizar dados da tabela (receitas)")};
});

app.delete("/del/:id", async(req,res)=>{
    const del= "DELETE FROM receitas WHERE id =?";
    try{
        const [results]= await bd.query(del,[req.params.id]);
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Erro ao deletar receita")};
       

});


module.exports = app;