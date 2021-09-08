import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => { blogService.getAll().then(blogs => setBlogs(blogs)) }, [])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      setUser(user)
      storage.saveUser(user)
    } catch(exception) {
      setMessage({
        message: 'invalid username or password.',
        type: 'error'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessage({
        message: `a new blog: ${newBlog.title} By ${newBlog.author} Added`,
        type: 'success'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    } catch(exception) {
      console.log(exception)
      setMessage({
        message: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const likeBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.update(likeBlog)
    setBlogs(blogs.map(b => b.id === id ? { ...blog, likes: blog.likes + 1 } : b))
  }

  const handleRemove = async id => {
    const blog = blogs.find(blog => blog.id === id)
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage({
          message: `Blog: ${blog.title} written by ${blog.author} succesfully removed!`,
          type: 'success'
        })
        setTimeout(() => { setMessage(null) }, 5000)
      } catch (exception) {
        console.log(exception)
        setMessage({
          message: `Blog: ${blog.title} written by ${blog.author} couldn't be removed!`,
          type: 'error'
        })
        setTimeout(() => { setMessage(null) }, 5000)
      }
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const blogData = (blog) => {
    return <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
  }

  return (
    <div>
      <h2>Blog</h2>
      <Notification note={message} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p> <button onClick={handleLogout}>log out</button>
          {blogForm()}
        </div>
      }

      <h2>blog posts</h2>
      <ul>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <li key={blog.id}>{blogData(blog)}</li>
        )}
      </ul>
      <Footer/>
    </div>
  )
}

export default App