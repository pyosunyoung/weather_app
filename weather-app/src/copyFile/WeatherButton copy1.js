import React from 'react'
import { Button } from 'react-bootstrap';
import './WeatherButton.css'
const WeatherButton = ({cities, handleCityChange,selectedCity}) => {
  
  // const [weather, setWeather] = useState(null)
  // // console.log("cities", cities);

  // const onClick = (e) => {
  //   setCountry(e.target.value)
  //   getWeatherByCountry(country);
  // }
  // const getWeatherByCountry = async(cityName) => {
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f6e83c39a12dd8b274471ddd1856e8a4&units=metric`
  //   let response = await fetch(url)
  //   let data = await response.json();
  //   setWeather(data);
  // }

 //selectedCity === null => current 이부분 변경
  return (
    <div className='WeatherButton'>
      
      <Button 
      variant={selectedCity === null ? "light" : "outline-light"} // selectedCity에 아무것도 안들어있다면 현재위치 가리키는 것 그래서 색깔 변경가능
      onClick={() => {handleCityChange("current");

      }}
      >Current Location</Button>
      
      {cities.map((city)=> (
        <Button 
        variant= {selectedCity === city ? "light" : "outline-light"} // selectedCity에는 setCity에서 클릭된 item값이 들어감, 그래서 selectedcity에 값과 map에서 표출하는 값과 같다면 색깔 변경
        onClick={()=> {handleCityChange(city);
          
        }} // 버튼 클릭시 시티정보를 함수에 넣어줌 그래서 app.js에있는 city정보가 바뀜
        
        >{city}</Button>
      )) }
      
    </div>
  );
};

export default WeatherButton
