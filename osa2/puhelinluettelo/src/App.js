import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import Service from './services/db'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => { Service.getAll().then(initialPersons => { setPersons(initialPersons) })}, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handlePersonChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleNameFilter = (event) => { setNameFilter(event.target.value) }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} handleFilter={handleNameFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={nameFilter} />
    </div>
  )
}

export default App