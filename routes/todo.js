const express = require('express')
const router = express.Router()
const tasks = require('../models/todoModel')
const Joi = require('joi')
const authenticateToken = require('../middleware/auth')

function Validate(task){
    const schema = Joi.object({
        body: Joi.string().min(2).required()
    })

    return schema.validate(task)
}

router.get('/',authenticateToken, async(req, res)=>{
    const task = await tasks.find() 
    res.send(task)
})

router.post('/', authenticateToken, async(req, res)=>{
    const {error} = Validate(req.body)
    if (error){
        return res.send(error.details[0].message)
    }
    try {
        const task = await tasks.create({
            user : req.user.id,
            body : req.body.body,
        })
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:id',authenticateToken, async(req,res)=>{
    try {
        const id = req.params.id
        const task = await tasks.findById(id)
        if (!task) {
            return res.status(404).send('Task Not Found')
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:id',authenticateToken, async(req, res)=>{
    try {
        const id = req.params.id
        const task = await tasks.findByIdAndUpdate(id, req.body, {new: true})
        if (!task) {
            return res.status(404).send('Task Not Found')
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:id',authenticateToken, async(req, res)=>{
    try {
        const id = req.params.id
        const task = await tasks.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).send('Task Not Found')
        }
        res.send(`'${task.body}' successfully deleted`)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router