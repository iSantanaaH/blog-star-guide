const express = require("express");
const router = express.Router();

/* Database */
const pool = require("../../config/database/database");

router.post("", async (req, res) => {
  try {
    let { name, surname, email, password, phone, birthday } = req.body;

    const checkUserEmailQuery = `SELECT * FROM users WHERE email = $1`;
    const checkUserEmailResult = await pool.query(checkUserEmailQuery, [email]);

    if (checkUserEmailResult.rows.length > 0) {
      return res.status(400).json({ error: "Este email já está cadastrado" });
    }

    const insertUserQuery = `
        INSERT INTO users (name, surname, email, password, phone, birthday) VALUES ($1, $2, $3, $4, $5, $6);
        `;

    const values = [name, surname, email, password, phone, birthday];
    await pool.query(insertUserQuery, values);

    res.status(200).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar usuário", error.message);
    res.status(400).json({ erro: "Erro ao cadastrar o usuário" });
  }
});

module.exports = router;
