const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
