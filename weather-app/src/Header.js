import React, { useState } from 'react';
import Logo from './img/logo.png';
import './Header.css'; // CSS 파일 임포트

const Header = ({ handleCityChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    handleCityChange(searchQuery);
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
            placeholder="Search city..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
    </div>
  );
};

export default Header;