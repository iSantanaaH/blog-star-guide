require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

/* Router */
const routerRegister = require("./src/router/register");
const routerLogin = require("./src/router/login");
const routerLatestPost = require("./src/router/latestPost");
const routerCreatePost = require("./src/router/createPost");
const routerPostsPage = require("./src/router/posts");

/* Setup Database */
const userTableSetup = require("./src/config/databaseSetup/userTableSetup");
const postsTableSetup = require("./src/config/databaseSetup/postTable");
const userPermission = require("./src/config/databaseSetup/userPermissionTable");
const setupTableImages = require("./src/config/databaseSetup/images");
const setupTablePostImagesRelations = require("./src/config/databaseSetup/post_images_relation");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

(async () => {
  await userPermission();
  await userTableSetup();
  await postsTableSetup();
  await setupTableImages();
  await setupTablePostImagesRelations();
})();

app.use("/register", routerRegister);
app.use("/login", routerLogin);
app.use("/latestpost", routerLatestPost);
app.use("/createpost", routerCreatePost);
app.use("/posts/:id", routerPostsPage);

app.listen(PORT, () => {
  console.log(`Servidor iniciado em localhost no dia ${Date()}`);
});
