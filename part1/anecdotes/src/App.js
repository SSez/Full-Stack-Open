import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
  const voteArray = Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(voteArray)
  // Vote && get max votes
  const vote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }
  let maxValue = Math.max(...votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={vote} text='Vote' />
      <Button handleClick={nextAnecdote} text='Next anecdote' />
      
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[votes.indexOf(maxValue)]}</p>
      <p>has {maxValue} votes</p>
    </div>
  )
}

export default App