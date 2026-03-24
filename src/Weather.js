import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import ReactAnimatedWeather from "react-animated-weather";

export default function Weather() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState({ ready: false });

  function handleResponse(response) {
    setWeather({
      ready: true,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
      coordinates: response.data.coord,
    });
  }

  function search() {
    const apiKey = "22a8b6d46bced57bb018a83197efe51a";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function mapIcon(iconCode) {
    const iconMap = {
      "01d": "CLEAR_DAY",
      "01n": "CLEAR_NIGHT",
      "02d": "PARTLY_CLOUDY_DAY",
      "02n": "PARTLY_CLOUDY_NIGHT",
      "03d": "CLOUDY",
      "03n": "CLOUDY",
      "04d": "CLOUDY",
      "04n": "CLOUDY",
      "09d": "RAIN",
      "09n": "RAIN",
      "10d": "RAIN",
      "10n": "RAIN",
      "11d": "RAIN",
      "11n": "RAIN",
      "13d": "SNOW",
      "13n": "SNOW",
      "50d": "FOG",
      "50n": "FOG",
    };

    return iconMap[iconCode] || "CLEAR_DAY";
  }

  function formatDate() {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${days[now.getDay()]} ${hours}:${minutes}`;
  }

  if (!weather.ready) {
    return <div className="Weather">Loading...</div>;
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={city}
          onChange={handleCityChange}
          placeholder="Search city..."
          className="Weather-search-input"
          autoFocus="on"
        />
        <button type="submit" className="Weather-search-button">
          Search
        </button>
      </form>

      <div className="Weather-top">
        <h1>{weather.city}</h1>
        <div className="Weather-date">{formatDate()}</div>
      </div>

      <div className="Weather-center">
        <ReactAnimatedWeather
          icon={mapIcon(weather.icon)}
          color="#315efb"
          size={92}
          animate={true}
        />
        <div className="Weather-temperature">{weather.temperature}°</div>
        <div className="Weather-description">{weather.description}</div>
      </div>

      <div className="Weather-details">
        <div className="Weather-detail-card">
          <div className="Weather-detail-label">Humidity</div>
          <div className="Weather-detail-value">{weather.humidity}%</div>
        </div>

        <div className="Weather-detail-card">
          <div className="Weather-detail-label">Wind</div>
          <div className="Weather-detail-value">{weather.wind} km/h</div>
        </div>
      </div>

      <WeatherForecast coordinates={weather.coordinates} />
    </div>
  );
}
