import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const details = {
      access_key: api_key,
      query: capital,
    };
    console.log("ww", api_key);
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`
      )
      .then((response) => {
        console.log("WEE", response.data);
        setWeather(response.data);
      });
  }, [capital, api_key]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      {weather && (
        <div>
          <p>Temperature {weather.current.temp_c} Celcius</p>
          <img alt="weather icon" src={weather.current.condition.icon} />
          <p>Wind {weather.current.wind_mph / 2.237} m\s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
