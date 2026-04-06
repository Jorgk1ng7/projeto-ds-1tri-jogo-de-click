// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // para receber JSON no body

app.get('/', (req, res) => {
  res.json({ message: 'Servidor rodando -- olá, backend!' });
});

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});