const express = require("express");
const router = express.Router();

/* Database */
const pool = require("../config/database/database");

function removeSpecialCharacters(value) {
  return value.replace(/\D/g, "");
}

router.post("", async (req, res) => {
  try {
    let { name, surname, email, password, phone, birthday } = req.body;

    const formData = req.body;
    const birthdayValue = new Date(formData.birthday);
    const currentDate = new Date();
    const minAge = 5;
    const age = currentDate.getFullYear() - birthdayValue.getFullYear();

    if (age < minAge) {
      res.status(400).json({
        error: "Você deve ter pelo menos 5 anos de idade para criar uma conta",
      });
    }

    phone = removeSpecialCharacters(phone);

    const checkUserEmailQuery = `SELECT * FROM users WHERE email = $1`;
    const checkUserEmailResult = await pool.query(checkUserEmailQuery, [email]);
    const checkUserNameQuery = `SELECT * FROM users WHERE name = $1 AND surname = $2`;
    const checkUserNameQueryResult = await pool.query(checkUserNameQuery, [name, surname]);

    if (checkUserEmailResult.rows.length > 0) {
      return res.status(400).json({ error: "Este email já está cadastrado" });
    }

    if (checkUserNameQueryResult.rows.length > 0) {
      return res.status(409).json({
        error: `O nome de usuário fornecido já está em uso. Escolha outro nome de usuário e tente novamente`,
      });
    }

    const insertUserQuery = `
        INSERT INTO users (name, surname, artistic_name, email, password, phone, birthday, user_permission_id) VALUES ($1, $2, $3, $4, $5, $6, $7, 2);
        `;

    const fullArtisticNameUser = name + " " + surname;
    const values = [
      name,
      surname,
      fullArtisticNameUser,
      email,
      password,
      phone,
      birthday,
    ];
    await pool.query(insertUserQuery, values);

    res.status(200).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar usuário", error.message);
    res.status(404).json({ error: "Erro ao cadastrar o usuário" });
  }
});

module.exports = router;
