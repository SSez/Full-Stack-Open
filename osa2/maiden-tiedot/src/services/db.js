import axios from 'axios'

const REST_COUNTRY_URL = 'https://restcountries.eu/rest/v2/all'

const API_URL = "http://api.weatherstack.com/"
const API_KEY = process.env.REACT_APP_API_KEY

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