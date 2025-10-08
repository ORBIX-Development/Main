const bd = require('../connection');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express.Router();

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token ausente' });

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET,
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}

app.get('/', async (req, res) => {
  const select = 'SELECT id, nome, email, cod_doc, cargo, img FROM usuarios';
  try {
    const [results] = await bd.query(select);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (usuarios)!');
  }
});

app.get('/:id', async (req, res) => {
  const select =
    'SELECT nome, email, cod_doc, cargo FROM usuarios WHERE id = ? ';
  try {
    const [results] = await bd.query(select, [req.params.id]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (usuarios)!');
  }
});
app.get('/search/:nome', async (req, res) => {
  try {
    const select = 'SELECT nome FROM usuarios WHERE nome= ?';
    const [results] = await bd.query(select, req.params.nome);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (usuarios)!');
  }
});
app.get('/med', async (req, res) => {
  const select =
    'SELECT nome, email, cod_doc, cargo FROM usuarios WHERE cargo = MEDICO';
  try {
    const [results] = await bd.query(select, [req.params.id]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (usuarios)!');
  }
});
app.get('/cargo', async (req, res) => {
  const select =
    'SELECT nome, email, cod_doc, cargo FROM usuarios WHERE cargo =  ';
  const { cargo } = req.body;
  try {
    const [results] = await bd.query(select, [cargo]);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao buscar dados da tabela (usuarios)!');
  }
});

app.post('/register', async (req, res) => {
  const { nome, email, senha, cod_doc } = req.body;
  const insert =
    'INSERT INTO usuarios (nome,email,senha,cod_doc) VALUES (?,?,?,?)';
  const select = 'SELECT id FROM usuarios WHERE email=?';
  try {
    if (!nome || !email || !senha || !cod_doc)
      return res.status(400).json({ message: 'Campos obigatórios faltando!' });

    const [exists] = await bd.query(select, [email]);
    if (exists.length > 0)
      return res.status(400).json({ message: 'Email já cadastrado' });

    const hash = await bcrypt.hash(senha, 10);

    await bd.query(insert, [nome, email, hash, cod_doc]);

    res.json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

app.post('/adm/insert', async (req, res) => {
  const insert =
    'INSERT INTO usuarios (nome,email,senha,cod_doc,cargo) VALUES (?,?,?,?,?)';
  const { nome, email, senha, cod_doc } = req.body;
  try {
    await bd.query(insert, [nome, email, senha, cod_doc, 'ADMIN']);
    res.json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao registrar Admin');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [rows] = await bd.query('SELECT * FROM usuarios WHERE email = ?', [
      email,
    ]);

    if (rows.length === 0)
      return res.status(401).json({ erros: 'Usuário não encontrado' });

    const user = rows[0];
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ erros: 'Senha Incorreta' });

    const token = jwt.sign(
      { id: user.id, email: user.email, cargo: user.cargo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        cargo: user.cargo,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro Interno no login');
  }
});

app.put('/insert/cargo/:id', async (req, res) => {
  try {
    const { nome, email, cargo, cod_doc } = req.body;

    const update = await 'UPDATE usuarios SET cargo = ? WHERE id = ?';
    bd.query(update, [cargo, req.params.id]);
    res.json('Usuário Atualizado!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao processar a requisição');
  }
});

app.delete('/del/:id', async (req, res) => {
  const del = 'DELETE FROM usuarios WHERE id = ?';
  try {
    const [results] = await bd.query(del, [req.params.id]);
    res.send(results);
    res.json('Usuário deletado!');
  } catch {
    console.log(err);
    res.status(500).send('Erro ao deletar usuario');
  }
});

module.exports = app;
