function verifyToken(req, res) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

}