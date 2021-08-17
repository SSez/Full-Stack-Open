import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [setTitle, setNewTitle] = useState('')
  const [setAuthor, setNewAuthor] = useState('')
  const [setURL, setNewURL] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: setTitle,
      author: setAuthor,
      url: setURL,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            id="title"
            name="title"
            value={setTitle}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            id="author"
            name="author"
            value={setAuthor}
            onChange={handleAuthorChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter url"
            id="url"
            name="url"
            value={setURL}
            onChange={handleURLChange}
          />
        </Form.Group>

        <Button id="create-blog" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
