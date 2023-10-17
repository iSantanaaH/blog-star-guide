const pool = require("../database/database");

const checkTablePostsQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'posts'
  )
`;

const checkTableUsersQuery = `
SELECT EXISTS (
  SELECT 1
  FROM information_schema.tables
  WHERE table_name = 'users'
)
`;

async function setupPostTable() {
  const client = await pool.connect();
  try {
    const resultPostsQuery = await client.query(checkTablePostsQuery);
    const resultUsersQuery = await client.query(checkTableUsersQuery);

    const tablePostsExists = resultPostsQuery.rows[0].exists;
    const tableUsersExists = resultUsersQuery.rows[0].exists;

    if (!tablePostsExists) {
      const createTablePostsQuery = `
      CREATE TABLE IF NOT EXISTS "posts" (
        id SERIAL PRIMARY KEY,
        titule TEXT NOT NULL,
        content TEXT NOT NULL,
        date_created TIMESTAMP,
        data_change TIMESTAMP,
        comments TEXT
      )
      `;
      await client.query(createTablePostsQuery);
    }

    if (tableUsersExists) {
      const createRelationUsersId = `
      ALTER TABLE posts ADD COLUMN user_id INT NOT NULL REFERENCES users(id);
      `;

      await client.query(createRelationUsersId);
    }
  } catch (error) {
    console.error("Erro ao criar a tabela Posts", error.message);
  } finally {
    client.release();
  }
}

module.exports = setupPostTable;
