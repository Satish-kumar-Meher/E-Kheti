// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import "../css/features_page.css"
// import { Plus } from 'lucide-react';
// import { SelectCrops } from '@/components/layout/SelectCrops';
// import axios from 'axios';
// export const MainFeaturesPage = () => {
//     const { user } = useSelector(store => store.auth);
//     const { Crops } = useSelector(store => store.crop);
//     const [openSelectbox, setOpenSelectbox] = useState(false);
//     const [locationKey , setLocationKey] = useState("")
//     const [weatherData, setWeatherData] = useState(null);
//     let backgroundImage = "/weatherImages/22.jpg" 
//      // Filter crops to only include those whose IDs are in the user's selectedCrops array
//      const selectedCrops = Crops.filter(crop => user?.selectedCrops?.includes(crop._id));


//     //  https://dataservice.accuweather.com/forecasts/v1/daily/5day/189781?apikey=ei5ZkKTcoRCHjHgJGyUQr41f4Ewmn5VG&details=true    --> 5 day forecast

//     // https://dataservice.accuweather.com/locations/v1/cities/search?apikey=ei5ZkKTcoRCHjHgJGyUQr41f4Ewmn5VG&q=gothapatna   --> location api

//     const apiKey = "ei5ZkKTcoRCHjHgJGyUQr41f4Ewmn5VG";
//     const locationQuery = "gothapatna";

//     const fetchLocationData = async () => {
      
      
//       const apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${locationQuery}`;
   
//       try {
//         const response = await axios.get(apiUrl,{
//           headers: {
//             Accept: 'application/json',
//           },
//         });
//         // console.log("Full Response:", response);
//         console.log("Response Data:", response.data[0].Key);
//         setLocationKey(response.data[0].Key)
//         return response.data; // The location details
//       } catch (error) {
//         console.error(
//           "Error fetching location data:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     };
//     // fetchLocationData()
//     useEffect(() => {
//       fetchLocationData()
//     },[locationQuery])

//     const currentWeatherApi = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`

//    // Function to fetch current weather data using Axios
//   const fetchCurrentWeather = async () => {
//     try {
//       const response = await axios.get(currentWeatherApi);
//       console.log("Current Weather Data:", response.data);
//       setWeatherData(response.data); // Store the data in state
//     } catch (error) {
//       console.error("Error fetching weather data:", error.message);
//     }
//   };

//   useEffect(() => {
//     // Call the function immediately on component mount
//     fetchCurrentWeather();

//     // Set up an interval to call the function every 2 minutes
//     // const intervalId = setInterval(() => {
//     //   fetchCurrentWeather();
//     // }, 120000); // 120000ms = 2 minutes

//     // // Cleanup interval on component unmount
//     // return () => clearInterval(intervalId);
//   }, []); // Empty dependency array ensures it runs only once
    


//   return (
  
//     <div className='features-container'>
//         <div className="crops-container">
//             {selectedCrops.map((crops,index) => (
//                 <div className="crops" key={index}>
//                     <img className='crop-image' src={crops.imgUrl} alt="" />
//                 </div>
//             )

//             )}
//             <div className="button" onClick={() => setOpenSelectbox(true)}>
//                 <div className="inter-radius">
//                     <div className="transparent-inter-radius">

//                     </div>
//                 </div>
//                 <Plus />
//             </div>
//         </div>

//         {/* <div className="weather-box">
//   <div className="temperature">
//     <div className="temp-and-icon">
//       <h1>26°</h1>
//       <img src="/icons/clear-sky.svg" alt="Clear Sky" className="weather-icon" />
//     </div>
//     <p>Clear</p>
//   </div>
//   <div className="details">
//     <div className="detail-item">
//       <img src="/icons/thermometer-high.svg" alt="High" />
//       <p>High: <span>29°</span></p>
//     </div>
//     <div className="detail-item">
//       <img src="/icons/thermometer-low.svg" alt="Low" />
//       <p>Low: <span>13°</span></p>
//     </div>
//     <div className="detail-item">
//       <img src="/icons/wind.svg" alt="Wind" />
//       <p>Wind: <span>2.0 km/h</span></p>
//     </div>
//     <div className="detail-item">
//       <img src="/icons/humidity.svg" alt="Humidity" />
//       <p>Humidity: <span>55%</span></p>
//     </div>
//     <div className="detail-item">
//       <img src="/icons/barometer.svg" alt="Pressure" />
//       <p>Pressure: <span>1015 mm/hg</span></p>
//     </div>
//   </div>
//   <div className="location">
//     <h2>Gothapatna</h2>
//   </div>
// </div> */}


// <div className="weather-box" style={{
//   backgroundImage: `url(${backgroundImage})`,
//   opacity : 0.8,
// }}>
//   {/* Upper part */}
//   <div className="weather-upper">
//     <div className="weather-left">
//       <h1 className="temperature">26°</h1>
//       <img src="https://developer.accuweather.com/sites/default/files/22-s.png" alt="Weather Icon" className="weather-icon" />
//       <p className="weather-status">Clear</p>
//     </div>
//     <div className="weather-right">
//       <img src="/icons/location.png" alt="Location Icon" className="location-icon" />
//       <h2 className="location">Gothapatna</h2>
//     </div>
//   </div>

//   {/* Lower part */}
//   <div className="weather-lower">
//     <div className="detail-item">
//       <p>High : <span>29°</span></p>
//     </div>
//     <div className="detail-item">
//       <p>Low : <span>13°</span></p>
//     </div>
//     <div className="detail-item">
//       <img src="/icons/windy.png" alt="Wind Icon" />
//       <p>Wind : <span>2.0 km/h</span></p>
//     </div>
//     <div className="detail-item">
//       <img src="/icons/thermometer.png" alt="Humidity Icon" />
//       <p>Humidity : <span>55%</span></p>
//     </div>
//     <div className="detail-item">
//       <img src="/icons/barometer.png" alt="Pressure Icon" />
//       <p>Pressure : <span>1015 mm/hg</span></p>
//     </div>
//   </div>
// </div>




//       <SelectCrops open={openSelectbox} setOpen={setOpenSelectbox}/>
      
//     </div>
//   )
// }




import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../css/features_page.css";
import { Plus } from 'lucide-react';
import { SelectCrops } from '@/components/layout/SelectCrops';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import WeatherBox from '@/components/layout/WeatherBox';

export const MainFeaturesPage = () => {
    const { user } = useSelector((store) => store.auth);
    const { Crops } = useSelector((store) => store.crop);
    const [openSelectbox, setOpenSelectbox] = useState(false);
    // const [openWeatherbox, setOpenWeatherbox] = useState(false);
    const [locationKey, setLocationKey] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [fiveDayForecastData , setFiveDayForecastData] = useState(null)

    const navigate = useNavigate()
    const apiKey = "ei5ZkKTcoRCHjHgJGyUQr41f4Ewmn5VGk";
    const locationQuery = "Bhubaneswar";

    // Filter crops to only include those whose IDs are in the user's selectedCrops array
    const selectedCrops = Crops.filter((crop) => user?.selectedCrops?.includes(crop._id));

    const fetchLocationData = async () => {
        const apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${locationQuery}`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log("Response Data (Location Key):", response.data[0].Key);
            setLocationKey(response.data[0].Key); // Update the location key
        } catch (error) {
            console.error(
                "Error fetching location data:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const fetchCurrentWeather = async () => {
        if (!locationKey) return; // Wait until locationKey is set
        const currentWeatherApi = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;
        try {
            const response = await axios.get(currentWeatherApi);
            console.log("Current Weather Data:", response.data);
            setWeatherData(response.data); // Store the data in state
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
        }
    };

    const fetch5dayForecastWeather = async () => {
        if(!locationKey) return;
        const FivedayForecastApi = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true`
        try {
            const response = await axios.get(FivedayForecastApi);
            console.log("Fiveday Forecast Weather Data:", response.data);
            setFiveDayForecastData(response.data); // Store the data in state
        } catch (error) {
            console.error("Error fetching 5 day forecast weather data:", error.message);
        }
    }

    useEffect(() => {
        // Fetch location data on component mount
        fetchLocationData();
       
    }, []);

    useEffect(() => {
        if (locationKey) {
            // Fetch initial five-day forecast
            fetch5dayForecastWeather();
    
            // Set up interval to fetch forecast data every 24 hours
            const intervalId = setInterval(() => {
                fetch5dayForecastWeather();
            }, 86400000); // 1 day in milliseconds
    
            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [locationKey]); // Depend on locationKey

    useEffect(() => {
        // Fetch current weather data whenever locationKey changes
        if (locationKey) {
            fetchCurrentWeather();
            const intervalId = setInterval(() => {
                fetchCurrentWeather();
            }, 1800000); // 120000ms = 2 minutes

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }
        
    }, [locationKey]); // Depend on locationKey

    // const MaxTemp = (fiveDayForecastData.DailyForecasts[0].Temperature.Maximum.Value-32)*(5/9)


    return (
        <>
        <div className="features-container">
            <div className="crops-container">
                {selectedCrops.map((crops, index) => (
                    <div className="crops" key={index}>
                        <img className="crop-image" src={crops.imgUrl} alt="" />
                    </div>
                ))}
                <div className="button" onClick={() => setOpenSelectbox(true)}>
                    <div className="inter-radius">
                        <div className="transparent-inter-radius"></div>
                    </div>
                    <Plus />
                </div>
            </div>

            <div onClick={() => navigate("/weather", {
            state: { weatherData, fiveDayForecastData, locationQuery },
        })}
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
        <h2>No Rain</h2>
            
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

<div className="scanner-container bag2">
    <div className="scan-images-container">
        <div className="scan-image">
        <img src="https://img.freepik.com/premium-photo/hand-holds-smartphone-taking-photo-yellow-flowers-growing-greenhouse_284520-1550.jpg?w=1380" alt="" />
        <h3>Take a Picture</h3>
        </div>
        <h6 className='pin-arrow'>→</h6>
        <div className="scan-image">
        <img src="https://img.freepik.com/free-vector/regenerative-agriculture-isometric-set-with-mobile-app-templates-helping-healthy-crop-growing-isolated-vector-illustration_1284-80062.jpg?t=st=1737294562~exp=1737298162~hmac=ee1ea002403dd6f3ea13b02a0587cc2a2d5846a8487cb05c71553776aeee5e0e&w=1380" alt="" />
        <h3>See Diagonesis</h3>
        </div>
        <h6 className='pin-arrow'>→</h6>
        <div className="scan-image">
        <img src="https://img.freepik.com/free-photo/front-view-black-yellow-green-juice-bottles_140725-99675.jpg?t=st=1737294989~exp=1737298589~hmac=c9303e6dbdb01ad6b3f3fa35b99efabcf53b4a9ffcac7816de3318240f6efd92&w=1380" alt="" />
        <h3>Get Medicine</h3>
        </div>
        
        </div>
                
    <button className='scan-btn'>Take a Picture</button>
</div>

<div class="box-container">
  <div class="box1 box">
    <div class="box-content">
      <h3>Fertilizer Calculator</h3>
      <span class="arrow-tir">&gt;</span>
    </div>
  </div>
  <div class="box2 box">
    <div class="box-content">
      <h3>Pests and diseases</h3>
      <span class="arrow-tir">&gt;</span>
    </div>
  </div>
  <div class="box3 box">
    <div class="box-content">
      <h3>Cultivation Tips</h3>
      <span class="arrow-tir">&gt;</span>
    </div>
  </div>
  <div class="box4 box">
    <div class="box-content">
      <h3>Disease Alert and pests</h3>
      <span class="arrow-tir">&gt;</span>
    </div>
  </div>
  <div class="box5 box">
    <div class="box-content">
      <h3>Estamate your Profit</h3>
      <span class="arrow-tir">&gt;</span>
    </div>
  </div>
  <div class="box6 box">
    <div class="box-content">
      <h3>Add field</h3>
      <span class="arrow-tir">&gt;</span>
    </div>
  </div>
</div>

            <SelectCrops open={openSelectbox} setOpen={setOpenSelectbox} />
           
        </div>
        {/* <div className="features-container2">
       

        </div> */}
        </>
    );
};
