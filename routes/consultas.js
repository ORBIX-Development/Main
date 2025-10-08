const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get('/', async (req, res) => {
  const select = 'SELECT * FROM consultas';
  try {
    const [results] = await bd.query(select);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (consulta)');
  }
});

app.get('/:id', async (req, res) => {
  const select = 'SELECT * FROM consultas WHERE id= ?';
  try {
    const [results] = await bd.query(select, [req.params.id]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (consulta)');
  }
});

app.get('/med/:id', async (req, res) => {
  const select = 'SELECT * FROM consultas WHERE id_medico= ?';
  try {
    const [results] = await bd.query(select, [req.params.id]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (consulta)');
  }
});

app.post('/insert', async (req, res) => {
  const insert =
    'INSERT INTO consultas (status_consulta,data_consulta,id_medico,id_cliente) VALUES (?,?,?,?)';
  const { status_consulta, data_consulta, id_medico, id_cliente } = req.body;
  try {
    const [results] = await bd.query(insert, [
      status_consulta,
      data_consulta,
      id_medico,
      id_cliente,
    ]);
    res.json('Consulta inserida!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao inserir dados na tabela (consulta)');
  }
});

app.put('/insert/:id', async (req, res) => {
  const update =
    'UPDATE consultas SET status_consulta = ?,data_consulta = ?, id_medico = ?, id_cliente = ? WHERE id =?';
  const { status_consulta, data_consulta, id_medico, id_cliente } = req.body;
  try {
    const [results] = await bd.query(update, [
      status_consulta,
      data_consulta,
      id_medico,
      id_cliente,
      req.params.id,
    ]);
    res.json('Consulta atualizada!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao atualizar dados da tabela (consulta)');
  }
});

app.put('/status/:id', async (req, res) => {
  const update =
    'UPDATE consultas SET status_consulta = ?,data_consulta = ? WHERE id =?';
  const { status_consulta, data_consulta } = req.body;
  try {
    const [results] = await bd.query(update, [
      status_consulta,
      data_consulta,
      req.params.id,
    ]);
    res.json('Consulta atualizada!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao atualizar dados da tabela (consulta)');
  }
});

app.delete('/del/:id', async (req, res) => {
  const del = 'DELETE FROM consultas WHERE id =?';
  try {
    const [results] = await bd.query(del, [req.params.id]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao deletar consulta');
  }
});

module.exports = app;
