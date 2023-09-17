const user = require('../model/user');


const userController = {
    get: async (req, res) =>{
        res.json({message: "hi"})
    },

    register : async (req, res)=> {

    }
} 

module.exports = userController;