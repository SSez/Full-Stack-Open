import React, { useState } from 'react'

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

const App = (props) => {
  const title = "Give feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  const avg = (good - bad) / all
  const p = good / all * 100
  return (
    <div>
      <Header name={title} />
      <Button handleClick={increaseGood} text='Good' />
      <Button handleClick={increaseNeutral} text='Neutral' />
      <Button handleClick={increaseBad} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={avg} positive={p} />
    </div>
  )
}

export default App