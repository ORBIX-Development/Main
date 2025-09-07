const express = require("express");
const app = express();
const cors = require("cors");
const body = require("body-parser");
const usuarioRoutes = require("./routes/usuario");
const atendimentoRoutes = require("./routes/atendimento");
const agendamentoRoutes = require("./routes/agendamento");
const consultaRoutes = require("./routes/consulta");


app.use(cors());
app.use(body.json());

app.use('/usuario', usuarioRoutes);
app.use('/atendimento', atendimentoRoutes);
app.use('/agendamento',agendamentoRoutes);
app.use('/consulta',consultaRoutes);

app.listen(8080, function(){
    console.log("Servidor rodando na porta 8080!");
});