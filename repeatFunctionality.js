import {getLocation} from './apiCalls.js'
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const h4 = document.querySelector("h4");
const img = document.querySelector("img");

const image = (img, data) => {
  h4.innerText = data.weather[0].description;
  document.body.style.backgroundImage = `url(${img})`
  document.body.style.backgroundSize = "cover"
  document.body.style.height = "100vh"
}

export const weatherDescription = (data, description) => {
  const atmosphere = ['mist', 'smoke', 'haze', 'sand/ dust whirls', 'fog', 'sand', 'dust', 'volcanic ash', 'squalls', 'tornado'];
  if (description.includes("clear")) {
      img.src = "http://openweathermap.org/img/wn/01d@2x.png";
      image('https://upload.wikimedia.org/wikipedia/commons/7/70/Clear_Sky_1.jpg', data);
    }
    else if (description.includes("clouds")) {
      img.src = "http://openweathermap.org/img/wn/03d@2x.png";
      image('https://www.publicdomainpictures.net/pictures/140000/velka/himmel-mit-ein-paar-wolken-1449335891Pb2.jpg', data);
    }
    else if (description.includes("rain")) {
      img.src = "http://openweathermap.org/img/wn/09d@2x.png";
      image('https://live.staticflickr.com/4048/4303835161_f0e468c522_h.jpg', data);
    } else if (description.includes("snow") || description.includes("sleet")) {
      img.src = "http://openweathermap.org/img/wn/13d@2x.png";
      image('https://cdn.pixabay.com/photo/2016/06/03/00/09/winter-1432536_960_720.jpg', data);
    } else if (description.includes("thunderstorm")) {
      img.src = "http://openweathermap.org/img/wn/11d@2x.png";
      image('https://media.blogto.com/articles/14966208170_3d43d9f18f_o.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70', data);
    }
    else if (description.includes("drizzle")) {
      img.src = "http://openweathermap.org/img/wn/09d@2x.png";
      image('https://www.publicdomainpictures.net/pictures/10000/velka/2576-1276179637AWWU.jpg', data);
    }
    else if (atmosphere.includes(description)) {
      img.src = "http://openweathermap.org/img/wn/50d@2x.png";
      image('https://pixnio.com/free-images/2019/09/12/2019-09-12-11-57-32-1200x800.jpg', data);
    }
}

export const parseLocation = async (inputValue, countryCode) => {
  const data = await getLocation(inputValue, countryCode);
  if (data.message == "city not found") {
    h1.innerText = `${inputValue} is not a valid location`;
    h2.innerText = "Please retry your search";
    h3.innerText = ""
    h4.innerText = ""
    img.src = ""
    
  } else {
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
    
    weatherDescription(data, description);

  }
}

parseLocation("London", "GB");