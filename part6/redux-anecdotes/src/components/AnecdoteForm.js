import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.txtAnecdote.value
    event.target.txtAnecdote.value = ''
    createAnecdote(content)
    setNotification(`Anecdote '${content}' added`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='txtAnecdote' />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const mapStateToProps = (state) => {
    return {
      notification: state.notification
    }
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm