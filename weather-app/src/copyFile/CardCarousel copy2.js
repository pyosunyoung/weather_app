import React, { useState, useEffect } from 'react';
import './CardCarousel.css';

const CardCarousel = ({ currentLocation, paris, tokyo, seoul, newYork, selectedCity, handleCityChange }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const cities = ['current', 'paris', 'tokyo', 'seoul', 'new york'];

  const cards = [
    { id: 0, content: currentLocation ? `${currentLocation.name}: ${currentLocation.main.temp}°C` : 'Loading...' },
    { id: 1, content: paris ? `${paris.name}: ${paris.main.temp}°C` : 'Loading...' },
    { id: 2, content: tokyo ? `${tokyo.name}: ${tokyo.main.temp}°C` : 'Loading...' },
    { id: 3, content: seoul ? `${seoul.name}: ${seoul.main.temp}°C` : 'Loading...' },
    { id: 4, content: newYork ? `${newYork.name}: ${newYork.main.temp}°C` : 'Loading...' }
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
              transform: `rotateY(${index * 72}deg) translateZ(250px)`
            }}
          >
            {card.content}
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="carousel-button prev">Prev</button>
      <button onClick={handleNext} className="carousel-button next">Next</button>
    </div>
  );
};

export default CardCarousel;
