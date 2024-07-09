import React, { useState } from 'react';
import './CardCarousel.css';

const CardCarousel = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    { id: 1, content: 'Card 1' },
    { id: 2, content: 'Card 2' },
    { id: 3, content: 'Card 3' },
    { id: 4, content: 'Card 4' },
    { id: 5, content: 'Card 5' }
  ];

  const handleNext = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCard((prevCard) => (prevCard - 1 + cards.length) % cards.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`carousel-card ${index === currentCard ? 'active' : ''}`}
            style={{
              transform: `rotateY(${(index - currentCard) * 72}deg) translateZ(250px)`
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
