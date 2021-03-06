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

const testBlogList = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    }
]

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

module.exports = {
    validTestBlog,
    noUrlTestBlog,
    noTitleTestBlog,
    unpopularTestBlog,    
    testBlogList,
    validUser,
    shortPasswordUser
}