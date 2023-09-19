require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

app.get("/", async (req, res) => {
  let mensagem = { mensagem: 'Seja bem vindo' };
  res.json(mensagem);
});

app.listen(PORT, () => {
  console.log(
    `Servidor iniciado em localhost no dia ${Date()}`
  );
});
