const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    adult: Boolean,
    passwordHash: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
    return {
        id: user._id,
        name: user.name,
        username: user.username,
        adult: user.adult,
        blogs: user.blogs
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User