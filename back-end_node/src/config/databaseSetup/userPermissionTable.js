const pool = require("../database/database");

const checkTableUserPermission = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'user_permission'
  )
`;

const createTableUserPermission = `
  CREATE TABLE IF NOT EXISTS "user_permission" (
    id SERIAL PRIMARY KEY
  )
`;

const checkIdsUserPermission = `
  SELECT id
  FROM user_permission
  WHERE id IN (1, 2)
`;

async function setupTableUserPermission() {
  const client = await pool.connect();
  try {
    const resultUserPermissionQuery = await client.query(
      checkTableUserPermission
    );

    const tableUserPermissionExists = resultUserPermissionQuery.rows[0].exists;

    if (!tableUserPermissionExists) {
      await client.query(createTableUserPermission);
    }

    const resultIdsUserPermission = await client.query(checkIdsUserPermission);

    if (resultIdsUserPermission.rows.length === 2) {
      return;
    } else {
      const createIdsUserPermission = `
        INSERT INTO user_permission (id) VALUES (1), (2)
      `;
      await client.query(createIdsUserPermission);
    }
  } catch (error) {
    console.error("Erro ao criar a tabela user_permission", error.message);
  } finally {
    client.release();
  }
}

module.exports = setupTableUserPermission;
