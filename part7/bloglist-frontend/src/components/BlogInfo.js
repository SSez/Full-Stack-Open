import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogs'

const Comments = ({ comments, handleComment }) => {
  const addComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    handleComment(content)
  }

  return (
    <div>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control
            name='comment'
          />
        </Form.Group>
        <Button variant="success" type="submit">
          add comment
        </Button>
      </Form>

      <ListGroup>
       {comments.map((c, i) => (
       <ListGroup.Item key={i}>{c}</ListGroup.Item>
       ))}
     </ListGroup>
    </div>
  )
}

const BlogInfo = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  if (!blog) {
    return null
  }

  const own = user && user.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(id))
      history.push('/')
    }
  }

  const handleComment = (comment) => {
    dispatch(commentBlog(id, comment))
  }

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>Likes: {blog.likes}
          <Button variant="success" onClick={handleLike}>Like</Button>
        </div>
      <h4>added by {blog.user.name}</h4>

      <Comments comments={blog.comments} handleComment={handleComment} />
      { own && <Button variant="danger" onClick={handleRemove}>Remove</Button> }

    </div>
  )
}

export default BlogInfo
