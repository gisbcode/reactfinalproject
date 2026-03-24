import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    setLoaded(false);

    if (!props.coordinates) return;

    const apiKey = "22a8b6d46bced57bb018a83197efe51a";
    const lat = props.coordinates.lat;
    const lon = props.coordinates.lon;

    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.list);
    setLoaded(true);
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

  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  if (!props.coordinates) return null;
  if (!loaded) return <div>Loading forecast...</div>;

  const dailyForecast = forecast
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <div className="Forecast row">
      {dailyForecast.map((day, index) => (
        <div className="col" key={index}>
          <div className="Forecast-day">{formatDay(day.dt)}</div>

          <ReactAnimatedWeather
            icon={mapIcon(day.weather[0].icon)}
            size={40}
            animate={true}
          />
          <div className="Forecast-temp">
            <span className="Forecast-temp-max">
              {Math.round(day.temp.max)}°
            </span>
            <span className="Forecast-temp-min">
              {Math.round(day.temp.min)}°
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
