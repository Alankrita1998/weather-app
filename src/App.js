import './App.css';
import cloudy from "./assests/cloudy.png";
import sunny from "./assests/sunny.png";
import rainicon from "./assests/rainicon.jpg";
import mist from "./assests/mist.png";
import React, { useState,useEffect} from 'react';
import useDatePicker from './useDatePicker';
import locationheader from "./assests/locationheader.jpg";
import datetime from "./assests/datetime.png"
import searchicon from "./assests/searchicon.png";
import haze from "./assests/haze.png";
import visibility from "./assests/visibility.jpg";
import humidity from "./assests/humidity.jpg";
import wind from "./assests/wind.jpg";
import Shimmer from './Shimmer';
import Error from './Error';



const api = {
  key : "8e1430b18afd134a0e24879f710044eb",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const {date,time} = useDatePicker();
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const timer = setTimeout(() => {
    navigator.geolocation.getCurrentPosition (async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      try {
        const response = await fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`);
        const result = await response.json();
        setWeather(result);
        setLoading(false);
      } catch (error) {
        setWeather({ cod: 404, message: "city not found" });
        setLoading(false);
      }
    });
  },3000);
  return () => clearTimeout(timer);
  }, []);

    const search = async (evt) => {
      if (evt.key === "Enter") {
        if (query.trim() === "") {
          alert("Please enter a city.");
          return;
        }
        try {
          const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
          const result = await response.json();
          setWeather(result);
          setQuery('');
        } catch (error) {
          setWeather({ cod: 404, message: "city not found" });
          setLoading(true);
        }
      }
    }


    const weatherConditions = () => {
      if (typeof weather.main !== "undefined" && typeof weather.visibility !== "undefined" && typeof weather.weather !== "undefined" && weather.weather.length > 0) {
        if ( weather.weather[0]?.main === "Rain" || weather.weather[0]?.main === "Mist") {
          return 'app-rain';
        }
        else{
            const currentHour = new Date().getHours(); 
            if (currentHour >= 6 && currentHour < 18) {
              return 'app-warm'; 
            } else {
              return 'app';
            }
        }
      };
      return 'app';
    };

    const weatherType = () =>{
      if(typeof weather.main !== "undefined" && typeof weather.visibility !== "undefined" && typeof weather.weather !== "undefined" && weather.weather.length > 0) {
        if( weather.weather[0]?.main === "Rain") {
            return (rainicon);
        } else if ( weather.weather[0]?.main === "Clouds"){
            return (cloudy);
        } else if ( weather.weather[0]?.main === "Haze"){
          return (haze);
        } else if (weather.weather[0]?.main === "Mist"){
          return (mist);
        } else if (weather.weather[0]?.main === "Sunny"){
          return (sunny);
        }
      };
      return (haze);
    }

    const loadError = () => {
      if (typeof weather.cod !== "undefined" && weather.cod === "404" && weather.message === "city not found") {
        return <Error />;
      }else if( weather === null){

      }
      return null;
    }





    return (
    <div className={weatherConditions()}>
      {/* <main> : it helps improve both SEO and website accessibility by clearly defining where the main content begins. This makes it easier for search engine algorithms an  d screen readers to interpret your site. */}
      <main>
          <div className="header">
            <div className="header-left">
              <div>
                <img className="datetime-img" alt="datetime "src={datetime}/>
              </div>
              <div className="datetime">
                <div className ="date">{date}</div>
                <div className='time'>{time}</div>
              </div>
              </div>
              
            <div  className="header-right">
              <div>
                  <img className="location-img" alt="location" src={locationheader}/>
              </div>
              <div>
                <h2 className="india-text">India</h2>
              </div>
            </div>
            </div>
            <div className="body">
            <div className = "search-bar">
              <input className="search-input" type = "text" placeholder={"Search . . ."} onChange={e => setQuery(e.target.value)} value={query} onKeyDown ={search}  />
              <img src={searchicon} alt="Search Icon" className="search-icon" />
          </div>
            {/* { loadError() || typeof weather.main === "undefined" ? (<Shimmer />) : ( */}
            {loading ? <Shimmer /> : (loadError() || (
            
             <div>
            <div className = "location">{"📌"} {weather.name}, {weather.sys?.country}</div>
            <div className="temp">  {Math.round(weather.main?.temp)}° C</div>
            <div className = "main-box">
            <div className='weather-container'>
                   <img className="weather-title-img" alt="weather" src={weatherType()}/>
                   <div className = "weather-title">Weather-type :</div>
                   <div className = "main-data">{weather.weather?.[0]?.main}</div>
            </div>
            <div className="vertical-line"></div>

            <div className="other-parameters">
            <div className="last-section-header">
                <div className='parameter-container'>
                <img className="title-img" alt="weather" src={visibility}/>
                    <div className = "title">Visibility :</div>
                </div>
                <div className='parameter-container'>
                <img className="title-img" alt="weather" src={humidity}/>
                    <div className= "title">Humidity :</div>
                </div>
                <div className='parameter-container'>
                <img className="title-img" alt="weather" src={wind}/>
                    <div className= "title">Wind Speed :</div>
                </div>
            </div>
            <div className="last-section">
              <div className = "parameter-data">{weather.visibility} m</div>
              <div className= "parameter-data">{weather.main?.humidity} %</div>
              <div className= "parameter-data">{weather.wind?.speed} Km/h</div>
            </div>
          </div>
          </div>
          </div>
            )
          )};
           </div>
          <div className="footer">
            {/*  rel="noopener noreferrer" ----->attributes are important for security and performance reason */}
            <h4>
            <a className="linkedIn"
          href="https://www.linkedin.com/in/alankrita-mohapatra/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @alankrita.mohapatra {"(★‿★)"}
        </a>
        </h4>

          </div>
      </main>
              
    </div>);
}

export default App;