import React from "react";

const Temperature = ({ temp, isCelsius, description, url }) => {
  return (
    <div className="temperature">
      <div className="temperature__wrapper">
        <img src={url} alt="" className="temperature__image" />
        {temp && (
          <p className="temperature__number">
            {temp}
            {isCelsius ? "°" : "F"}
          </p>
        )}
      </div>

      <div className="temperature__description">{description}</div>
    </div>
  );
};

export default Temperature;
