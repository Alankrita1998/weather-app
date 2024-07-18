import "./App.css";
import cloudy from "./assests/cloudy.png";
import sunny from "./assests/sunny.png";
import rainicon from "./assests/rainicon.jpg";
import mist from "./assests/mist.png";
import React, { useState, useEffect } from "react";
import useDatePicker from "./useDatePicker";
import locationheader from "./assests/locationheader.jpg";
import datetime from "./assests/datetime.png";
import haze from "./assests/haze.png";
import humidity from "./assests/humidity.jpg";
import visibility from "./assests/visibility.jpg";
import wind from "./assests/wind.jpg";
import Shimmer from "./Shimmer";
import Error from "./Error";
// import pressure from "./assests/pressure.png";
import tablogo from "./assests/tablogo.jpg";
import Forecast from './Forecast';
import { getWeatherCoordinates, getWeatherByCity ,getDailyweather,getWeatherByTime} from "./api/weatherApi";

const linkedIn = process.env.REACT_APP_LINKEDIN;
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const { date, time } = useDatePicker();
  const [loading, setLoading] = useState(true);
  const [dailyForecast, setDailyForecast] = useState([]);
  

    useEffect(() => {
      const timer = setTimeout(() => {
        navigator.geolocation.getCurrentPosition (async position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
      try {
        // const position = await getCurrentPosition();
        // const latitude = position.coords.latitude;
        // const longitude = position.coords.longitude;

        const weatherData = await getWeatherCoordinates(latitude, longitude);
        setWeather(weatherData);
        
        const dailyForecastData = await getDailyweather(latitude, longitude);
        setDailyForecast(dailyForecastData.list);

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


  // const getCurrentPosition = () => {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(resolve, reject);
  //   });
  // };  
  
  const fetchWeatherForBangalore = async () => {
    try {
      const result = await getWeatherByCity("Bangalore");
      setWeather(result);
      setLoading(false);
      try {
        // const position = await getCurrentPosition();
        // const { latitude, longitude } = position.coords;
        const dailyForecastData = await getWeatherByTime("Bangalore");
        setDailyForecast(dailyForecastData.list);
    } catch(error){
      setDailyForecast({ cod: 404, message: "city not found" });
      setLoading(true);
    }
    } catch (error) {
      setWeather({ cod: 404, message: "city not found" });
      setLoading(false);
    }
  };

  // const fetchWeatherByTime = async () => {
  //   try {
  //     const result = await getWeatherByTime("Bangalore");
  //     // setWeather(result);
  //     console.log(result);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
    

  const search = async (evt) => {
    if (evt.key === "Enter") {
      if (query.trim() === "") {
        alert("Please enter a city.");
        return;
      }
      try {
        const result = await getWeatherByCity(query);
        setWeather(result);
        setQuery("");
        try {
            // const position = await getCurrentPosition();
            // const { latitude, longitude } = position.coords;
            const dailyForecastData = await getWeatherByTime(query);
            setDailyForecast(dailyForecastData.list);
        } catch(error){
          setDailyForecast({ cod: 404, message: "city not found" });
          setLoading(true);
        }
      } catch (error) {
        setWeather({ cod: 404, message: "city not found" });
        setLoading(true);
      }
    }
  };

  const weatherConditions = () => {
    if (
      typeof weather.main !== "undefined" &&
      typeof weather.visibility !== "undefined" &&
      typeof weather.weather !== "undefined" &&
      weather.weather.length > 0
    ) {
      if (
        weather.weather[0]?.main === "Rain" ||
        weather.weather[0]?.main === "Mist" ||
        weather.weather[0]?.main === "Drizzle" ||
        weather.weather[0]?.main === "Thunderstorm"
      ) {
        return "app-rain";
      } else {
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 18) {
          return "app-warm";
        } else {
          return "app";
        }
      }
    }
    return "app";
  };

  const weatherType = () => {
    if (
      typeof weather.main !== "undefined" &&
      typeof weather.visibility !== "undefined" &&
      Array.isArray(weather.weather) &&
      weather.weather.length > 0
    ) {
      const mainWeather = weather.weather[0]?.main;

      const weatherIcons = {
        Rain: rainicon,
        Clouds: cloudy,
        Haze: haze,
        Mist: mist,
        Sunny: sunny,
        Drizzle: rainicon,
        Smoke: cloudy,
        Thunderstorm: rainicon,
      };

      return weatherIcons[mainWeather] || haze;
    }

    return haze;
  };

  const loadError = () => {
    if (
      typeof weather.cod !== "undefined" &&
      weather.cod === "404" &&
      weather.message === "city not found"
    ) {
      return <Error />;
    } else if (weather === null) {
    }
    return null;
  };

  return (
    <div className="main-app">
      <div className="nav-items">
        <div className="logo-container">
          <img className="logo" alt="logo" src={tablogo} />
          <div style={{ color: "lightgrey", fontFamily:"fantasy",fontWeight: "lighter" }}>
            SkyCast
          </div>
        </div>
        {/*  rel="noopener noreferrer" ----->attributes are important for security and performance reason */}
      </div>
      <div className={weatherConditions()}>
        <div className="main-container">
          {/* <main> : it helps improve both SEO and website accessibility by clearly defining where the main content begins. This makes it easier for search engine algorithms an  d screen readers to interpret your site. */}
          <main>
            <div className="header">
              <div className="header-left">
                <div>
                  <img
                    className="datetime-img"
                    alt="datetime "
                    src={datetime}
                  />
                </div>
                <div className="datetime">
                  <div className="date">{date}</div>
                  <div className="time">{time}</div>
                </div>
              </div>

              <div className="header-right">
                <div className="locate">
                  <img
                    className="location-img"
                    alt="location"
                    src={locationheader}
                  />
                  <h2 className="india-text">India</h2>
                </div>
              </div>
            </div>
            <div className="sub-main">
              <div className="search-bar">
                <input
                  className="search-input"
                  type="text"
                  placeholder={"Search . . ."}
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyDown={search}
                />
              </div>
              {/* { loadError() || typeof weather.main === "undefined" ? (<Shimmer />) : ( */}
              {loading ? (
                <Shimmer />
              ) : (
                loadError() || (
                  <div>
                    <div className="data">
                      <div className="location">
                        {"📌"} {weather.name}, {weather.sys?.country}
                      </div>
                      <div className="temp">
                        {" "}
                        {Math.round(weather.main?.temp)}° C
                      </div>
                      <div className="main-box">
                        <div className="weather-container">
                          <img
                            className="weather-title-img"
                            alt="weather"
                            src={weatherType()}
                          />
                          <div className="weather-title">Weather-type</div>
                          <div className="main-data">
                            {weather.weather?.[0]?.main}
                          </div>
                        </div>
                        <div className="other-parameters">
                          <div className="last-section-header">
                            <div className="parameter-container">
                              <img
                                className="title-img"
                                alt="weather"
                                src={humidity}
                              />
                              <div className="title">Humidity</div>
                              <div className="parameter-data">
                                {weather.main?.humidity} %
                              </div>
                            </div>
                            {/* <div className="vertical-line"></div> */}
                            <div className="parameter-container">
                              <img
                                className="title-img"
                                alt="weather"
                                src={wind}
                              />
                              <div className="title">Wind</div>
                              <div className="parameter-data">
                                {weather.wind?.speed} km/h
                              </div>
                            </div>
                            <div className="parameter-container">
                              <img
                                className="title-img"
                                alt="weather"
                                src={visibility}
                              />
                              <div className="title">Visibility</div>
                              <div className="parameter-data">
                                {weather.visibility} ml
                              </div>
                            </div>
                            {/* <div className="parameter-container">
                              <img
                                className="title-img"
                                alt="weather"
                                src={pressure}
                              />
                              <div className="title">Pressure</div>
                              <div className="parameter-data">
                                {weather.main?.pressure} hPa
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Forecast dailyForecast={dailyForecast} />
                  </div>
                )
              )}
              ;
            </div>
          </main>
        </div>
      </div>
      <div className="footer">
        {/*  rel="noopener noreferrer" ----->attributes are important for security and performance reason */}
        <h4>
          <a
            className="linkedin"
            href={`${linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @alankrita.mohapatra {"(★‿★)"}
          </a>
        </h4>
      </div>
    </div>
  );
}

export default App;
