const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    title: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    url: {
        type: String, 
        required: true
    },
    likes: {
        type: Number, 
        default: 0
    }
})

module.exports = Blog