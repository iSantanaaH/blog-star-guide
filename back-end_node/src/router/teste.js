const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
    let mensagem = { mensagem: "Cheguei ao meu back-end" };
    res.status(200).json(mensagem);
});

module.exports = router;