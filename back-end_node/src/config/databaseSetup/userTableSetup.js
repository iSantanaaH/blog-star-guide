const pool = require("../database/database");

const checkTableUsersQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'users'
  )
`;

async function setupUserTable() {
  const client = await pool.connect();
  try {
    const resultUserQuery = await client.query(checkTableUsersQuery);

    const tableUserExists = resultUserQuery.rows[0].exists;

    if (!tableUserExists) {
      const createTableUserQuery = `
        CREATE TABLE IF NOT EXISTS "users" (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          surname VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          password VARCHAR(255) NOT NULL,
          birthday TIMESTAMP NOT NULL,
          user_permission_id INT NOT NULL REFERENCES user_permission(id)
        )
      `;
      await client.query(createTableUserQuery);
    }
  } catch (error) {
    console.error("Erro ao criar tabela de usuários", error.message);
  } finally {
    client.release();
  }
}

module.exports = setupUserTable;
