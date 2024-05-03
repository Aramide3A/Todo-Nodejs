const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

const Users = mongoose.model('User', schema) 
module.exports= Users