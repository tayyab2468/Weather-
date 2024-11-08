import React, { useState } from 'react';
import './style.css';

function App() {
    const [cityname, setCityName] = useState('');
    const [currentWeather, setCurrentWeather] = useState('');
    const [humidity, setHumidity] = useState(''); 
    const [cloudCoverage, setCloudCoverage] = useState(''); 
    const [feelsLike, setFeelsLike] = useState('');
    const [weatherDescription, setWeatherDescription] = useState(''); 
    const [weatherIcon, setWeatherIcon] = useState('');
   
    const [dataFetched, setDataFetched] = useState(false);

    const handleCityNameChange = (event) => {
        setCityName(event.target.value);
    };

    const handleSearch = async () => {
        if (cityname.trim() === "") {
            alert("Please enter a valid city name");
            return;
        }

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ef12d4dec1a54dca938122851242208&q=${cityname}`);
            const data = await response.json();

            setCurrentWeather(data.current.temp_c);
            setHumidity(data.current.humidity);
            setCloudCoverage(data.current.cloud);
            setFeelsLike(data.current.feelslike_c);
            setWeatherDescription(data.current.condition.text);
            setWeatherIcon(data.current.condition.icon);
           
            setDataFetched(true);  // Set dataFetched to true after successful fetch
        } catch (error) {
            console.error("Error fetching the weather data: ", error);
            alert("Could not fetch weather data. Please try again.");
            setDataFetched(false);  // Reset dataFetched on error
        }
    };

    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="search-box">
                <i className="bx bxs-map"></i>
                <input 
                    type="text" 
                    placeholder="Enter your Location" 
                    value={cityname}
                    onChange={handleCityNameChange} 
                />
                <button className="bx bx-search" onClick={handleSearch}></button>
            </div>

            {dataFetched ? (
                <div>
                    <div className="weather-box">
                        <div className="box">
                            <div className="info-weather">
                                <div className="weather">
                                    <img src={weatherIcon} alt="Weather icon" className="weather-box" />
                                    <p className="temperature">{currentWeather} <span>°C</span></p>
                                    <p className="description">{weatherDescription}</p>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="weather-details">
                        <div className="humidity">
                            <i className="bx bx-water"></i>
                            <div className="text">
                                <div className="info-humidity">
                                    <span>{humidity}%</span>
                                </div>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div className="wind">
                            <i className="bx bx-wind"></i>
                            <div className="text">
                                <div className="info-wind">
                                    <span>{feelsLike} <span>°C</span></span>
                                </div>
                                <p>Feels Like</p>
                            </div>
                        </div>

                        <div className="cloud-cover">
                            <i className="bx bx-cloud"></i>
                            <div className="text">
                                <div className="info-cloud">
                                    <span>{cloudCoverage}%</span>
                                </div>
                                <p>Cloud Coverage</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Please enter  City name to Check Latest Weather.</p>  // Placeholder message
            )}
        </div>
    );
}

export default App;
