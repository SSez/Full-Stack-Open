const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const Comment = require('../models/comment')

const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
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

blogRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  if (blog) {
    //const comments = await Comment.find({}).populate('blog', {'title' : 1})
    const comments = await Comment.find({}).populate('blog', {'title' : 1})
    response.json(comments.map((blog) => blog.toJSON()))
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/:id/comments', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const body = request.body

    if (body.content !== undefined) {
      const comment = new Comment({
        content: body.content,
        blog : body.id
      })

      const savedComment = await comment.save()
      blog.comments = blog.comments.concat(savedComment._id)
      const savedBlog = await blog.save()

      response.status(201).json(savedComment.toJSON())
    }

  } catch (error) {
    //console.log(error)
    response.status(401).end()
  }
})

module.exports = blogRouter