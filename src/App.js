import './App.css';
import { BarLoader} from 'react-spinners'
import React, { useState } from 'react';
const img1 = "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80"

const api = {
  key: "b0e474306d029497cb7a32cdf17fab4e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
        console.log("Hello");
      });
    }
  }

  const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
  "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
  }

  return (
    <div className="App">
      <main>
        <div className="main-background">
          <div className="search-container">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Search for any city..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
            <div className="bar-loader">
              <BarLoader/>
            </div>
            {(typeof weather.main != "undefined") ? (
                
            <div>
              <div className="info-container">
                <h1 className="location">{weather.name}, {weather.sys.country}</h1>
                <h1 className="date">{dateBuilder(new Date())}</h1>
                <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
              </div>
            </div>
            ) : ('')}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;