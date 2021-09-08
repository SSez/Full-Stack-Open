import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id))

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>

      <b>added blogs</b>
      <ListGroup>
        {user.blogs.map((b) => (
          <ListGroup.Item key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User