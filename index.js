const express = require('express')
const app = express()
const mongoose = require('mongoose')
const todoRouter = require('./routes/todo')

app.use(express.json())
app.use('/api/task', todoRouter )

app.listen(3000, ()=>{console.log('server running...')})

mongoose.connect('mongodb://localhost:27017/Todo')
    .then(console.log('Database connection successful'))
    .catch(console.log('Database connection failed'))