import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from '../component/WeatherBox';
import WeatherButton from '../component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';
import CardCarousel from '../CardCarousel';

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다. => 실행되자마자? useEffect 구현
// 2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태 정보가 보인다.
// 3. 5개의 버튼이 있다(구성 1개는 현재위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할때 마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너 도는 기능 구현.
// 과제 : 

function App() {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [paris, setParis] = useState(null)
  const [tokyo, setTokyo] = useState(null)
  const [seoul, setSeoul] = useState(null)
  const [newYork, setNewYork]  = useState(null)
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const cities = ['paris', 'tokyo', 'seoul', 'new york'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f6e83c39a12dd8b274471ddd1856e8a4&units=metric`;
    setLoading(true);
    let response = await fetch(url); // url데이터를 가져올 때 까지 기다렸다가 response에 넣어줘라
    let data = await response.json();
    // setWeather(data);
    setCurrentLocation(data);
    setLoading(false);
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };
  const getWeatherByCity = async (city) => {
    try{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6e83c39a12dd8b274471ddd1856e8a4&units=metric`;
    setLoading(true); // api 가져오기전에는 로딩스피너 보여줌
    let response = await fetch(url);
    let data = await response.json();
    setLoading(false); // api 모두 가져오면 로딩스피너 종료
    return data;
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => { // 이부분 변경
    if (city === null) {
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
 //// 이파트가 중복되어서 오류 발생한듯?
  const handleCityChange = (city) => { 
    if(city === "current") {
      setCity(null);
    } else {
      setCity(city);
      
    }
    
  }
  



  
  // 1. useEffect(() => {
  //   getCurrentLocation();// 현재 위치 가져오는 함수
  //   getWeatherByCity()
  // }, [city]) // array에 아무것도 없다면 render 후 componentDidmount로 실행됨
  // 2. useEffect(() => {
  //   getWeatherByCity()
  // }, [city]) // city값 바뀌는지 확인,
  //적용 방식 : 1.render(여기서 setCity값이 바뀌고) =>
  // 2.[city]값이 바뀌었다면 useEffect실행해서 이 함수에 버튼 눌렀을 떄 city값이 들어가는 구조

  // useEffect 실행 방식 : 1.ui가 그려졌을 떄 2. 배열안 값 바뀌었을 떄
  // 이렇게 했을 때 에러가 나는 이유가 처음에 앱 실행할 때 첫번째 useEffect실행됨 그리고
  //getCurrentLocation();실행디 외겠지 그리고 나서 또 두번째 useEffect실행됨 getWeatherByCity() 실행됨
  // 그래서 weatehrBycity에는 city state에 '' 빈 문자열이 들어가있어서 그런것 즉 city에 "" 빈 문자열이 들어가게됨
  // 그래서 useEffect를 한개로 합쳐야 함 즉 맨 처음 앱이 실행되었을 때 getCurrentLocation();는 실행되어야하고
  // getWeatherByCity()는 실행이 되어지면 안됨 즉 상황에 맞춰서 두 함수를 실행해야 함
  //
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
          />{' '}
        </div>
      ) : !apiError ? (
        <div className="container">
          <CardCarousel  currentLocation={currentLocation} paris={paris} tokyo={tokyo} seoul={seoul} newYork={newYork} selectedCity={city} handleCityChange={handleCityChange}/>
          <WeatherButton cities={cities}  handleCityChange={handleCityChange} selectedCity={city} />
          
        </div>
      ) : (
        apiError
      )}
    </div> // loading이 true일땐 즉 아직 api가져오지 않았을 땐 로딩스피너를 표출하고 false라면 다시 박스 표출해주자
  ); // state setCity를 보내줌 함수도 props로 보내줄 수 있음 즉 city값이 바뀌는 거겠지?
}

export default App;

//나는 다른나라 정보 api를 가져오는건 성공했지만 버튼을 눌렀을 떄 적용되긴 했지만 api가 늦게 적용되었다.
// 그래서 useEffect로 설정해서 오류를 해결하려했지만 여기서 오류가 났고 weatherbox도 두개가 만들어야 적용되는 어려움 발생
// 기가막히게 누님이 내가 막힌부분을 알려줌 밑에 설명 => 해결방안 모든 것을 app에서 state를 설정해야 했다.

//          app (weather) : 부모


// weatherBox   weatherButton (city weather data) : 자식

// (city weather data)를 weatherBox로 전달해야하는데 어케함?
// 근데 weatherbox와 weatherButton의 연결고리는 없음

// 부모가 자식한테 props를 넘겨줄 수 있지만 자식이 부모한테 props를 넘겨줄 수 는 없음

// 부모가 모든 함수와 state를 가지고 있음, 자식한테 넘겨주는 props 그리고 그것을 업데이트 하는 함수들 까지
// 전부 app 함수에 설정해놓고 자식들에게 넘겨놓는다.
//  즉 앱이 모든 것을 가지고 있고 모든 정보들을 자식들에게 넘겨줘야한다.
// 함수도 props로 보내줄 수 있다.
