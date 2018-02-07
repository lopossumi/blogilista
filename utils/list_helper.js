const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else {
        return blogs.map(x => x.likes).reduce((a, b) => a + b)
    }
}

module.exports = {
    totalLikes
}
