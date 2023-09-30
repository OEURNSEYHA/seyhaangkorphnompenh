const { isEmail, isStrongPassword } = require("validator");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { JWT_SECRET, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } =
  process.env;
const createToken = (_id, email, password) => {
  return jwt.sign({ _id, email, password }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

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

      if (!users) {
        return res.status(401).json({ message: "Email invalid" });
      }
      const isPasswordValid = await bcrypt.compare(password, users.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password invalid" });
      }
  
      // Assuming you have a function 'createToken' to generate the access token
      const token = createToken(users._id, users.email, users.password);
  
      // Calculate the expiration time (e.g., 1 hour from now)
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 1); // Adjust the expiration as needed
  
      // Set an HttpOnly access token cookie with the correct expiration time
      res.cookie("accessToken", token, {
        expires: expirationTime,
        httpOnly: true,
        secure: true, // Make sure to set this for HTTPS
        sameSite: "Strict", // Recommended for added security
      });
  
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message }); // Change status to 500 for internal server error
    }
  },

 
  
}
module.exports = userController;
