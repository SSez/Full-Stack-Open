import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = (props) => {
  return (<h1>{props.name}</h1>)
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) { return (<p>No feedback given</p>) }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Feedback</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="All" value={props.all} />
          <StatisticLine text="Average" value={props.average} />
          <StatisticLine text="Positive" value={props.positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const title = "Give feedback"
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () =>{
    store.dispatch({
      type: 'ZERO'
    })
  }

  const getGood = store.getState().good
  const getnNeutral = store.getState().ok
  const getBad = store.getState().bad

  const all = getGood + getnNeutral + getBad
  const avg = (getGood - getBad) / all
  const p = getGood / all * 100
  return (
    <div>
      <Header name={title} />
      <Button handleClick={good} text='Good' />
      <Button handleClick={neutral} text='Neutral' />
      <Button handleClick={bad} text='Bad' />
      <Button handleClick={reset} text='Reset' />
      <Statistics good={getGood} neutral={getnNeutral} bad={getBad} all={all} average={avg} positive={p} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)