const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const data = require('./test_data')
const Blog = require('../models/blog')
const {blogsInDb} = require('./test_helper')

describe('POST /api/blogs', () => {
    let initialBlogs
    beforeAll(async () => {
        initialBlogs = await blogsInDb()
    })

    test('valid blog can be added; total number increases', async () => {
        await api
            .post('/api/blogs')
            .send(data.validTestBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const numberOfBlogs = (await blogsInDb()).length
        expect(numberOfBlogs).toBe(initialBlogs.length+1)
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
            .send(data.noTitleTestBlog)
            .expect(400)
    })
    test('blog without url is not added', async () => {
        await api
            .post('/api/blogs')
            .send(data.noUrlTestBlog)
            .expect(400)
    })
    test('blog without likes is added and likes are set to 0', async () => {
        const response = await api
            .post('/api/blogs')
            .send(data.unpopularTestBlog)
            .expect(201)
        expect(response.body.likes).toBe(0)
    })
})

describe('GET /api/blogs', () => {
    let blogsInDatabase

    beforeAll(async () => {
        await Blog.remove({})
    
        for (const blog of data.testBlogList) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
        blogsInDatabase = await blogsInDb()
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are correct number of blogs', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(blogsInDatabase.length)
    })

    test('the first blog is about React Patterns', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body[0].title).toBe('React patterns')
    })
})

describe('DELETE /api/blogs/id', () => {
    let initialBlogs

    beforeAll(async () => {
        await Blog.remove({})
    
        for (const blog of data.testBlogList) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
        initialBlogs = await blogsInDb()
    })

    test('third blog is removed', async () => {
        await api
            .delete('/api/blogs/'+initialBlogs[2].id)
            .expect(204)
        
        const numberOfBlogs = (await blogsInDb()).length
        expect(numberOfBlogs).toBe(initialBlogs.length-1)
    })

    test('try to remove with malformatted id', async () => {
        await api
            .delete('/api/blogs/'+1232)
            .expect(400)
    })
})

describe('PUT /api/blogs/id', () => {
    let initialBlogs

    beforeAll(async () => {
        await Blog.remove({})
    
        for (const blog of data.testBlogList) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
        initialBlogs = await blogsInDb()
    })

    test('third blog likes are set to 999', async () => {
        const result = await api
            .put('/api/blogs/'+initialBlogs[2].id)
            .send({
                likes: 999
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(result.body.likes).toBe(999)
        expect(result.body.author).toBe(initialBlogs[2].author)
    })
})

afterAll(() => {
    server.close()
})