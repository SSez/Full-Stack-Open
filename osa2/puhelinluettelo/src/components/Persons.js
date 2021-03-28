import React from 'react'

const Persons = (props) => {
  let personList = props.persons
  if(props.filter) {
    personList = personList.filter((person) => {
        return person.name.toLowerCase().includes(props.filter.toLowerCase())
    })
  }
  const mapPersons = personList.map( (x) => <li key={x.id}>{x.name} {x.number} </li>)
  return (
    <div><ul>{mapPersons}</ul></div>
  )
}

export default Persons