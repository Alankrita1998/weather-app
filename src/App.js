import './App.css';
import cloudy from "./assests/cloudy.png";
import sunny from "./assests/sunny.png";
import rainicon from "./assests/rainicon.jpg";
import mist from "./assests/mist.png";
import React, { useState,useEffect} from 'react';
import useDatePicker from './useDatePicker';
import locationheader from "./assests/locationheader.jpg";
import datetime from "./assests/datetime.png"
import haze from "./assests/haze.png";
import visibility from "./assests/visibility.jpg";
import humidity from "./assests/humidity.jpg";
import wind from "./assests/wind.jpg";
import Shimmer from './Shimmer';
import Error from './Error';
import settingicon from './assests/settingicon.png';
import menuicon from './assests/menuicon.png';
import tablogo from './assests/tablogo.jpg';
import { getWeatherCoordinates, getWeatherByCity } from './api/weatherApi';


const linkedIn = process.env.REACT_APP_LINKEDIN;
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
        const result = await getWeatherCoordinates(latitude, longitude);
        setWeather(result);
        setLoading(false);
      } catch (error) {
        setWeather({ cod: 404, message: "city not found" });
        setLoading(false);
      }
    },
    error => {
      console.error('Location access denied:', error);
      fetchWeatherForBangalore();
    }
  );
  },3000);
  return () => clearTimeout(timer);
  }, []);

  const fetchWeatherForBangalore = async () => {
    try {
      const result = await getWeatherByCity('Bangalore');
      setWeather(result);
      setLoading(false);
    } catch (error) {
      setWeather({ cod: 404, message: "city not found" });
      setLoading(false);
    }
  };


    const search = async (evt) => {
      if (evt.key === "Enter") {
        if (query.trim() === "") {
          alert("Please enter a city.");
          return;
        }
        try {
          const result = await getWeatherByCity(query);
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
        if ( weather.weather[0]?.main === "Rain" || weather.weather[0]?.main === "Mist" || weather.weather[0]?.main === "Drizzle") {
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

    const weatherType = () => {
      if (typeof weather.main !== "undefined" &&
          typeof weather.visibility !== "undefined" &&
          Array.isArray(weather.weather) && weather.weather.length > 0) {
          
          const mainWeather = weather.weather[0]?.main;
  
          const weatherIcons = {
              Rain: rainicon,
              Clouds: cloudy,
              Haze: haze,
              Mist: mist,
              Sunny: sunny,
              Drizzle: rainicon,
              Smoke: cloudy
          };
  
          return weatherIcons[mainWeather] || haze;
      }
  
      return haze;
  };
  

    const loadError = () => {
      if (typeof weather.cod !== "undefined" && weather.cod === "404" && weather.message === "city not found") {
        return <Error />;
      }else if( weather === null){

      }
      return null;
    }

    return (
    <div className='main-app'>
      <div className="nav-items">
            <div>
              <img className="logo" alt="logo" src={tablogo}/>
            </div>
            {/*  rel="noopener noreferrer" ----->attributes are important for security and performance reason */}
            <div>
              <button className="setting">
                <img className="img" alt="mode "src={settingicon}/>
              </button>
              <button  className="menu">
                <img  className="img" alt="menu "src={menuicon}/>
              </button>
            </div>

         </div>
    <div className={weatherConditions()}>
      <div className="main-container">

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
              <div className="locate">
                  <img className="location-img" alt="location" src={locationheader}/>
                <h2 className="india-text">India</h2>
              </div>
            </div>
            </div>
            <div className="sub-main">
            <div className = "search-bar">
              <input className="search-input" type = "text" placeholder={"Search . . ."} onChange={e => setQuery(e.target.value)} value={query} onKeyDown ={search}  />
          </div>
            {/* { loadError() || typeof weather.main === "undefined" ? (<Shimmer />) : ( */}
            {loading ? <Shimmer /> : (loadError() || (
            
             <div className= "data">
            <div className = "location">{"📌"} {weather.name}, {weather.sys?.country}</div>
            <div className="temp">  {Math.round(weather.main?.temp)}° C</div>
            <div className = "main-box">
            <div className='weather-container'>
                   <img className="weather-title-img" alt="weather" src={weatherType()}/>
                   <div className = "weather-title">Weather-type</div>
                   <div className = "main-data">{weather.weather?.[0]?.main}</div>
            </div>

            <div className="other-parameters">
            <div className="last-section-header">
                <div className='parameter-container'>
                <img className="title-img" alt="weather" src={visibility}/>
                    <div className = "title">Visibility</div>
                    <div className = "parameter-data">{weather.visibility} m</div>
                </div>
                <div className="vertical-line"></div>
                <div className='parameter-container'>
                <img className="title-img" alt="weather" src={humidity}/>
                    <div className= "title">Humidity</div>
                    <div className= "parameter-data">{weather.main?.humidity} %</div>
                </div>
                <div className="vertical-line"></div>
                <div className='parameter-container'>
                <img className="title-img" alt="weather" src={wind}/>
                    <div className= "title">Wind Speed</div>
                    <div className= "parameter-data">{weather.wind?.speed} km/h</div>
                </div>
            </div>
            {/* <div className="last-section">
              <div className = "parameter-data">{weather.visibility} m</div>
              <div className= "parameter-data">{weather.main?.humidity} %</div>
              <div className= "parameter-data">{weather.wind?.speed} Km/h</div>
            </div> */}
          </div>
          </div>
          </div>
            )
          )};
           </div>
          
      </main>
      </div>    
    </div>
    <div className="footer">
            {/*  rel="noopener noreferrer" ----->attributes are important for security and performance reason */}
            <h4>
            <a className="linkedin"
          href={`${linkedIn}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @alankrita.mohapatra {"(★‿★)"}
        </a>
        </h4>

          </div>
    </div>);
}

export default App;
