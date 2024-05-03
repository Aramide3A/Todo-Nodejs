const express = require('express')
const app = express()
const mongoose = require('mongoose')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/authRoute')
const authenticateToken = require('./middleware/auth')
const User = require('./models/userModel')

app.use(express.json())
app.get('/', (req, res)=>{
    routes = {
        '/me' : {
            'method' : 'get',
            'function' : 'get current user information',
        },
        'auth/register' : {
            'method' : 'post',
            'function' : "register new users ",
        },
        'auth/login' :  {
            'method' : 'post',
            'function' : 'login new users' ,
            'note' : 'note that both login and register send a jwt token so you should save that on the frontend for authentication and delete it when logging out ',
        },
        'api/task' : {
            'method' : 'get',
            'function' : "get all tasks ",
        },
        'api/task' : {
            'method' : 'post',
            'function' : "create new task ",
        },
        'api/task/id' : {
            'method' : 'put',
            'function' : "update a particular task ",
        },
        'api/task/id' : {
            'method' : 'delete',
            'function' : "delete a particular task ",
        },
    }
})
app.get('/me', authenticateToken, async(req, res)=>{
    const user = await User.findById(req.user.id).select('-password')
    res.send(user)
})
app.use('/api/task', todoRouter )
app.use('/auth', userRouter )

app.listen(3000, ()=>{console.log('server running...')})

mongoose.connect('mongodb+srv://admin:admin@todoapp.rjn86t0.mongodb.net/')
    .then(console.log('Database connection successful'))
    .catch(console.log('Database connection failed'))