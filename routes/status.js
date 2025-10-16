const bd = require('../connection');
const express = require('express');
const app = express.Router();

app.get('/:status_consulta', async (req, res) => {
  const select = 'SELECT * FROM consultas WHERE status_consulta =?';
  const { status_consulta } = req.params;
  try {
    const [results] = await bd.query(select, [status_consulta]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(`Erro ao buscar consultas com o status: ${status_consulta}`);
  }
});

app.get('/date/:data_consulta', (req, res) => {
  const select = 'SELECT * FROM consultas WHERE data_consulta=?';
  const { data_consulta } = req.params;
  try {
    const [results] = bd.query(select, [data_consulta]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(`Erro ao buscar consultas com a data: ${data_consulta}`);
  }
});

module.exports = app;
