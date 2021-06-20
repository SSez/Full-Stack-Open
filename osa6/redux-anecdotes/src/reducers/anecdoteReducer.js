import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const updatedAnecdote = action.data
      return state.map(x => x.id !== id ? x : updatedAnecdote)
    }
    case 'CREATE':
      return [...state, action.data]
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newObject = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, newObject)
    dispatch(
      {
        type: 'VOTE',
        data: updatedAnecdote
      }
    )
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(
      {
        type: 'CREATE',
        data: newAnecdote
      }
    )
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(
      {
        type: 'INIT',
        data: anecdotes
      }
    )
  }
}

export default anecdoteReducer