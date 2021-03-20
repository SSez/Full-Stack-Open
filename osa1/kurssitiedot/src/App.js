import React from 'react'

const Header = (props) => {
  return (<h1>{props.name}</h1>)
}

const Part = ({name, count}) => {
  return (
    <p>{name} {count}</p>
  )
}

const Content = (props) => {
  const p = props.content
  const listItems = p.map((p) => <Part name={p.name} count={p.exercises} />)
  return(
    <div>
      {listItems}
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.count[0].exercises + props.count[1].exercises + props.count[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Total count={course.parts} />
    </div>
  );
}

export default App