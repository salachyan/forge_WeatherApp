import React, { useEffect } from 'react'
const WeatherApp = () => {
  const [zipCode, setZipCode] = useState('')
  const[countryCode, setCountryCode] = userState('')
  const[weatherData,setWeatherData] = userState(null)
  const APIKey = '9a0b197658126f82b5abcbd8f4175867'
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const fetchData = async () => {
    if (zipCode && countryCode) {
        const apiKey = "9a0b197658126f82b5abcbd8f4175867";
        const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`;
        console.log(`Fetching data from: ${url}`);
        try {
            const result = await fetch(url);
            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }
            const resultJson = await result.json();
            console.log('Fetched data:', resultJson);
            setWeatherData(resultJson);

            // Extract latitude and longitude
            setLatitude(resultJson.lat);
            setLongitude(resultJson.lon);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        console.log('Zip Code and Country Code are required');
    }
};

useEffect(() => {
    const fetchHourlyWeatherData = async () => {
        if (latitude && longitude) {
            const apiKey = "9a0b197658126f82b5abcbd8f4175867";
            const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            console.log(`Fetching hourly weather data from: ${url}`);
            try {
                const result = await fetch(url);
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                const resultJson = await result.json();
                console.log('Fetched hourly weather data:', resultJson);
                setHourlyWeatherData(resultJson.list);
            } catch (error) {
                console.error('Error fetching hourly weather data:', error);
            }
        }
    };

    fetchHourlyWeatherData();
}, [latitude, longitude]);

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
                <h3>Location Data:</h3>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
            </div>
        )}
        {hourlyWeatherData && (
            <div>
                <h3>Hourly Weather Data:</h3>
                <ul>
                    {hourlyWeatherData.map((hour, index) => (
                        <li key={index}>
                            <p>Time: {new Date(hour.dt * 1000).toLocaleString()}</p>
                            <p>Temperature: {hour.main.temp} K</p>
                            <p>Weather: {hour.weather[0].description}</p>
                            <p>Humidity: {hour.main.humidity}%</p>
                            <p>Wind Speed: {hour.wind.speed} m/s</p>
                            <img 
                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} 
                                alt={hour.weather[0].description} 
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);
};


export default WeatherApp
