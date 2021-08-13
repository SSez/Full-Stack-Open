import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import commentsService from "../services/blogs"
import { Form, Button, ListGroup } from "react-bootstrap"

const BlogInfo = (props) => {
  const history = useHistory()
  const id = useParams().id

  const blog = props.blogs.find((x) => x.id === id)

  if (!blog) {
    return null
  }

  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      const blogsComments = await commentsService.getComments(id)
      setComments(blogsComments)
    }
    fetchComments()
  }, [])

  const [comment, setComment] = useState([])
  const newObj = { content: comment, id: id }

  const createComment = async (comment) => {
    try {
      const newComment = await commentsService.comment(comment)
      setComments(comments.concat(newComment))
    } catch (exception) {
      //console.log(exception)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment(newObj)
    setComment("")
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <h4>
        likes: {blog.likes}{" "}
        <Button variant="success" onClick={() => props.handleLike(blog.id)}>
          Like
        </Button>
      </h4>
      <h4>added by {blog.user.name}</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          add comment
        </Button>
      </Form>
      <h3>comments</h3>

      <ListGroup style={{ margin: "1%" }}>
        {comments.map((x) => (
          <ListGroup.Item key={x.id}>{x.content}</ListGroup.Item>
        ))}
      </ListGroup>

      {props.user !== null ? (
        props.user.username === blog.user.username ? (
          <div>
            <Button
              variant="danger"
              onClick={() => props.handleRemove(blog.id, history)}
            >
              remove blog
            </Button>
          </div>
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default BlogInfo
