const pool = require("../../database/database");

const checkTablePostsQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'posts'
  )
`;

async function setupPostTable() {
  const client = await pool.connect();
  try {
    const resultPostsQuery = await client.query(checkTablePostsQuery);

    const tablePostsExists = resultPostsQuery.rows[0].exists;

    if (!tablePostsExists) {
      const createTablePostsQuery = `
      CREATE TABLE IF NOT EXISTS "posts" (
        id SERIAL PRIMARY KEY,
        titule TEXT NOT NULL,
        content TEXT NOT NULL,
        date_created TIMESTAMP,
        data_change TIMESTAMP,
        comments TEXT,
        user_id INT NOT NULL
      )
      `;
      await client.query(createTablePostsQuery);
    }
  } catch (error) {
    console.error("Erro ao criar a tabela Posts");
  } finally {
    client.release();
  }
}

module.exports = setupPostTable;
