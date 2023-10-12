const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Você não tem permissão para acessar essa tela" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    const checkUserPermissionQuery = `
    SELECT user_permission_id FROM users WHERE id = $1
    `;
    const permissionResult = await 
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

module.exports = authenticateUser;
