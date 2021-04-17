import axios from 'axios'

const REST_COUNTRY_URL = 'https://restcountries.eu/rest/v2/all'

const API_URL = "http://api.weatherstack.com/"
const API_KEY = process.env.REACT_APP_API_KEY

// REACT_APP_API_KEY=a9120f68fc9587d2ec0451ee13510c89 npm start
// http://api.weatherstack.com/current?access_key=a9120f68fc9587d2ec0451ee13510c89&query=Finland

const getCountries = () => {
  const request = axios.get(REST_COUNTRY_URL)
  return request.then(response => response.data)
}

const getWeather = (capital) => {
  const request = axios.get(`${API_URL}current?access_key=${API_KEY}&query=${capital}`)
  return request.then(response => response.data)
}

export default { 
  getCountries, getWeather
}