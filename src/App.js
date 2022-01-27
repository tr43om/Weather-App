import React, { useState } from "react";
import { getJSON, getWindDirection } from "./helpers";
import { API_URL, API_KEY, API_LANG } from "./config";

import City from "./components/City";
import Switch from "./components/Switch";
import Temperature from "./components/Temperature";
import Weather from "./components/Weather";
import Search from "./components/Search";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  let tempUnit = "metric";
  let isCelsius = true;

  const switchUnit = (e) => {
    const btnC = document.querySelector(".unit--celsius");
    const btnF = document.querySelector(".unit--fahrenheit");

    const clicked = e.target;

    if (clicked === btnC) {
      btnC.classList.add("unit--active");
      btnF.classList.remove("unit--active");
      isCelsius = true;
    }

    if (clicked === btnF) {
      btnF.classList.add("unit--active");
      btnC.classList.remove("unit--active");
      isCelsius = false;
    }

    tempUnit = clicked.dataset.fahrenheit ? "imperial" : "metric";
    update();
  };

  const update = async () => {
    const data = await getJSON(
      `${API_URL}forecast?q=${location}&cnt=3&units=${tempUnit}&appid=${API_KEY}&${API_LANG}`
    );

    setWeather(data);
  };

  const setWeather = (data, error) => {
    if (error) {
      setData({ error: error.error });
      return;
    }

    const list = data.list[1];
    const { name } = data.city;
    const temp = Math.round(list.main.temp);
    const description = `${list.weather[0].description
      .slice(0, 1)
      .toUpperCase()}${list.weather[0].description.slice(1)}`;
    const weather = list.weather[0].main;
    const clouds = list.clouds.all;
    const { humidity, pressure } = list.main;
    const { pop } = list;
    const wind = Math.round(list.wind.speed);
    const windDirection = getWindDirection(list.wind.deg);

    let url = setImage(weather, clouds);

    setData({
      name,
      temp,
      isCelsius,
      description,
      weather,
      url,
      pop,
      humidity,
      pressure,
      wind,
      windDirection,
      error: data.error,
    });

    console.log(data);
    setLocation(data.city.name);
  };

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude: lat, longitude: lon } = position.coords;

      const data = await getJSON(
        `${API_URL}forecast?lat=${lat}&lon=${lon}&cnt=3&units=${tempUnit}&appid=${API_KEY}&${API_LANG}`
      );

      setWeather(data);
    });
  };

  const setImage = function (weather, clouds) {
    let url = "";
    if (weather === "Rain") url = "img/rain.svg";
    if (weather === "Thunderstorm") url = "img/storm.svg";
    if (clouds < 10) url = "img/sun.svg";
    if (clouds > 10 && clouds < 50) url = "img/partlyCloudy.svg";
    if (clouds > 50) url = "img/cloud.svg";

    return url;
  };

  window.addEventListener("load", setCurrentLocation);

  const searchLocation = async (e) => {
    try {
      if (e.target.classList.contains("search__submit")) e.preventDefault();
      if (e.key === "Enter" || e.target.classList.contains("search__submit")) {
        const data = await getJSON(
          `${API_URL}forecast?q=${location}&cnt=3&units=${tempUnit}&appid=${API_KEY}&${API_LANG}`
        );

        setWeather({ ...data, error: false }, null);
        hideSearch();
      }
    } catch (error) {
      setWeather(null, { error: true });
      setLocation("");
    }
  };

  const showSearch = () => {
    const search = document.querySelector(".search");
    search.classList.remove("hidden");
    search.querySelector(".search__input").value = "";
  };

  const hideSearch = () => {
    const search = document.querySelector(".search");
    search.classList.add("hidden");
  };

  // document.addEventListener("click", (e) => {
  //   const btn = document.querySelector(".city__btn");
  //   const search = document.querySelector(".search__input");
  //   if (e.target != btn && e.target.parentNode != btn && e.target != search) {
  //     hideSearch();
  //   }
  //   console.log(e.target);
  // });

  return (
    <div className="app">
      <header className="header container">
        <Search
          setLocation={(e) => setLocation(e.target.value)}
          searchLocation={searchLocation}
          error={data.error}
        />
        <City
          city={data.name}
          showSearch={showSearch}
          setCurrentLocation={setCurrentLocation}
        />
        <Switch onSwitch={(e) => switchUnit(e)} />
      </header>
      <main className="main">
        <Temperature
          temp={data.temp}
          isCelsius={data.isCelsius}
          description={data.description}
          url={data.url}
        />
      </main>
      <footer className="footer container">
        <Weather
          pop={data.pop}
          humidity={data.humidity}
          pressure={data.pressure}
          wind={data.wind}
          windDirection={data.windDirection}
        />
      </footer>
    </div>
  );
}

export default App;
