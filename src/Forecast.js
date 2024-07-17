import React from 'react';
import {ICON} from "./utils/constants";

const Forecast = ({ dailyForecast }) => {
  if (!dailyForecast) {
    return null; 
  }


  const currentTime = new Date().getTime();

  const nextFiveHourlyForecasts = dailyForecast.filter((forecast) => {
    return new Date(forecast.dt_txt).getTime() >= currentTime;
  }).slice(0, 5); 

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15); 
  };

  const getDailyForecasts = () => {
    const dailyForecasts = {};
    dailyForecast.forEach((forecast) => {
      const forecastDate = new Date(forecast.dt_txt);
      const date = forecastDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        weekday: 'short'
      });

      if (forecastDate > new Date()) {
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = forecast;
        }
      }
    });
    return Object.values(dailyForecasts).slice(0, 5); 
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="forecast-container">
      <div>
        <p className="title-forecast">HOURLY FORECAST</p>
        <hr className="horizontal-line" />
        <div className="scrollable-container">
          {nextFiveHourlyForecasts.map((forecast, index) => (
            <div key={index} className="datewise-data">
              <p className='w-time'>{new Date(forecast.dt_txt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <img className="w-icon" alt="icon" src={ ICON + forecast.weather[0].icon + ".png"}  /> 
              <p className='w-temp'>{kelvinToCelsius(forecast.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <p className="title-forecast">DAILY FORECAST</p>
        <hr className="horizontal-line" />
        <div className="scrollable-container">
          {dailyForecasts.map((forecast, index) => (
            <div key={index} className="datewise-data">
              <p className='w-date'>{new Date(forecast.dt_txt).toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}</p>
              <img className="w-icon" alt="icon" src={ ICON + forecast.weather[0].icon + ".png"} />
              <p className='w-temp'>{kelvinToCelsius(forecast.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
