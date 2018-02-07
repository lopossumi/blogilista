const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
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

blogRouter.delete('/:id', (request, response) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(result => {
            console.log(result)
            response.status(204).end()
        })
        .catch(error => {
            console.log(error.message)
            response.status(400).send({ error: 'malformatted id' })
        })
})

// notesRouter.put('/:id', (request, response) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important
//   }

//   Note
//     .findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(formatNote(updatedNote))
//     })
//     .catch(error => {
//       console.log(error)
//       response.status(400).send({ error: 'malformatted id' })
//     })
// })

module.exports = blogRouter