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

const createTablePostsQuery = `
CREATE TABLE IF NOT EXISTS "posts" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date_created TIMESTAMP,
  date_change TIMESTAMP,
  comments TEXT,
  user_artistic_name VARCHAR(255) NOT NULL REFERENCES users(artistic_name)
)
`;

async function setupPostTable() {
  const client = await pool.connect();
  try {
    const resultPostsQuery = await client.query(checkTablePostsQuery);
    const resultUserQuery = await client.query(checkTableUsersQuery);

    const tablePostsExists = resultPostsQuery.rows[0].exists;
    const tableUserExists = resultUserQuery.rows[0].exists;

    if (tableUserExists) {
      if (!tablePostsExists) {
        await client.query(createTablePostsQuery);
      }
    }
  } catch (error) {
    console.error("Erro ao criar a tabela Posts", error.message);
  } finally {
    client.release();
  }
}

module.exports = setupPostTable;
