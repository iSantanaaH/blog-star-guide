/* Database */
const pool = require("../config/database/database");

/* Outra Importações */
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = process.env.JWT_SECRET;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("", upload.single("image"), async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Usuário não tem permissão para criar um post" });
    }

    if (req.file) {
      const imagePath = req.file.path;

      const saveImageQuery = `INSERT INTO images (name, image_path) VALUES ($1, $2) RETURNING id`;
      const imageValues = [req.file.filename, imagePath];
      const imageResult = await pool.query(saveImageQuery, imageValues);

      if (imageResult.rows.length === 0) {
        return res.status(400).json({ error: "Erro ao salvar a imamge" });
      }

      const imageId = imageResult.rows[0].id;

      const linkImagePostQuery = `INSERT INTO post_images_relation (post_id, image_id) VALUES ($1, $2)`;
      const linkValues = [newPost.id, imageId];
      await pool.query(linkImagePostQuery, linkValues);
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

    let { title, content, image } = req.body;

    if (!title || !content || !image) {
      return res.status(400).json({ error: "Por favor, preencha todos os campos obrigatórios" });
    }
    console.log(title);

    const createNewPostQuery = `
        INSERT INTO posts(title, content, user_id, date_created) VALUES ($1, $2, $3, NOW()) RETURNING title, content, date_created, user_id
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
