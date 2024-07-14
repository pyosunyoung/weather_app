import React, { useState } from 'react';
import Logo from './img/logo.png';
import './Header.css';

const Header = ({ handleCityChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    handleCityChange(searchQuery.toLowerCase());
    setSearchQuery(''); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <header className="header">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search city..."
            style={{ color: 'black' }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
