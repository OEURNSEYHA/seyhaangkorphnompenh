
const { isEmail, isStrongPassword } = require("validator");
const user = require("../model/user");

const userController = {
  get: async (req, res) => {
   try{
    const users = await user.find();
    res.json(users)
   }catch(err){
    res.json(err)
   }
  },

  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
        if(!fullname || !email || !password){
            throw new Error("Please input filed")
        }

       if(!isEmail(email)){
        throw Error("Email is not valid")
       }
       if(!isStrongPassword(password)){
        throw Error("Password not Strong")
       }

      const users = await user.create({ fullname, email, password });
      res.json(users);
    } catch (err) {
      res.json({error: err.message});
    }
  },
};

module.exports = userController;
