let _ = require('lodash')
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.map(a => a.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs[0]
}

const mostBlogs = (blogs) => {
  let order = _.orderBy(blogs, "author", "desc")
  let filterOrder = order.filter(x => x.author === order[0].author).map(x => x.author)
  var obj = { "author": filterOrder[0], "blogs": filterOrder.length }
  return obj
}

const mostLikes = (blogs) => {
  let order = _.orderBy(blogs, ['author', 'likes'], ['desc', 'desc'])
  var array = []
  let obj = { "author": order[0].author, "likes": 0 }
  order.forEach(x => {
    if (x.author === obj.author) {
      obj.likes += x.likes
    } else {
      array.push(obj)
      obj.author = x.author
      obj.likes = 0
      obj.likes += x.likes
    }
  })
  let newOrder = _.orderBy(array, 'likes', 'desc');
  return newOrder[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}