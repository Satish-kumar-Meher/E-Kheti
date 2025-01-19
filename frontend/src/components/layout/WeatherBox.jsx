
import React from 'react'
import "../../css/weather.css";
import "./selectcrops.css";
import { useLocation } from 'react-router-dom';
function WeatherBox() {
    const location = useLocation();
    const { weatherData, fiveDayForecastData, locationQuery } = location.state || {};

  return (
   <>
   <div className="features-container-weather">
   <div 
    className="weather-box"
    style={{
        backgroundImage: `url(${
            weatherData && weatherData[0]
                ? `/weatherImages/${
                      weatherData[0].WeatherIcon < 10
                          ? `0${weatherData[0].WeatherIcon}`
                          : weatherData[0].WeatherIcon
                  }.jpg`
                : "/weatherImages/33.jpg"
        })`,
        opacity: 0.8,
    }}
>
    <div className="weather-upper">
        <div className="weather-left ">
            <h1 className="temperature">
                {weatherData && weatherData[0]
                    ? `${weatherData[0].Temperature.Metric.Value}°C`
                    : "Loading..."}
            </h1>
            {weatherData && weatherData[0] ? (
                <img
                    src={`https://developer.accuweather.com/sites/default/files/${
                        weatherData[0].WeatherIcon < 10
                            ? `0${weatherData[0].WeatherIcon}`
                            : weatherData[0].WeatherIcon
                    }-s.png`}
                    alt="Weather Icon"
                    className="weather-icon"
                />
            ) : null}
            <p className="weather-status">
                {weatherData && weatherData[0] ? weatherData[0].WeatherText : ""}
            </p>
        </div>
        <div className="weather-right ">
        <h2>
  {fiveDayForecastData &&
    (weatherData[0].isDayTime
      ? fiveDayForecastData.DailyForecasts[0].Day.RainProbability === 0
        ? "No Rain"
        : `Rain Expected`
      : fiveDayForecastData.DailyForecasts[0].Night.RainProbability === 0
      ? "No Rain"
      : `Rain Expected`)}
</h2>
            
        <img src="/icons/location.png" alt="Location Icon" className="location-icon" />
            <h2 className="location">{locationQuery}</h2>
        </div>
    </div>

    <div className="weather-lower">
        <div className="detail-item bag">
        <img src="/icons/minmax.png" alt="Wind Icon" />
            <p>
                High :{" "}
                <span>
                    {fiveDayForecastData  ? `${Math.round((fiveDayForecastData.DailyForecasts[0].Temperature.Maximum.Value-32)*(5/9))}°C /`

                        : 
                    "Loading..."}
                </span>
                
            </p>
            <p>
                Low :{" "}
                <span>
                {fiveDayForecastData  ? `${Math.round((fiveDayForecastData.DailyForecasts[0].Temperature.Minimum.Value-32)*(5/9))}°C`
: 
"Loading..."}
                </span>
            </p>
        </div>
        {/* <div className="detail-item bag">
            <p>
                Low :{" "}
                <span>
                {fiveDayForecastData  ? `${Math.round((fiveDayForecastData.DailyForecasts[0].Temperature.Minimum.Value-32)*(5/9))}°`
: 
"Loading..."}
                </span>
            </p>
        </div> */}
        <div className="detail-item bag">
            <img src="/icons/windy.png" alt="Wind Icon" />
            <p>
                Wind :{" "}
                <span>
                    {weatherData && weatherData[0]
                        ? `${weatherData[0].Wind.Speed.Metric.Value} km/h`
                        : "Loading..."}
                </span>
            </p>
        </div>
        <div className="detail-item bag">
            <img src="/icons/thermometer.png" alt="Humidity Icon" />
            <p>
                Humidity :{" "}
                <span>
                    {weatherData && weatherData[0]
                        ? `${weatherData[0].RelativeHumidity}%`
                        : "Loading..."}
                </span>
            </p>
        </div>
        <div className="detail-item bag">
            <img src="/icons/barometer.png" alt="Pressure Icon" />
            <p>
                Pressure :{" "}
                <span>
                    {weatherData && weatherData[0]
                        ? `${weatherData[0].Pressure.Metric.Value} mb`
                        : "Loading..."}
                </span>
            </p>
        </div>
    </div>
</div>

<div class="weather-container"  style={{
        backgroundImage: `url(${
            weatherData && weatherData[0]
                ? `/weatherImages/${
                      weatherData[0].WeatherIcon < 10
                          ? `0${weatherData[0].WeatherIcon}`
                          : weatherData[0].WeatherIcon
                  }.jpg`
                : "/weatherImages/01.jpg"
        })`,
        opacity: 0.8,
    }}>
        <h2 className='heading bag'>5 Day Forecast</h2>
  {/* <div class="main-weather-box" >
    <div class="weather-info">
      <h1>26°C</h1>
      <p>Gothapatna</p>
      <p>Clear</p>
      <p>Rain: No Rain</p>
      <p>27°C / 18°C</p>
      <p>Sunset 5:28 pm</p>
      <p>Sunrise 5:28 pm</p>
    </div>
  </div> */}
  <div className="forecast-container">
                            {fiveDayForecastData &&
                                fiveDayForecastData.DailyForecasts.map((day, index) => (
                                    <div className="forecast-card" key={index}>
                                        <p>{new Date(day.Date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                                        <p>{new Date(day.Date).toLocaleDateString("en-GB")}</p>
                                        <p>
                                            <u>DAY</u>
                                        </p>
                                        <img
                                            src={`https://developer.accuweather.com/sites/default/files/${
                                                day.Day.Icon < 10 ? `0${day.Day.Icon}` : day.Day.Icon
                                            }-s.png`}
                                            alt="Day Icon"
                                        />
                                        <p>{day.Day.IconPhrase}</p>
                                        <p>{day.Day.HasPrecipitation ? "Rain Chance" : "No Rain"}</p>
                                        <p>
                                            <u>NIGHT</u>
                                        </p>
                                        <img
                                            src={`https://developer.accuweather.com/sites/default/files/${
                                                day.Night.Icon < 10 ? `0${day.Night.Icon}` : day.Night.Icon
                                            }-s.png`}
                                            alt="Night Icon"
                                        />
                                        <p>{day.Night.IconPhrase}</p>
                                        <p>{day.Night.HasPrecipitation ? "Rain Chance" : "No Rain"}</p>
                                    </div>
                                ))}
                        </div>
</div>
</div>
   </>
  )
}

export default WeatherBox
