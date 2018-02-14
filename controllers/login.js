const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        const user = await User
            .findOne({ username: body.username }, 'name username passwordHash')
        const passwordCorrect = (user === null || !body.password) ?
            false :
            await bcrypt.compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return response.status(401).send({ error: 'invalid username or password' })
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        response.status(200).send({
            token,
            username: user.username,
            name: user.name
        })
    } catch (exception) {
        return response.status(500).send(exception)
    }
})

module.exports = loginRouter