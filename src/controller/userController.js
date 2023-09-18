const { isEmail, isStrongPassword } = require("validator");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION  } = process.env;
const createToken = (email, fullname) =>{
  return jwt.sign({ email, fullname}, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  })
}

const createRefreshToken = (email, fullname) => {
  return jwt.sign({email, fullname }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION
  })
}

const userController = {
  get: async (req, res) => {
    try {
      const users = await user.find();
      res.json(users);
    } catch (err) {
      res.json(err);
    }
  },

  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      if (!fullname || !email || !password) {
        throw Error("Please input filed");
      }
      if (!isEmail(email)) {
        throw Error("Email is not valid");
      }
      if (!isStrongPassword(password)) {
        throw Error("Password not Strong");
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const users = await user.create({
        fullname,
        email,
        password: hashPassword,
      });
      res.json(users);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = await user.findOne({ email });
      if (!users) return res.json({ message: "email invalid" });
      const Matchpassword = await bcrypt.compare(password, users.password);
      if (!Matchpassword) return res.json({ message: "password invalid" });
    // create token
      const token = createToken(user.email, user.fullname);
      const refreshToken = createRefreshToken(user.email, user.fullname);
  
      res.json({ token: token, refreshToken: refreshToken});
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

};

module.exports = userController;
