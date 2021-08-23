const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const h4 = document.querySelector("h4");
const img = document.querySelector("img");
const btn = document.querySelector(".normal");
const btn2 = document.querySelector(".coords");
const input = document.querySelector(".mainsearch")
const input2 = document.querySelector(".countrycode")
import {weatherDescription, parseLocation } from "./repeatFunctionality.js";
import {getCoords2} from './apiCalls.js'


btn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  let inputValue = input.value;
  const countryCode = input2.value;
  if (!inputValue) {
    parseLocation("London", "GB");
  } else {
    parseLocation(inputValue, countryCode);
  }
  
});

btn2.addEventListener('click', async (evt) => {
  evt.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const location = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
          const data = await getCoords2(location.lat, location.long)
          h1.innerText = data.main.temp + " degrees (C)"
          h2.innerText = data.name
          let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
      
          if (data.sys.country) {
            let country_name = regionNames.of(data.sys.country);
            h3.innerText = country_name;
          } else {
            h3.innerText = "";
          }
          let description = JSON.stringify(data.weather[0].description);
          description = description.toLowerCase();

          weatherDescription(data, description)

      }
    , (error) => {
      if (error.code == error.PERMISSION_DENIED)
        h1.innerText = "Geolocation is disabled! Please enable it."
        h2.innerText = "", h3.innerText = "", h4.innerText = "", img.src = ""
      }
    );
  } 
  
});





