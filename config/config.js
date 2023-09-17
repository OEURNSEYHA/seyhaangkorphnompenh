
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URLMONGO, {useUnifiedTopology: true, useNewUrlParser: true})
.then((result) => {
    console.log('connect successfully')
}).catch((err) => {
    console.log(err)
});