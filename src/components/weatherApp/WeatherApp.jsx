import React, { useState, useEffect } from "react";
import "../weatherApp/WeatherApp.css";

import seaech_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import humidity_icon from "../../assets/humidity.png";

function WeatherApp() {
  const api_key = "9b188c61e354bec3db90500c9ea4aa02";

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let data; // Define data here

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json(); // Assign the result to data here
    } catch (error) {
      console.error("An error occurred:", error);
    }

    const humidity = document.getElementsByClassName("humidity-pecentage");
    const wind = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temp[0].innerHTML = data.main.temp + " °c";
    location[0].innerHTML = data.name;

    element[0].value = "";

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  //local  time section

  const [localDateTime, setLocalDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalDateTime(new Date());
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedLocalDate = localDateTime.toLocaleDateString(
    "en-US",
    dateOptions
  );
  const formattedLocalTime = localDateTime.toLocaleTimeString(
    "en-US",
    timeOptions
  );

  return (
    <div className="section">
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="search" />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={seaech_icon} alt="search" />
          </div>
        </div>
        <div className="weather-img">
          <img src={wicon} alt="cloud" />
        </div>
        <div className="weather-temp">24.5°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="humi" className="icon" />
            <div className="data">
              <div className="humidity-pecentage">65 %</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="wind" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="local-timezone">
        <div className="local-time">
          <h3>Local Time:</h3>
          <p>{formattedLocalTime}</p>
        </div>
        <div className="local-date">
          <h3>Local Date:</h3>
          <p>{formattedLocalDate}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
