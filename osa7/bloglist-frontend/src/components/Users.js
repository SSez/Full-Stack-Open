import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Username</th>
          <th>Total Blogs</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default Users