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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage({
        message: `a new blog: ${blogObject.title} written by ${blogObject.author} Added`,
        type: 'success'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    }).catch((error) => {
      console.error(error.response.data)
      setMessage({
        message: error.response.data.error,
        type: 'error'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    })
  }

  const addLike = (id) => {
    let blog = blogs.find(blog => blog.id === id)
    let blogObject = {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
    }
    blogService.update(blog.id, blogObject).then(returnedBlog => {
      console.log(returnedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    }).catch((error) => {
      console.error(error.response.data)
      setMessage({
        message: error.response.data.error,
        type: 'error'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    })
  }

  const removeBlog = async id => {
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
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogData = (blog) => {
    return <Blog key={blog.id} blog={blog} like={addLike} removeBlog={removeBlog} user={user}/>
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