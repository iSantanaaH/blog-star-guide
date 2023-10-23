const pool = require("../config/database/database");

const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
  const postId = req.params.id;

  try {
    const resultPostsQuery = `
        SELECT * FROM posts WHERE id = $1
        `;
    const { rows } = await pool.query(resultPostsQuery, [postId]);

    if (rows.length === 1) {
      return res.status(200).json({ rows: rows[0] });
    } else {
      return res.status(400).json({ error: "Post não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar o post:", error.message);
    return res.status(500).json({ error: "Erro ao buscar o post" });
  }
});

module.exports = router;
