const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = process.env.JWT_SECRET;

/* Database */
const pool = require("../config/database/database");

router.post("", async (req, res) => {
  try {
    let { email, password } = req.body;

    const userQuery = `SELECT * FROM users WHERE email = $1 AND password = $2`;
    const userResult = await pool.query(userQuery, [email, password]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const user = userResult.rows[0];
    const fullNameUser = user.name + " " + user.surname;
    const user_artistic_name = user.artistic_name;
    const token = jwt.sign({ userId: user.id, email: user.email, user_permission_id: user.user_permission_id, name: user.name, fullName: fullNameUser, artisticName: user_artistic_name }, secretKey);

    res.status(200).json({ token, fullNameUser, user_artistic_name });
  } catch (error) {
    console.error("Falha ao fazer login", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
