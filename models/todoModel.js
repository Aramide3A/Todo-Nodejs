const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : {
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