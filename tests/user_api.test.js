const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

const validUser={
    username: 'teppotesti',
    name: 'Teppo Testi',
    password: 'secreto',
    adult: true
}

const shortPasswordUser={
    username: 'teppo2',
    name: 'Teppo Toinen',
    password: 's',
    adult: true
}

describe('POST /api/users/', () => {
    beforeAll(async () => {
        //drop users
        await User.remove({})
    })

    test('valid user can be added', async () => {
        await api
            .post('/api/users/')
            .send(validUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('...but not twice', async () => {
        await api
            .post('/api/users/')
            .send(validUser)
            .expect(400)
    })

    test('username with <3 character password cannot be added', async () => {
        await api
            .post('/api/users/')
            .send(shortPasswordUser)
            .expect(400)
    })
})

afterAll(() => {
    server.close()
})