import React from 'react'

const WeatherBox = ({weather}) => {
  console.log(weather);

  return (
    <div className='weather-box'>
      <div>{weather?.name}</div> 
      <h2>{weather?.main.temp}/{"230화씨"}</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
} // {weather?.name}는 weather && weather.name 이것과 같은 역할 weather값이 존재하면 보여줘라
//저거 조건식 안할때 에러가 난이유 useEffect는 render가 된 이후에 적용됨 즉 ui가 그려진 후에 적용됨
// ui그릴 때 당시에는 초기값이 null이지 그치 render인 ui를 그려주고 useEffect로 api정보를 가져오니까
// 그래서 조건식으로 data api 정보 즉 weather 정보가 존재하면 가져와라 이런 느낌 
export default WeatherBox
