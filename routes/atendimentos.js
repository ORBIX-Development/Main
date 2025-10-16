const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get('/', async (req, res) => {
  const select = 'SELECT * FROM atendimentos';
  try {
    const [results] = await bd.query(select);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Erro ao buscar dados da tabela (atendimento)!`);
  }
});

app.get('/:id', async (req, res) => {
  const select = 'SELECT * FROM atendimentos WHERE id =?';
  try {
    const [results] = await bd.query(select, req.params.id);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (atendimento)!');
  }
});

app.post('/insert', async (req, res) => {
  const insert =
    'INSERT INTO atendimentos (nome,datachamado,status_atendimento,descricao,id_cliente) VALUES (?,?,?,?,?)';
  const { nome, datachamado, status_atendimento, descricao, id_cliente } =
    req.body;
  try {
    const [results] = await bd.query(insert, [
      nome,
      datachamado,
      status_atendimento,
      descricao,
      id_cliente,
    ]);
    res.json('Atendimento Inserido!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao inserir dados na tabela (atendimento)!');
  }
});

app.put('/insert/:id', async (req, res) => {
  const update =
    'UPDATE atendimentos SET nome = ?,datachamado = ?,status_atendimento = ? ,descricao = ?, id_cliente = ? WHERE id=?';
  const { nome, datachamado, status_atendimento, descricao, id_cliente } =
    req.body;
  try {
    bd.query(update, [
      nome,
      datachamado,
      status_atendimento,
      descricao,
      id_cliente,
      req.params.id,
    ]);
    res.json('Atendimento atualizado!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao atualizar dados da tabela (atendimento)!');
  }
});
app.put('/status/:id', async (req, res) => {
  const update = 'UPDATE atendimentos SET status_atendimento = ? WHERE id=?';
  const { status_atendimento } = req.body;
  try {
    bd.query(update, [status_atendimento, req.params.id]);
    res.json('Atendimento atualizado!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao atualizar dados da tabela (atendimento)!');
  }
});

app.delete('/del/:id', async (req, res) => {
  const del = 'DELETE FROM atendimentos where id = ? ';
  try {
    const [results] = await bd.query(del, [req.params.id]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao deletar atendimento!');
  }
});

module.exports = app;
