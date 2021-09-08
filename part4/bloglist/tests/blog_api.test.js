const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('viewing blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(response.body.length)
  })
  test('the identifying field is id and not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('checking specific blogs', () => {
  test('a valid blog can be added ', async () => {
    const result = await api.post('/api/login').send({ username: "root", password: "secret" })
    const token = result.body.token
    const newBlog = {
      title: "Hello world!",
      author: "root",
      url: "github.com",
      likes: 0
    }
    const r = await api.get('/api/blogs')
    const previous = r.body.length

    await api.post('/api/blogs').auth(token, { type: 'bearer' }).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(x => x.title)
    expect(response.body).toHaveLength(previous + 1)
    expect(titles).toContain('Hello world!')
  })

  test('Blog without likes ',async () => {
    const result = await api.post('/api/login').send({ username: 'root', password: 'secret' })
    const token = result.body.token
    const newBlog = {
      title: "Hello world",
      author: "test",
      url: "github.com"
    }
    await api.post('/api/blogs').auth(token, { type: 'bearer' }).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/)
    const likes = response.body.map(n => n.likes)
    const zero = likes[likes.length - 1]
    expect(zero === 0)
  })

  test('must have title and url ', async () => {
    const result = await api.post('/api/login').send({ username: 'root', password: 'secret' })
    const token = result.body.token
    const newBlog = {
      author: "test",
      likes: 1
    }
    const r = await api.get('/api/blogs')
    const previous = r.body.length

    await api.post('/api/blogs').auth(token, { type: 'bearer' }).send(newBlog).expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(previous)
  })

  test('invalid token ', async () => {
    const token = "invalid"
    const newBlog = {
      title: "Hello world!",
      author: "root",
      url: "github.com",
      likes: 0
    }
    await api.post('/api/blogs').auth(token, { type: 'bearer' }).send(newBlog).expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})