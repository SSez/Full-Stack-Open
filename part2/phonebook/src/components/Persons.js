import React from 'react'

const Persons = (props) => {
  let personList = props.persons
  if(props.filter) {
    personList = personList.filter((person) => {
        return person.name.toLowerCase().includes(props.filter.toLowerCase())
    })
  }
  const mapPersons = personList.map( (x) => <p key={x.id}>{x.name} {x.number} <button data-id={x.id} onClick={props.deletePerson}>Delete</button></p> )
  return (
    <div>{mapPersons}</div>
  )
}

export default Persons