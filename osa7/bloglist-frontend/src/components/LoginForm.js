import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'
import loginService from '../services/login'
import { setNotification } from '../reducers/notification'
import storage from '../utils/storage'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(login(user))
      dispatch(setNotification(`${user.name} welcome back!`))
      storage.saveUser(user)
    } catch(exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder='Enter username'
            type='username'
            id='username'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder='Enter password'
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>

        <Button id='login' variant='success' type='submit'>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm