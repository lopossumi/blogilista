const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const blogs = require('./test_data').blogs
const Blog = require('../models/blog')

beforeAll(async () => {
    await Blog.remove({})

    for (const blog of blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(6)
})

test('the first blog is about React Patterns', async () => {
    const response = await api
        .get('/api/blogs')

    expect(response.body[0].title).toBe('React patterns')
})

afterAll(() => {
    server.close()
})