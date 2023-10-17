const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = process.env.JWT_SECRET;

/* Database */
const pool = require("../config/database/database");

router.post("", async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Usuário não tem permissão para criar um post" });
    }
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    const checkUserPermissionQuery =
      "SELECT user_permission_id FROM users WHERE id = $1";
    const permissionResult = await pool.query(checkUserPermissionQuery, [
      userId,
    ]);

    if (permissionResult.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const userPermissionId = permissionResult.rows[0].user_permission_id;

    if (userPermissionId !== 1) {
      return res
        .status(403)
        .json({ error: "Usuário não tem permissão para criar um post" });
    }

    let { titule, content } = req.body;

    const createNewPostQuery = `
        INSERT INTO posts(titule, content, user_id, date_created) VALUES ($1, $2, $3, NOW()) RETURNING titule, content, date_created
        `;

    const values = [titule, content, userId];
    const newPostResult = await pool.query(createNewPostQuery, values);

    if (newPostResult.rows.length === 0) {
      return res.status(400).json({ error: "Erro ao criar a postagem" });
    }

    const newPost = newPostResult.rows[0];
    res
      .status(200)
      .json({ mensagem: "Postagem criada com sucesso!", post: newPost });
  } catch (error) {
    console.error("Erro ao criar a postagem", error.message);
    res.status(400).json({ error: "Erro ao criar a postagem" });
  }
});

module.exports = router;
