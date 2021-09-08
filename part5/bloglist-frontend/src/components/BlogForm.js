import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [setTitle, setNewTitle] = useState('')
  const [setAuthor, setNewAuthor] = useState('')
  const [setURL, setNewURL] = useState('')

  const handleTitleChange = (event) => { setNewTitle(event.target.value) }
  const handleAuthorChange = (event) => { setNewAuthor(event.target.value) }
  const handleURLChange = (event) => { setNewURL(event.target.value) }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: setTitle,
      author: setAuthor,
      url: setURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <label>Title:</label>
        <input
          id='title'
          value={setTitle}
          onChange={handleTitleChange}
        />
        <label>Author:</label>
        <input
          id='author'
          value={setAuthor}
          onChange={handleAuthorChange}
        />
        <label>URL:</label>
        <input
          id='url'
          value={setURL}
          onChange={handleURLChange}
        />
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm