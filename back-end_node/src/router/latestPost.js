const express = require("express");
const router = express.Router();

/* Database */
const pool = require("../config/database/database");

router.get("", async (req, res) => {
  try {
    const latestPostQuery = `
    SELECT posts.*, images.image_path
    FROM posts
    LEFT JOIN post_images_relation ON posts.id = post_images_relation.post_id
    LEFT JOIN images ON post_images_relation.image_id = images.id
    ORDER BY posts.date_created DESC
  `;

    const latestPostResult = await pool.query(latestPostQuery);

    if (latestPostResult.rows.length === 0) {
      return res.status(400).json({ error: "Nenhum post encontrado" });
    }

    const latestPost = latestPostResult.rows;
    res.status(200).json(latestPost);
  } catch (error) {
    console.error("Erro ao obter o último post", error.message);
    res.status(500).json({ error: "Erro ao obter o último post" });
  }
});

module.exports = router;
