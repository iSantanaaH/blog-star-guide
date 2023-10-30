const pool = require("../config/database/database");

const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const resultPostsQuery = `
        SELECT * FROM posts WHERE id = $1
        `;
    const { rows } = await pool.query(resultPostsQuery, [postId]);

    const getImagePathQuery = `
    SELECT images.image_path FROM images INNER JOIN post_images_relation ON images.id = post_images_relation.image_id WHERE post_images_relation.post_id = $1
    `;
    const imagePathResult = await pool.query(getImagePathQuery, [postId]);
    const imagePath = imagePathResult.rows[0].image_path;
    console.log(`O path da imagem é: ${imagePath}`);

    if (rows.length === 1) {
      return res.status(200).json({ rows: rows[0], imagePath: imagePath });
    } else {
      return res.status(400).json({ error: "Post não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar o post:", error.message);
    return res.status(404).json({ error: "Erro ao buscar o post" });
  }
});

module.exports = router;
