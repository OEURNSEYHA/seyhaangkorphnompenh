const userController = require('../controller/userController')

 const router = require('express').Router()


router.get('/users' , userController.get)

router.get('/another-route' , (req , res)=>{
    // router code here
})

module.exports  = router