const pool = require("../database/database");

const checkTablePostsQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'posts'
  )
`;

const checkTableImagesQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'images'
  )
`;

const checkTablePostImagesRelations = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'post_images_relation'
  )
`;

async function setupPostsImagesRelations() {
  const client = await pool.connect();
  try {
    const resultPostsQuery = await client.query(checkTablePostsQuery);
    const resultImagesQuery = await client.query(checkTableImagesQuery);
    const resultPostImagesRelationsQuery = await client.query(
      checkTablePostImagesRelations
    );

    const tableImagesExists = resultImagesQuery.rows[0].exists;
    const tablePostsExists = resultPostsQuery.rows[0].exists;
    const tablePostImagesRelations =
      resultPostImagesRelationsQuery.rows[0].exists;

    if (tableImagesExists && tablePostsExists) {
      if (!tablePostImagesRelations) {
        const createTablePostsImagesRelations = `
          CREATE TABLE IF NOT EXISTS "post_images_relation" (
              post_id INT NOT NULL REFERENCES posts(id),
              image_id INT NOT NULL REFERENCES images(id)
          );
          `;
        await client.query(createTablePostsImagesRelations);
      }
    }
  } catch (error) {
    console.error(
      `Erro ao criar a tabela PostImagesRelations: ${error.message}`
    );
  } finally {
    client.release();
  }
}

module.exports = setupPostsImagesRelations;
