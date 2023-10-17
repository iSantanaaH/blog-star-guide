const express = require("express");
const router = express.Router();

/* Middleware */
const checkUserToken = require("../../config/middleware/verifyToken/verifytoken");

router.post("/checktoken", checkUserToken, async (req, res) => {
  res.status(200).json({ message: "Token válido" });
});
