const API_KEY = 'INSERT_YOUR_API_KEY_HERE'

export const getCoords2 = (lat, lon) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json()) 
}

export const getLocation = (location, countrycode) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},${countrycode}&appid=${API_KEY}&units=metric`)
    .then(res => res.json()) 
    .catch(err => console.log(err))
}

