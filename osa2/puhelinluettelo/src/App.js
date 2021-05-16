import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from "./components/Notification"
import Service from './services/db'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => { Service.getAll().then(initialPersons => { setPersons(initialPersons) })}, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if (persons.some(person => person.number === newNumber)) {
        setMessage({
          message: `${newName} is already added to phonebook`,
          type: "error"
        })
        setTimeout(() => { setMessage(null) }, 5000)
      } else if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(x => x.name === newName).id
        const index = persons.findIndex(x => x.id === Number(id))
        Service.update(id, personObject).then(() => {
          let personObj = [...persons]
          personObj[index] = personObject
          personObj[index].id = id
          setPersons(personObj)
          setMessage({
            message: `updated ${newName} number to ${newNumber}`,
            type: "success"
          })
          setTimeout(() => { setMessage(null) }, 5000)
        }).catch((error) => {
          console.error(error)
          setMessage({
            message: `Failed to update ${newName} number`,
            type: "error"
          })
          setTimeout(() => { setMessage(null) }, 5000)
        })
      }
    } else {
      Service.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({
          message: `${newName} added to phonebook`,
          type: "success"
        })
        setTimeout(() => { setMessage(null) }, 5000)
      }).catch((error) => {
        console.error(error)
        setMessage({
          message: `Failed to add ${newName} phonebook`,
          type: "error"
        })
        setTimeout(() => { setMessage(null) }, 5000)
      })
    }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    let id = event.target.getAttribute("data-id")
    const index = persons.findIndex(x => x.id === Number(id))
    if(window.confirm(`Delete ${persons[index].name} ?`)) {
      Service.del(id).then(() => {
        let personObj = [...persons]
        personObj.splice(index, 1)
        setPersons(personObj)
        setMessage({
          message: `Succesfully removed ${persons[index].name} from phonebook`,
          type: "success"
        })
        setTimeout(() => { setMessage(null) }, 5000)
      }).catch((error) => {
        console.error(error)
        setMessage({
          message: `Information of ${persons[index].name} has already been removed from the server.`,
          type: "error"
        })
        setTimeout(() => { setMessage(null) }, 5000)
    })
    }
  }

  const handlePersonChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleNameFilter = (event) => { setNameFilter(event.target.value) }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification note={message} />
      <Filter filter={nameFilter} handleFilter={handleNameFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={nameFilter} deletePerson={deletePerson}  />
    </div>
  )
}

export default App