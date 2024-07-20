const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/";


export const getWeatherCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(`${baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getWeatherByCity = async (city) => {
  try {
    const response = await fetch(`${baseUrl}weather?q=${city}&units=metric&APPID=${apiKey}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getWeatherByTime = async (city) => {
  try {
    const response = await fetch(`${baseUrl}forecast?q=${city}&appid=${apiKey}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getDailyweather= async (latitude,longitude) => {
  try {
    const response = await fetch(`${baseUrl}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};