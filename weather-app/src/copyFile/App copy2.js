import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';
import CardCarousel from '../CardCarousel';
import WeatherButton from '../component/WeatherButton'

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [paris, setParis] = useState(null);
  const [tokyo, setTokyo] = useState(null);
  const [seoul, setSeoul] = useState(null);
  const [newYork, setNewYork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const [city, setCity] = useState('current');
  const cities = ['paris', 'tokyo', 'seoul', 'new york'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f6e83c39a12dd8b274471ddd1856e8a4&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setCurrentLocation(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async (city) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6e83c39a12dd8b274471ddd1856e8a4&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === 'current') {
      getCurrentLocation();
    } else {
      getWeatherByCity(city).then(data => {
        if (city === 'paris') {
          setParis(data);
        } else if (city === 'tokyo') {
          setTokyo(data);
        } else if (city === 'seoul') {
          setSeoul(data);
        } else if (city === 'new york') {
          setNewYork(data);
        }
      });
    }
  }, [city]);

  const handleCityChange = (city) => {
    setCity(city);
  };

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : !apiError ? (
        <div className="container">
          <CardCarousel
            currentLocation={currentLocation}
            paris={paris}
            tokyo={tokyo}
            seoul={seoul}
            newYork={newYork}
            selectedCity={city}
            handleCityChange={handleCityChange}
          />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
