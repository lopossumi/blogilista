const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    try {
        await blog.save()
        return response.status(201).json(blog)
    } catch (error) {
        response.status(400).send({ error: error.message })
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
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogRouter.put('/:id', async (request, response)  => {
    const initialBlog = await Blog.findById(request.params.id)
    
    const body = request.body
    const blog = {
        author: body.author || initialBlog.author,
        title: body.title || initialBlog.title,
        url: body.url || initialBlog.url,
        likes: body.likes || initialBlog.likes
    }
    try{
        const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
        response.status(200).json(updated)
    }catch (error){
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = blogRouter