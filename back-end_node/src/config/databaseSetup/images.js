const pool = require("../database/database");

const checkTableImagesQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'images'
  )
`;

async function setupImagesTable() {
  const client = await pool.connect();
  try {
    const resultImagesQuery = await client.query(checkTableImagesQuery);

    const tableImagesExists = resultImagesQuery.rows[0].exists;

    if (!tableImagesExists) {
      const createTableImages = `
      CREATE TABLE IF NOT EXISTS "images" (
          id SERIAL PRIMATY KEY,
          name VARCHAR(255) NOT NULL,
          image_path TEXT NOT NULL
      )
      `;
      await client.query(createTableImages);
    }
  } catch (error) {
    console.error(`Erro ao criar a tabela Images: ${error.message}`);
  }
}

module.exports = setupImagesTable;