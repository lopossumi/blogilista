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

const noUrlTestBlog = {
    author: 'Torsti Postaaja',
    title: 'Torsti Posti',
    likes: 1
}

const noTitleTestBlog = {
    author: 'Torsti Postaaja',
    url: 'https://testing.com/123',
    likes: 5,
}

const unpopularTestBlog = {
    author: 'Torsti Postaaja',
    title: 'Torsti Postaajan epäsuositut jutut',
    url: 'https://testing.com/vmp',
}

describe('POST /api/blogs', () => {
    test('valid blog can be added; total number increases', async () => {
        await api
            .post('/api/blogs')
            .send(validTestBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(testBlogs.length+1)
    })
    test('empty blog is not added', async () => {
        await api
            .post('/api/blogs')
            .send({})
            .expect(400)
    })
    test('blog without title is not added', async () => {
        await api
            .post('/api/blogs')
            .send(noTitleTestBlog)
            .expect(400)
    })
    test('blog without url is not added', async () => {
        await api
            .post('/api/blogs')
            .send(noUrlTestBlog)
            .expect(400)
    })
    test('blog without likes is added and likes are set to 0', async () => {
        const response = await api
            .post('/api/blogs')
            .send(unpopularTestBlog)
            .expect(201)
        expect(response.body.likes).toBe(0)
    })
})

afterAll(() => {
    server.close()
})