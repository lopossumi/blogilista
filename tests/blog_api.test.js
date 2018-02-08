const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const testBlogs = require('./test_data').blogs
const Blog = require('../models/blog')

beforeAll(async () => {
    await Blog.remove({})

    for (const blog of testBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are six blogs', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(testBlogs.length)
    })

    test('the first blog is about React Patterns', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body[0].title).toBe('React patterns')
    })
})

const validTestBlog = {
    author: 'Testi Postaaja',
    title: 'Testi Posti',
    url: 'https://test.com',
    likes: 3
}

const invalidTestBlog = {
    author: 'Torsti Postaaja',
    title: 'Torsti Posti',
    likes: 1
}

describe('POST /api/blogs', () => {
    test('valid blog can be added', async () => {
        await api
            .post('/api/blogs')
            .send(validTestBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })
    test('empty blog is not added', async () => {
        await api
            .post('/api/blogs')
            .send({})
            .expect(400)
    })
    test('blog without url is not added', async () => {
        await api
            .post('/api/blogs')
            .send(invalidTestBlog)
            .expect(400)
    })
})

afterAll(() => {
    server.close()
})