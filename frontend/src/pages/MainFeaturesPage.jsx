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

export const MainFeaturesPage = () => {
    const { user } = useSelector((store) => store.auth);
    const { Crops } = useSelector((store) => store.crop);
    const [openSelectbox, setOpenSelectbox] = useState(false);
    const [locationKey, setLocationKey] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const apiKey = "ei5ZkKTcoRCHjHgJGyUQr41f4Ewmn5VG";
    const locationQuery = "padampur";

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

    useEffect(() => {
        // Fetch location data on component mount
        fetchLocationData();
    }, []);

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

    return (
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
        <div className="weather-left">
            <h1 className="temperature">
                {weatherData && weatherData[0]
                    ? `${weatherData[0].Temperature.Metric.Value}°`
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
        <div className="weather-right">
            <img src="/icons/location.png" alt="Location Icon" className="location-icon" />
            <h2 className="location">{locationQuery}</h2>
        </div>
    </div>

    <div className="weather-lower">
        <div className="detail-item">
            <p>
                High :{" "}
                <span>
                    {weatherData && weatherData[0] ? "29°" : "Loading..."}
                </span>
            </p>
        </div>
        <div className="detail-item">
            <p>
                Low :{" "}
                <span>
                    {weatherData && weatherData[0] ? "13°" : "Loading..."}
                </span>
            </p>
        </div>
        <div className="detail-item">
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
        <div className="detail-item">
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
        <div className="detail-item">
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
</div>;


            <SelectCrops open={openSelectbox} setOpen={setOpenSelectbox} />
        </div>
    );
};
