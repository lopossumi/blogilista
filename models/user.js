const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    adult: Boolean,
    passwordHash: String,
})

userSchema.statics.format = (user) => {
    return {
        id: user._id,
        name: user.name,
        username: user.username,
        adult: user.adult
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User