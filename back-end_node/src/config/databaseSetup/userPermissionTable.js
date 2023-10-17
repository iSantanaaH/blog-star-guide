const pool = require("../database/database");

const checkTableUserPermission = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'user_permission'
  )
`;

async function setupTableUserPermission() {
  const client = await pool.connect();
  try {
    const resultUserPermissionQuery = await client.query(
      checkTableUserPermission
    );
    const tableUserPermission = resultUserPermissionQuery.rows[0].exists;

    if (!tableUserPermission) {
      const createTableUserPermissionQuery = `
                CREATE TABLE IF NOT EXISTS "user_permission" (
                  id SERIAL PRIMARY KEY
                )
              `;
      await client.query(createTableUserPermissionQuery);
    }
  } catch (error) {
    console.error("Erro ao criar a tabela user_permission");
  } finally {
    client.release();
  }
}

module.exports = setupTableUserPermission;
