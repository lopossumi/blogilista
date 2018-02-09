const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.password.length<3){
            return response.status(400).send({error: 'Insufficient password length'})
        }
        if (await User.findOne({username:body.username})){
            return response.status(400).send({error: 'Username already taken'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            passwordHash
        })

        const savedUser = await user.save()
        return response.status(201).json(savedUser)

    } catch (error) {
        response.status(500).send({ error: error.message })
    }
})

userRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        return response.status(200).json(users.map(User.format))
    } catch (error) {
        response.status(500).send({ error: error.message })
    }
})

module.exports = userRouter