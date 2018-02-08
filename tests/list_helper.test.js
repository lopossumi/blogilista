const listHelper = require('../utils/list_helper')
const blogs = require('./test_data').testBlogList

describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('of many blogs is correct', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })

})

describe('favorite blog', () => {

    test('of empty list is undefined', () => {
        expect(listHelper.favoriteBlog([])).toBe(undefined)
    })

    test('of many blogs is correct', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            title: 'Canonical string reduction',
            likes: 12
        })
    })

})

describe('most blogs', () => {

    test('of empty list is undefined', () => {
        expect(listHelper.mostBlogs([])).toBe(undefined)
    })

    test('of many blogs is Robert C. Martin with 3 blogs', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('most likes', () => {

    test('of empty list is undefined', () => {
        expect(listHelper.mostLikes([])).toBe(undefined)
    })

    test('of many blogs is Dijkstra with 17 likes', () => {
        expect(listHelper.mostLikes(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            votes: 17
        })
    })
})