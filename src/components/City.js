import React from "react";

const City = ({ city, showSearch, setCurrentLocation }) => {
  return (
    <div className="city">
      <h3 className="city__title">{city}</h3>
      <div className="city__btns">
        <button className="city__btn" onClick={showSearch}>
          Сменить город
        </button>
        <button
          className="city__btn city__btn--location"
          onClick={setCurrentLocation}
        >
          <svg
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.489 0.838191L0.238948 11.6268L8.72799 13.2769L13.2146 20.7637L17.489 0.838191Z"
              fill="white"
            />
          </svg>
          Мое местоположение
        </button>
      </div>
    </div>
  );
};

export default City;
