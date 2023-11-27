require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3333;
const path = require("path");

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
const routerTest = require("./src/router/teste");

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "45.166.71.133:31025",
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

(async () => {
  await userPermission();
  await userTableSetup();
  await postsTableSetup();
  await setupTableImages();
  await setupTablePostImagesRelations();
})();

app.use("/api/register", routerRegister);
app.use("/api/login", routerLogin);
app.use("/api/latestpost", routerLatestPost);
app.use("/api/createpost", routerCreatePost);
app.use("/api/posts", routerPostsPage);
app.use("/api/testrouter", routerTest);

app.listen(PORT, () => {
  console.log(`Servidor iniciado em localhost no dia ${Date()}`);
});
