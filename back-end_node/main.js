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
  try {
    const result = await pool.query("SELECT NOW() as current_time");
    const current_time = result.rows[0].current_time;
    res.json({ mensagem: "Boa noite", current_time });
  } catch (error) {
    console.error("Erro ao se conectar ao banco de dados:", error);
    res.status(400).json({ error: "Erro ao se conectar ao banco de dados" });
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor iniciado em localhost no dia ${Date()} na porta ${PORT}`
  );
});
