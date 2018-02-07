const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else {
        return blogs.map(x => x.likes).reduce((a, b) => a + b)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    let mostLikes = -1
    let favoriteObject

    for (let index = 0; index < blogs.length; index++) {
        if (blogs[index].likes > mostLikes) {
            mostLikes = blogs[index].likes
            favoriteObject = blogs[index]
        }
    }
    return {
        title: favoriteObject.title,
        author: favoriteObject.author,
        likes: favoriteObject.likes
    }
}

const mostBlogs = (blogs) => {
    let myMap = new Map()
    let mostBlogs = 0

    // Create a map of authors and their blog counts while finding the maximum number of blogs
    blogs.forEach(blog => {
        if (myMap.has(blog.author)) {
            let numberOfBlogs = myMap.get(blog.author) + 1
            myMap.set(blog.author, numberOfBlogs)
            mostBlogs = Math.max(mostBlogs, numberOfBlogs)
        } else {
            myMap.set(blog.author, 1)
            mostBlogs = Math.max(mostBlogs, 1)
        }
    })

    // Return the first occurrence of highest number of blogs
    for (let [key, value] of myMap) {
        if (value === mostBlogs) {
            return ({ 'author': key, 'blogs': value })
        }
    }
}

const mostLikes = (blogs) => {
    let myMap = new Map()
    let mostLikes = 0

    // Create a map of authors and their like counts while finding the maximum number of likes
    blogs.forEach(blog => {
        if (myMap.has(blog.author)) {
            let numberOfLikes = myMap.get(blog.author) + blog.likes
            myMap.set(blog.author, numberOfLikes)
            mostLikes = Math.max(mostLikes, numberOfLikes)
        } else {
            myMap.set(blog.author, blog.likes)
            mostLikes = Math.max(mostLikes, blog.likes)
        }
    })

    // Return the first occurrence of highest number of likes
    for (let [key, value] of myMap) {
        if (value === mostLikes) {
            return ({ 'author': key, 'votes': value })
        }
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
