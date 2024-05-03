const express = require('express')
const app = express()
const mongoose = require('mongoose')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/authRoute')
const authenticateToken = require('./middleware/auth')
const User = require('./models/userModel')

app.use(express.json())
app.get(('/me'), authenticateToken, async(req, res)=>{
    const user = User.findById(req.user.id).select('-password')
    res.send(user)
})
app.use('/api/task', todoRouter )
app.use('/auth', userRouter )

app.listen(3000, ()=>{console.log('server running...')})

mongoose.connect('mongodb+srv://admin:admin@todoapp.rjn86t0.mongodb.net/')
    .then(console.log('Database connection successful'))
    .catch(console.log('Database connection failed'))