import React from 'react';
import { Button } from 'react-bootstrap';
import './WeatherButton.css';

const WeatherButton = ({ cities, handleCityChange, selectedCity }) => {
  return (
    <div className='WeatherButton'>
      <Button
        variant={selectedCity === 'current' ? "light" : "outline-light"}
        onClick={() => handleCityChange("current")}
      >
        🚩
      </Button>

      {cities.map((city) => (
        <Button
          key={city}
          variant={selectedCity === city ? "light" : "outline-light"}
          onClick={() => handleCityChange(city)}
        >
          {city.charAt(0).toUpperCase() + city.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
