import React, { useEffect, useState } from "react";
import Service from './services/db'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => { Service.getCountries().then(initialCountryData => { setCountries(initialCountryData) })}, [])

  const handleCountryFilter = (event) => { setCountryFilter(event.target.value) }
  
  return (
    <div>
      <Filter filter={countryFilter} handleFilter={handleCountryFilter} />
      <Countries countries={countries} filter={countryFilter} handleFilter={handleCountryFilter} />
    </div>
  )
}

export default App