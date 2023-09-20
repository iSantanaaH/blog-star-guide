require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000'}));

const pool = new Pool({
  connectionString: DATABASE_URL,
});

app.post("/register", async (req, res) => {
  try {
    let { name, surname, email, phone, password, repeatPassword } = req.body;
    
    const createTableUserQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;

    const insertUserQuery = `
    INSERT INTO users (name, surname, email, phone, password) VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(createTableUserQuery);

    const values = [name, surname, email, phone, password];
    await pool.query(insertUserQuery, values);

    res.status(200).json({ mensagem: 'Usuario cadastrado com sucesso!'});
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(400).json({ mensagem: 'Erro ao cadastrar usuário'});
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado em localhost no dia ${Date()}`);
});
