const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get('/', async (req, res) => {
  const select = 'SELECT * from agendamentos';
  try {
    const [results] = await bd.query(select);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (agendamento)!');
  }
});

app.get('/:id', async (req, res) => {
  const select = 'SELECT * from agendamentos where id = ? ';
  try {
    const [results] = await bd.query(select, [req.params.id]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (agendamento)!');
  }
});

app.post('/insert', async (req, res) => {
  const insert = 'INSERT INTO agendamentos (data_dia,id_cliente,descricao) VALUES (?,?,?)';
  const { data_dia, id_cliente,descricao } = req.body;
  try {
    const results = await bd.query(insert, [data_dia, id_cliente,descricao]);
    res.send(results);
    res.json('Agendamento solicitado!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao inserir dados na tabela (usuario)!');
  }
});

app.put('/insert/:id', async (req, res) => {
  const update =
    'UPDATE agendamentos SET data_dia = ?, id_usuario = ? WHERE id=?';
  const { data_dia, id_usuario } = req.body;
  try {
    const [results] = await bd.query(update, [
      data_dia,
      id_usuario,
      req.params.id,
    ]);
    res.send(results);
    res.json('Agendamento Atualizado!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao inserir dados na tabela (usuario)!');
  }
});

app.delete('/del/:id', async (req, res) => {
  const del = 'DELETE FROM agendamentos WHERE id = ?';
  try {
    const [results] = await bd.query(del, [req.params.id]);
    res.json('Agendamento Cancelado!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao deletar agendamento');
  }
});

module.exports = app;
