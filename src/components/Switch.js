import React from "react";

const Switch = ({ onSwitch }) => {
  return (
    <div className="units">
      <div className="units__wrapper">
        <button
          data-celsius
          onClick={onSwitch}
          className="unit unit--celsius unit--active"
        >
          C
        </button>
        <button
          data-fahrenheit
          onClick={onSwitch}
          className="unit unit--fahrenheit"
        >
          F
        </button>
      </div>
    </div>
  );
};

export default Switch;
