import React from 'react'

const Course = ({course}) => {
  return (
      <div>
          <Header name={course.name} />
          <Content content={course.parts} />
          <Total count={course.parts} />
      </div>
  )
}

const Header = ({name}) => {
  return (<h2>{name}</h2>)
}

const Part = ({name, count}) => {
  return (
    <p>{name} {count}</p>
  )
}

const Content = (props) => {
  const p = props.content
  const rowParts = p.map( (p) => <Part key={p.id} name={p.name} count={p.exercises} /> )
  return(
    <div>
      {rowParts}
    </div>
  )
}

const Total = (props) => {
  const p = props.count
  const sum = p.reduce((a, b) =>  a = a + b.exercises, 0)
  return(
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
}

export default Course