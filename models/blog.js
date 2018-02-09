const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
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
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog