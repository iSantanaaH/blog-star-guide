require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    let mensagem = {mensagem: 'Boa noite'};
    res.json(mensagem);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado em localhost no dia ${Date()} na porta ${PORT}`);
});