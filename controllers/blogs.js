const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blog = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if(!request.token || !decodedToken.id){
            return response.status(401).json({error: 'token missing or invalid'})
        }

        const user = await User.findById(decodedToken.id)
        
        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user._id
        })

        let savedBlog = await blog.save()
        await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        return response.status(201).json(savedBlog)
    } catch (exception) {
        if(exception.name === 'JsonWebTokenError'){
            response.status(401).json({error: exception.message})
        } else {
            response.status(400).send({ error: exception.message })
        }
    }
})

blogRouter.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error.message)
            response.status(400).send({ error: 'malformatted id' })
        })
})

blogRouter.delete('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if(!request.token || !decodedToken.id){
            return response.status(401).json({error: 'token missing or invalid'})
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)

        if ( blog.user === null || (blog.user.toString() === user._id.toString())) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).end()
        }
    } catch (exception) {
        if(exception.name === 'JsonWebTokenError'){
            response.status(401).json({error: exception.message})
        } else {
            response.status(400).send({error: 'malformatted id' })
        }
    }
})

blogRouter.put('/:id', async (request, response) => {
    const initialBlog = await Blog.findById(request.params.id)

    const body = request.body
    const blog = {
        author: body.author || initialBlog.author,
        title: body.title || initialBlog.title,
        url: body.url || initialBlog.url,
        likes: body.likes || initialBlog.likes,
        user: initialBlog.user
    }
    try {
        const updated = await Blog
            .findByIdAndUpdate(request.params.id, blog, { new: true })
            .populate('user', { username: 1, name: 1 })
        response.status(200).json(updated)
    } catch (error) {
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = blogRouter