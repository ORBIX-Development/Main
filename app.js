const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const usuarioRoutes = require('./routes/usuario');
const atendimentoRoutes = require('./routes/atendimentos');
const agendamentoRoutes = require('./routes/agendamentos');
const consultaRoutes = require('./routes/consultas');
const statusRoutes = require('./routes/status');
const receitasRoutes = require('./routes/receitas');
require('dotenv/config');

const PORT = process.env.PORT;
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/usuarios', usuarioRoutes);
// app.use('/atendimentos', atendimentoRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/consultas', consultaRoutes);
app.use('/receitas', receitasRoutes);
app.use('/status', statusRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
 