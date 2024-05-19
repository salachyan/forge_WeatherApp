import React, { useEffect } from 'react'
const WeatherApp = () => {
  const [zipCode, setZipCode] = useState('')
  const[countryCode, setCountryCode] = userState('')
  const[weatherData,setWeatherData] = userState(null)
  const APIKey = '9a0b197658126f82b5abcbd8f4175867'

  useEffect(() => {
    const fetchData = async () => {
      if(zipCode && countryCode){
        const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`; 
      try{
        const result = await fetch(url)
        const resultJson = await result.json()
        setWeatherData(resultJson)
      } catch{
        console.error('Error fetching Data: ' ,error)
      }
    }
  }; fetchData();
  }, [zipCode, countryCode]);

  return (
    <div>
        <input 
            type="text" 
            placeholder="Zip Code" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
        />
        <input 
            type="text" 
            placeholder="Country Code" 
            value={countryCode} 
            onChange={(e) => setCountryCode(e.target.value)} 
        />
        <button onClick={fetchData}>Fetch Weather</button>
        {weatherData && (
            <div>
                <h3>Weather Data:</h3>
                <pre>{JSON.stringify(weatherData, null, 2)}</pre>
            </div>
        )}
    </div>
);
};

export default WeatherApp
