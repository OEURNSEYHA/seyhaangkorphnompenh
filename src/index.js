const express = require('express')
const app = express();
const cors = require("cors")
app.use(cors());
app.use(express.json());

require('../config/config');
require('dotenv').config()

const userRoute = require('./route/userRoute')

app.use(userRoute);

app.listen(process.env.PORT, (err, res)=>{
    if(err){
        res.json({error: err})
    }
})
