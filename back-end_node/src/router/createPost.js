/* Database */
const pool = require("../config/database/database");

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = process.env.JWT_SECRET;
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");

router.post("", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    const token = req.headers.authorization;

    const tempFilePath = image.destination + "/" + image.filename;

    const originalFileName = image.originalname;

    const targetDirectory = "uploads";

    const targetPath = `${targetDirectory}/${originalFileName}`;

    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.userId;

    const user_permission_id = decodedToken.user_permission_id;

    const checkUserPermissionQuery =
      "SELECT user_permission_id FROM users WHERE id = $1";

    const permissionResult = await pool.query(checkUserPermissionQuery, [
      userId,
    ]);

    if (!token || user_permission_id !== 1) {
      return res
        .status(403)
        .json({ error: "Usuário não tem permissão para criar um post" });
    }

    if (permissionResult.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    fs.rename(tempFilePath, targetPath, (err) => {
      if (err) {
        console.error("Erro ao salvar a imagem:", err);
        res.status(500).json({ error: "Erro ao salvar a imagem" });
      } else {
        console.log("A imagem foi salva com sucesso em:", targetPath);
      }
    });

    let { title, content } = req.body;

    const createNewPostQuery = `
        INSERT INTO posts(title, content, user_id, date_created) VALUES ($1, $2, $3, NOW()) RETURNING title, content, date_created
        `;

    const values = [title, content, userId];

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
