import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup, Button } from 'react-bootstrap'
import { likeBlog, removeBlog } from '../reducers/blogs'

const BlogData = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    dispatch(likeBlog(props.blog))
  }

  const remove = () => {
    const ok = window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)
    if (ok) {
      dispatch(removeBlog(props.blog.id))
      history.push('/')
    }
  }

  const btnLabel = () => {
    if (visible) {
      return 'hide'
    }
    return 'view'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} id='bloglist'>
      <div>
        <Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link>{' '}
        {props.blog.author}{' '}
        <Button id='label-btn' onClick={toggleVisibility}>
          {btnLabel()}
        </Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.blog.url}
        <br />
        <div id='div-like'>
          Likes: {props.blog.likes}{' '}
          {props.user === null ? (
            <div></div>
          ) : (
            <Button id='btn-like' onClick={like}>
              like
            </Button>
          )}
        </div>
        <br />
        {props.blog.user.name}
        {props.user === null ? (
          <div></div>
        ) : (
          <div>
            <br />
            <Button id='btn-remove' onClick={remove}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs).sort((b1, b2) => b2.likes - b1.likes)
  const user = useSelector((state) => state.user)
  return (
    <div>
      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <BlogData blog={blog} user={user} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blogs