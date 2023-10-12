require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const secretKey = process.env.JWT_SECRET;

/* Router */
const routerRegister = require("./src/router/register/register");
const routerLogin = require("./src/router/login/login");
/* Database */
const pool = require("./src/config/database/database");

/* Middleware */
const authenticationMiddleware = require("./src/config/middleware/authenticationMiddleware");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

const checkTableUsersQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'users'
  )
`;

const checkTablePostsQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'posts'
  )
`;

const checkTableUserPermission = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'user_permission'
  )
`;

(async () => {
  const client = await pool.connect();
  try {
    const resultUserQuery = await client.query(checkTableUsersQuery);
    const resultPostsQuery = await client.query(checkTablePostsQuery);
    const resultUserPermissionQuery = await client.query(
      checkTableUserPermission
    );
    const tableUserExists = resultUserQuery.rows[0].exists;
    const tablePostsExists = resultPostsQuery.rows[0].exists;
    const tableUserPermission = resultUserPermissionQuery.rows[0].exists;

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
        user_permission_id INT
      )
    `;
      await client.query(createTableUserQuery);
    }

    if (!tablePostsExists) {
      const createTablePostsQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
      id SERIAL PRIMARY KEY,
      titule VARCHAR(255) NOT NULL,
      content VARCHAR(255) NOT NULL,
      date_created TIMESTAMP,
      data_change TIMESTAMP,
      comments VARCHAR(255),
      user_id INT NOT NULL
    )
    `;
      await client.query(createTablePostsQuery);
    }

    if (!tableUserPermission) {
      const createTableUserPermissionQuery = `
        CREATE TABLE IF NOT EXISTS "user_permission" (
          id SERIAL PRIMARY KEY
        )
      `;
      await client.query(createTableUserPermissionQuery);
    }
  } finally {
    client.release();
  }
})();

app.use("/register", routerRegister);
app.use("/login", routerLogin);

app.post("/createpost", authenticationMiddleware, async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Usuário não tem permissão para criar um post" });
    }
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    const checkUserPermissionQuery =
      "SELECT user_permission_id FROM users WHERE id = $1";
    const permissionResult = await pool.query(checkUserPermissionQuery, [
      userId,
    ]);

    if (permissionResult.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const userPermissionId = permissionResult.rows[0].user_permission_id;

    if (userPermissionId !== 1) {
      return res
        .status(403)
        .json({ error: "Usuário não tem permissão para criar um post" });
    }

    let { titule, content } = req.body;

    const createNewPostQuery = `
    INSERT INTO posts(titule, content, user_id, date_created) VALUES ($1, $2, $3, NOW()) RETURNING titule, content, date_created
    `;

    const values = [titule, content, userId];
    const newPostResult = await pool.query(createNewPostQuery, values);

    if (newPostResult.rows.length === 0) {
      return res.status(400).json({ error: "Erro ao criar a postagem" });
    }

    const newPost = newPostResult.rows[0];
    res
      .status(200)
      .json({ mensagem: "Postagem criada com sucesso!", post: newPost });
  } catch (error) {
    console.error("Erro ao criar a postagem", error.message);
    res.status(400).json({ error: "Erro ao criar a postagem" });
  }
});

app.get("/latestpost", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Servidor iniciado em localhost no dia ${Date()}`);
});
