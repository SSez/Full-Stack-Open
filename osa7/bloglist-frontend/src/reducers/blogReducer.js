import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT',
      data: blogs
    }
    )
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch ({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const updateLikes = await blogService.update(id, blog)
    dispatch ({
      type: 'LIKE',
      data: updateLikes
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...state, action.data]
    case 'LIKE': {
      const id = action.data.id
      return state.map(blog => blog.id !== id ? blog : action.data)
    }
    case 'DELETE': {
      const id = action.data
      return state.filter(blog => blog.id !== id)
    }
    default:
      return state
  }
}

export default blogReducer