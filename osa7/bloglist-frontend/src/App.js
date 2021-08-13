import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import BlogInfo from "./components/BlogInfo"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import Jumbotron from "./components/Jumbotron"

import userService from "./services/users"
import storage from "./utils/storage"

import { setNotification } from "./reducers/notificationReducer"
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"

import { initializeUser, login, logout } from "./reducers/userReducer"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom"

import { Container, ListGroup, Table } from "react-bootstrap"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getUsers()
      setUsers(users)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(initializeUser(user))
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(
        setNotification(exception.statusText, "invalid username or password.")
      )
      //setTimeout(() => { setMessage(null) }, 5000)
      /*
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
      */
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      /*
      setMessage({
        message: `a new blog: ${newBlog.title} By ${newBlog.author} Added`,
        type: 'success'
      })
      setTimeout(() => { setMessage(null) }, 5000)
      */
      dispatch(setNotification(`a new blog added`, 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification(exception.response.data.error, 5))
      /*
      setMessage({
        message: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => { setMessage(null) }, 5000)
      */
    }
  }

  const handleLike = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const like = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(likeBlog(like))
  }

  const handleRemove = (id, history) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id))
        history.push("/")
        /*
        setMessage({
          message: `Blog: ${blog.title} written by ${blog.author} succesfully removed!`,
          type: 'success'
        })
        setTimeout(() => { setMessage(null) }, 5000)
        */
        dispatch(
          setNotification(
            `Blog: ${blog.title} written by ${blog.author} succesfully removed!`,
            5
          )
        )
      } catch (exception) {
        console.log(exception)
        dispatch(
          setNotification(
            `Blog: ${blog.title} written by ${blog.author} couldn't be removed!`,
            5
          )
        )
        /*
        setMessage({
          message: `Blog: ${blog.title} written by ${blog.author} couldn't be removed!`,
          type: 'error'
        })
        setTimeout(() => { setMessage(null) }, 5000)
        */
      }
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogData = (blog) => {
    return (
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        user={user}
      />
    )
  }

  const Users = () => {
    return (
      <div>
        <h2>Users</h2>
        <Table striped bordered hover variant="dark">
          <tr>
            <th>Username</th>
            <th>Total Blogs</th>
          </tr>

          {users.map((x) => (
            <tr>
              <td key={x.id}>
                <Link to={`/users/${x.id}`}>{x.name}</Link>
              </td>
              <td>{x.blogs.length}</td>
            </tr>
          ))}
        </Table>
      </div>
    )
  }

  const UserInfo = () => {
    const id = useParams().id
    const user = users.find((x) => x.id === id)

    if (!user) {
      return null
    }

    return (
      <div>
        <h2>Username: {user.name}</h2>
        <h4>added blogs:</h4>
        <ListGroup>
          {user.blogs.map((b) => (
            <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }

  return (
    <Router>
      <Menu user={user} handleLogout={handleLogout} />
      <Jumbotron />
      <Container>
        <h2>Blogs</h2>
        <Notification />

        {user === null ? loginForm() : <div></div>}

        {/*
      user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p> <button onClick={handleLogout}>log out</button>
        </div>
      */}
        <Switch>
          <Route path="/users/:id">
            <UserInfo />
          </Route>
          <Route path="/users">
            <Users />
          </Route>

          <Route path="/blogs/:id">
            <BlogInfo
              blogs={blogs}
              user={user}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          </Route>

          <Route path="/">
            {user === null ? <div></div> : blogForm()}

            <div>
              <ListGroup>
                {blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <ListGroup.Item key={blog.id}>
                      {blogData(blog)}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </div>
          </Route>
        </Switch>

        <Footer />
      </Container>
    </Router>
  )
}

export default App
