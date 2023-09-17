const jwt = require("jsonwebtoken");

require("dotenv").config();
const { JWT_SECRET } = process.env;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    const { email } = decode;
    console.log({email})
    req.user = { email };
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

