import React, { useState } from 'react';

const api = {
  key: "5398c78b36ca5edf63dfe834d579bf33",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? 
    ((weather.main.temp > 70) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="City, Country"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          /> 
        </div>
      
      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°F</div>
          <div className="feels"> Feels like {Math.round(weather.main.feels_like)}°F</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
      </div>
      ) : ('')} 
      </main>
    </div>
  );
}

export default App;