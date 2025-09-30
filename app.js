const express = require("express");
const cors = require("cors");
const cookieParser= require('cookie-parser');

const usuarioRoutes = require("./routes/usuario");
const atendimentoRoutes = require("./routes/atendimento");
const agendamentoRoutes = require("./routes/agendamento");
const consultaRoutes = require("./routes/consulta");
const statusRoutes = require("./routes/status");

const port = process.env.SERVER_PORT || 3000;
const app = express();


app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/usuario', usuarioRoutes);
app.use('/atendimento', atendimentoRoutes);
app.use('/agendamento',agendamentoRoutes);
app.use('/consulta',consultaRoutes);
app.use('/status',statusRoutes);

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}!`);
});