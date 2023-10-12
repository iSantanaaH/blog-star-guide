require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

/* Router */
const routerRegister = require("./src/router/register/register");
const routerLogin = require("./src/router/login/login");
const routerLatestPost = require("./src/router/latestPost/latestPost");
const routerCreatePost = require("./src/router/createPost/createPost");

/* Database */
const pool = require("./src/config/database/database");

/* Middleware */
const authenticationMiddleware = require("./src/config/middleware/authentication/authenticationMiddleware");

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
app.use("/latestpost", routerLatestPost);
app.use("/createpost", routerCreatePost);

app.listen(PORT, () => {
  console.log(`Servidor iniciado em localhost no dia ${Date()}`);
});