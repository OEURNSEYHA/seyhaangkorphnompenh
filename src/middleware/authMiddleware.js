const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const User = require("../model/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {

    const { _id, email, password } = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById({ _id }).select("_id");
    req.user = await User.findOne({ email }).select("_id");
    req.user = await User.findOne({ password }).select("_id");
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

// const { _id } = jwt.verify(token, JWT_SECRET);
// req.user = await user.findOne({_id}).select('_id')
