import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    props.handleLike(props.blog.id)
  }

  const remove = () => {
    props.handleRemove(props.blog.id)
  }

  useImperativeHandle(ref, () => {
    return props.blog
  })

  const btnLabel = () => {
    if(visible) {
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
        {props.blog.title} {props.blog.author} <button id='label-btn' onClick={toggleVisibility}>{btnLabel()}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.blog.url}
        <br />
        <div id='div-like'>
          Likes: {props.blog.likes} {props.user === null ? <div></div> : <button id='btn-like' onClick={like} >like</button> }
        </div>
        <br />
        {props.blog.user.name}
        {props.user === null ?
          <div></div> :
          <div>
            <br />
            <button id='btn-remove' onClick={remove}>Remove</button>
          </div>
        }

      </div>
    </div>
  )
})

Blog.displayName = 'Blog'

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog