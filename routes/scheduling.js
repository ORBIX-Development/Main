const bd = require("../conection");
const express = require("express");
const app = express.Router();

app.get("/", (req,res)=>{
    const select = "SELECT *FROM scheduling";
    bd.query(select,function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        };
    });
});

module.exports = app;