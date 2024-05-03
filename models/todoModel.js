const mongoose = require('mongoose')
const Users = require('./userModel')


const schema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Users,
        required : true,
    },
    body : {
        type : String,
        required : true,
    },
    time : {
        type : Date,
        default: Date.now()
    }
})

const tasks = mongoose.model('Task', schema) 
module.exports= tasks