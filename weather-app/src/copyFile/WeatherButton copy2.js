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
        Current Location
      </Button>

      {cities.map((city) => (
        <Button
          key={city}
          variant={selectedCity === city ? "light" : "outline-light"}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
