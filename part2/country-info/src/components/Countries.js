import React, { useEffect, useState } from "react";
import Service from '../services/db'

const ListCountries = (props) => {
  return (
      <div>
          {props.country.name} <button onClick={props.handleFilter} value={props.country.name}>show</button>
      </div>
  )
}
const ListLanguages = ({ language }) => <ul><li>{language}</li></ul>

const DisplayData = ({ countryData }) => {
  const obj = countryData[0]
  const [weather, setWeather] = useState()
  useEffect(() => { Service.getWeather(obj.capital).then(initialWeatherData => { setWeather(initialWeatherData) })}, [])
  const languages = obj.languages.map((x, i) => <ListLanguages key={i} language={x.name} />)
  let temp, icon, desc, wind_speed, wind_dir
  if(weather) {
    temp = weather.current["temperature"]
    icon = weather.current["weather_icons"][0]
    desc = weather.current["weather_descriptions"][0]
    wind_speed = weather.current["wind_speed"]
    wind_dir = weather.current["wind_dir"]
  }
  return (
      <div>
          <h2>{ obj.name }</h2>
          <p>Capital: {obj.capital}</p>
          <p>Population: {obj.population}</p>
          <h3>Languages</h3>
          { languages }
          <img alt="flag" src={obj.flag} width={150} height={100} ></img>
          <h3>Weather in {obj.capital}</h3>
          <p><b>Temperature:</b> { temp } Celsius</p>
          <img src={icon} alt={desc} />
          <p><b>Wind:</b> {wind_speed} mph direction {wind_dir}</p>
      </div>
  )
}

const Countries = (props) => {
  const countryData = props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase()))
  if (countryData.length > 10) {
    return(<p>Too many matches, specify another filter</p>)
  } else if (countryData.length > 1) {
    const mapCountries = countryData.map( (country, i) => <ListCountries key={i} country={country} handleFilter={props.handleFilter} /> )
    return(mapCountries)
  } else if (countryData.length === 1) {
    return(<DisplayData countryData={countryData}/>)
  } else {
    return(<p>Nothing was found.</p>)
  }
}

export default Countries