import React, { useState, useEffect } from 'react';
import './CardCarousel.css';
import KoreaIMG from './img/korea.png';
import FranceIMG from './img/france.png';
import JapanIMG from './img/japan.png';
import USAIMG from './img/usa.png';
import CustomDate from './CustomDate'; // CustomDate 컴포넌트 임포트

const CardCarousel = ({ currentLocation, paris, tokyo, seoul, newYork, selectedCity, handleCityChange }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const cities = ['current', 'paris', 'tokyo', 'seoul', 'new york'];

  const getCountryImage = (city) => {
    switch(city.toLowerCase()) {
      case 'paris': return FranceIMG;
      case 'tokyo': return JapanIMG;
      case 'seoul': return KoreaIMG;
      case 'new york': return USAIMG;
      case 'current': return KoreaIMG;
      default: return '';
    }
  };

  const getCountryName = (city) => {
    switch(city.toLowerCase()) {
      case 'paris': return 'France';
      case 'tokyo': return 'Japan';
      case 'seoul': return 'Korea';
      case 'new york': return 'USA';
      case 'current': return 'Korea';
      default: return '';
    }
  };

  const getBackgroundColor = (temp) => {
    if (temp >= 27) {
      return 'linear-gradient(to bottom, #FFDD44, #FF4E50)';
    } else if (temp <= 24) {
      return 'linear-gradient(to bottom, #4A69BD, #9B4F96)';
    } else {
      return 'linear-gradient(to bottom, #12adfd, #1069f3)';
    }
  };

  const renderCardContent = (location, cityName) => {
    if (!location) return 'Loading...';
    
    const icon = location.weather[0].icon;
    return (
      <div className="card-content">
        <h2>🌍{location.name}</h2>
        <hr color="white" />
        <div className="location-icon">
          <img src={getCountryImage(cityName)} alt={`${cityName} flag`} />
          <span>{getCountryName(cityName)}</span>
        </div>
        <div className="weather-info">
          <div className="weather-icon">
            <img className="img-fluid" src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt="Weather icon" />
          </div>
          <div className="temperature">
            <p className="temp">{location.main.temp}°C</p>
          </div>
          <div className="weather-condition">
            <p>{location.weather[0].main}</p>
          </div>
        </div>
        <div className="date">
          <CustomDate />
        </div>
        <hr color="white" />
        <div className="additional-info">
          <div className="info-item">
            🌡<br />
            🔻{location.main.temp_min}°C<br />
            🔺{location.main.temp_max}°C
          </div>
          <div className="info-item">
            💧<br />
            {location.main.humidity}%<br />
            Humidity
          </div>
          <div className="info-item">
            💨<br />
            {location.wind.speed} m/s<br />
            Wind
          </div>
        </div>
      </div>
    );
  };

  const cards = [
    { id: 0, content: renderCardContent(currentLocation, 'current') },
    { id: 1, content: renderCardContent(paris, 'paris') },
    { id: 2, content: renderCardContent(tokyo, 'tokyo') },
    { id: 3, content: renderCardContent(seoul, 'seoul') },
    { id: 4, content: renderCardContent(newYork, 'new york') }
  ];

  useEffect(() => {
    const cityIndex = cities.indexOf(selectedCity);
    setCurrentCard(cityIndex !== -1 ? cityIndex : 0);
  }, [selectedCity, currentLocation, paris, tokyo, seoul, newYork]);

  const handleNext = () => {
    const nextCard = (currentCard + 1) % cards.length;
    setCurrentCard(nextCard);
    handleCityChange(cities[nextCard]);
  };

  const handlePrev = () => {
    const prevCard = (currentCard - 1 + cards.length) % cards.length;
    setCurrentCard(prevCard);
    handleCityChange(cities[prevCard]);
  };

  return (
    <div className="carousel-container">
      <div className="carousel" style={{ transform: `rotateY(${currentCard * -72}deg)` }}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`carousel-card ${index === currentCard ? 'active' : ''}`}
            style={{
              transform: `rotateY(${index * 72}deg) translateZ(250px)`,
              background: getBackgroundColor(index === 0 ? currentLocation?.main.temp : index === 1 ? paris?.main.temp : index === 2 ? tokyo?.main.temp : index === 3 ? seoul?.main.temp : newYork?.main.temp),
            }}
          >
            {card.content}
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="carousel-button prev"><span>Prev</span></button>
      <button onClick={handleNext} className="carousel-button next"><span>Next</span></button>
    </div>
  );
};

export default CardCarousel;
