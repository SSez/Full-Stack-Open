const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  let likes
  if(!(body.likes)) {
      likes = 0
  } else {
      likes = body.likes
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.params.id) {
    return response.status(400).end()
  }
  const user = request.user
  const findBlog = await Blog.findById(request.params.id)
  if(!findBlog) {
    return response.status(404).end()
  }
  if (findBlog.user._id.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  if (!request.params.id) {
    return response.status(400).end()
  }
  const body = request.body
  const user = request.user
  const findBlog = await Blog.findById(request.params.id)
  if(!findBlog) {
    return response.status(404).end()
  }
  if (findBlog.user._id.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogRouter