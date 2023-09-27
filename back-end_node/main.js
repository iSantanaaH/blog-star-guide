require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "15784267309",
  database: "blogstarguidedb",
  port: 5433,
  max: 1,
});

const checkTableUsersQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'users'
  )
`;

(async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(checkTableUsersQuery);
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      const createTableUserQuery = `
      CREATE TABLE IF NOT EXISTS "users" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        birthday TIMESTAMP NOT NULL,
        user_permission_id INT
      )
    `;
      await client.query(createTableUserQuery);
    }
  } finally {
    client.release();
  }
})();

app.post("/register", async (req, res) => {
  try {
    let { name, surname, email, phone, password, birthday } = req.body;

    const checkUserEmailQuery = "SELECT * FROM users WHERE email = $1";
    const checkUserEmailResult = await pool.query(checkUserEmailQuery, [email]);

    if (checkUserEmailResult.rows.length > 0) {
      return res.status(400).json({ error: "Este email já está cadastrado." });
    }

    const insertUserQuery = `
    INSERT INTO users (name, surname, email, phone, password, birthday) VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [name, surname, email, phone, password, birthday];

    await pool.query(insertUserQuery, values);

    res.status(200).json({ mensagem: "Usuario cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    res.status(400).json({ error: "Erro ao cadastrar usuário" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const values = {email: email, password: password};

    res.status(200).json(values);
    console.log(values);
  } catch (error) {
    console.error("Falha ao receber os dados", error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado em localhost no dia ${Date()}`);
});
