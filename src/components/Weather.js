import React from "react";

const Weather = ({ pop, humidity, pressure, wind, windDirection }) => {
  return (
    <div className="weather">
      <div className="weather__wind">
        <h3 className="weather__title">Ветер</h3>
        {wind && windDirection && (
          <p className="weather__info">
            {wind} м/с, {windDirection}
          </p>
        )}
      </div>
      <div className="weather__pressure">
        <h3 className="weather__title">Давление</h3>
        {pressure && <p className="weather__info">{pressure} мм рт. ст.</p>}
      </div>
      <div className="weather__humidity">
        <h3 className="weather__title">Влажность</h3>
        {humidity && <p className="weather__info">{humidity}%</p>}
      </div>
      <div className="weather__pop">
        <h3 className="weather__title">Вероятность осадков</h3>
        {wind && <p className="weather__info">{pop} %</p>}
      </div>
    </div>
  );
};

export default Weather;
