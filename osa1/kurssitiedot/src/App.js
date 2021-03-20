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
  const listParts = p.map( (p) => <Part key={p.id} name={p.name} count={p.exercises} /> )
  return(
    <div>
      {listParts}
    </div>
  )
}

const Total = (props) => {
  const p = props.count
  const sum = p.reduce((a, b) =>  a = a + b.exercises, 0)
  return(
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
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