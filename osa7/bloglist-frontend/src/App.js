import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogInfo from './components/BlogInfo'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Jumbotron from './components/Jumbotron'
import Users from './components/Users'
import UserInfo from './components/UserInfo'

import storage from './utils/storage'

import { setNotification } from './reducers/notification'
import { initializeBlogs, createBlog } from './reducers/blogs'

import { login, logout } from './reducers/user'
import { initializeUsers } from './reducers/users'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import { Container } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`))
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
  )

/*
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
      dispatch(setNotification(`a new blog added`, 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification(exception.response.data.error, 5))
      setMessage({
        message: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }
*/

  return (
    <Router>
      <Menu user={user} handleLogout={handleLogout} />
      <Jumbotron />
      <Container>
      <h2>Blogs</h2>
      <Notification />

      <Switch>
        <Route path="/users/:id">
          <UserInfo />
        </Route>
        <Route path="/blogs/:id">
          <BlogInfo />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          { blogForm() }
          <Blogs />
        </Route>
      </Switch>
      <Footer />
      </Container>
    </Router>
  )
}

export default App
