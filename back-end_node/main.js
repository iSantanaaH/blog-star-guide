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

/* Setup Database */
const userTableSetup = require("./src/config/databaseSetup/userTable/userTableSetup");
const postsTableSetup = require("./src/config/databaseSetup/postsTable/postTable");

/* Middleware */
const authenticationMiddleware = require("./src/config/middleware/authentication/authenticationMiddleware");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

const checkTableUserPermission = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'user_permission'
  )
`;

(async () => {
  await userTableSetup();
  await postsTableSetup();
})();

// (async () => {
//   const client = await pool.connect();
//   try {
//     const resultUserPermissionQuery = await client.query(
//       checkTableUserPermission
//     );
//     const tableUserPermission = resultUserPermissionQuery.rows[0].exists;

//     if (!tableUserPermission) {
//       const createTableUserPermissionQuery = `
//         CREATE TABLE IF NOT EXISTS "user_permission" (
//           id SERIAL PRIMARY KEY
//         )
//       `;
//       await client.query(createTableUserPermissionQuery);
//     }
//   } finally {
//     client.release();
//   }
// })();

app.use("/register", routerRegister);
app.use("/login", routerLogin);
app.use("/latestpost", routerLatestPost);
app.use("/createpost", routerCreatePost);

app.listen(PORT, () => {
  console.log(`Servidor iniciado em localhost no dia ${Date()}`);
});
