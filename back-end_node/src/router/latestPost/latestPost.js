const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const latestPostQuery = `
        SELECT * FROM posts ORDER BY date_created DESC
        `;
    const latestPostResult = await pool.query(latestPostQuery);

    if (latestPostResult.rows.length === 0) {
      return res.status(400).json({ error: "Nenhum post encontrado" });
    }

    const latestPost = latestPostResult.rows;
    res.status(200).json(latestPost);
  } catch (error) {
    console.error("Erro ao obter o último post", error.message);
    res.status(400).json({ error: "Erro ao obter o post" });
  }
});

module.exports = router;
