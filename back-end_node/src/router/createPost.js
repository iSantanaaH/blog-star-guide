/* Database */
const pool = require("../config/database/database");

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = process.env.JWT_SECRET;
const multer = require("multer");
const permanentUploadDirectory = "uploads";
const upload = multer({ dest: permanentUploadDirectory });
const fs = require("fs");

router.post("", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    const token = req.headers.authorization;

    const tempFilePath = image.path;

    const originalFileName = image.originalname;

    const targetPath = `${permanentUploadDirectory}/${originalFileName}`;
    const image_name = originalFileName;
    const image_path = targetPath;

    const insertImageQuery = `
      INSERT INTO images (name, image_path) VALUES ($1, $2) RETURNING id
    `;
    const imageValues = [image_name, image_path];
    const imageInsertResult = await pool.query(insertImageQuery, imageValues);
    const imageId = imageInsertResult.rows[0].id;

    if (imageInsertResult.rows.length === 0) {
      return res.status(400).json({ error: "Erro ao inserir a imagem" });
    } else {
    }

    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.userId;
    const userArtisticName = decodedToken.artisticName;
    console.log(userArtisticName);

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
        INSERT INTO posts(title, content, user_artistic_name, date_created) VALUES ($1, $2, $3, NOW()) RETURNING title, content, date_created, id
        `;

    const values = [title, content, userArtisticName];

    const newPostResult = await pool.query(createNewPostQuery, values);
    const postId = newPostResult.rows[0].id;

    if (newPostResult.rows.length === 0) {
      return res.status(400).json({ error: "Erro ao criar a postagem" });
    }

    const newPost = newPostResult.rows[0];

    const insertPostsRelationsQuery = `
    INSERT INTO post_images_relation (post_id, image_id) VALUES ($1, $2)
    `;

    const valuesPostImagesRelation = [postId, imageId];
    const newRelation = await pool.query(
      insertPostsRelationsQuery,
      valuesPostImagesRelation
    );

    const resultRelation = newRelation.rows[0];
    res
      .status(200)
      .json({ mensagem: "Postagem criada com sucesso!", post: newPost, relation: resultRelation });
  } catch (error) {
    console.error("Erro ao criar a postagem", error.message);
    res.status(400).json({ error: "Erro ao criar a postagem" });
  }
});

module.exports = router;
