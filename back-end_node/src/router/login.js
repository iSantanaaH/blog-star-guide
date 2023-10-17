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
      return res.status(401).json({ error: "O usuário não existe" });
    }

    const user = userResult.rows[0];
    const token = jwt.sign({ userId: user.id, enail: user.email }, secretKey);
    const userName = user.name + " " + user.surname;

    res.status(200).json({ token, userName });
  } catch (error) {
    console.error("Falha ao fazer login", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
