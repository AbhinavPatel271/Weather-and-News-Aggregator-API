import axios from "axios";


const openWeatherAPIkey = "e4433def10ac97f4880cebf10cfa36b9";

// function for getting the closest past time(from the current time) from the available time stamps as provided by 
// open weather API for forecasting weather
function getClosestPastTime() {

    // these are the timestamps for which Open Weather API provides forecast for the next 5 days 
    const timeSlots = [
        "00:00:00", "03:00:00", "06:00:00", "09:00:00",
        "12:00:00", "15:00:00", "18:00:00", "21:00:00"
    ];

    let now = new Date();
    let currentTime = now.toTimeString().split(" ")[0];  

    let closestTime = timeSlots[0]; 
    for (let time of timeSlots) {
        if (time <= currentTime) {
            closestTime = time;  
        } else {
            break;  
        }
    }

    return closestTime;
}


// function for getting the weather forecast of the city
async function getWeatherForecast(city) {
    var finalForecastList = [];
    try{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${openWeatherAPIkey}`)
    var forecastList = response.data.list;
    const today = new Date().toISOString().split("T")[0];
    for(let i=0; i< forecastList.length ; i++){
        var forecastDetail = forecastList[i];
        var forecast = {}

        //the forecast is provided for the next 4-5 days of the time which is closest to the present time (the time at which the user is searching for the city data)
        if ( (!forecastDetail.dt_txt.startsWith(today))  && (forecastDetail.dt_txt).endsWith(getClosestPastTime())){        
              forecast.date = forecastDetail.dt_txt;
              forecast.main = forecastDetail.weather[0].main;
              forecast.description = forecastDetail.weather[0].description;
              forecast.temp = `${Math.round(forecastDetail.main.temp - 273.15)} ℃`;
              forecast.temp_feels_like = `${Math.round(forecastDetail.main.feels_like - 273.15)} ℃`;
              forecast.temp_min = `${Math.round(forecastDetail.main.temp_min - 273.15)} ℃`;
              forecast.temp_max = `${Math.round(forecastDetail.main.temp_max - 273.15)} ℃`;
              forecast.pressure = `${forecastDetail.main.pressure} hPa`;
              forecast.humidity = `${forecastDetail.main.humidity} %`;
              forecast.visibility = `${forecastDetail.visibility} meter`;
              forecast.windSpeed = `${forecastDetail.wind.speed} meter/sec`;
              forecast.windDirecton = `${forecastDetail.wind.deg} degress`;
              forecast.windGust = `${forecastDetail.wind.gust} meter/sec`;   // it is returned as undefined sometimes from the OpenWeather API
              forecast.cloudiness = `${forecastDetail.clouds.all} %`;
              finalForecastList.push(forecast);
        }
    }
    return finalForecastList;
   }
   catch(error){
    console.log("Error in fetching weather forecast from Open weather map :" , error.message);
    finalForecastList.push({messageFromOpenWeatherForecast : "Couldn't fetch weather forecasting data from Open weather map."});
    return finalForecastList;
   }
    
}


// function for getting the current weather conditions of the city 
async function openWeather(city) {
    try{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherAPIkey}`);
    const data = response.data;
     
    const sunriseUnix = data.sys.sunrise;
    const currentUnix = data.dt;
    const sunsetUnix = data.sys.sunset;
    let sunriseUTC = new Date(sunriseUnix * 1000);   
    let currentUTC = new Date(currentUnix * 1000);
    let sunsetUTC = new Date(sunsetUnix * 1000);
    let sunriseLocal = new Date(sunriseUTC.getTime() );
    let currentLocal = new Date(currentUTC.getTime() );
    let sunsetLocal = new Date(sunsetUTC.getTime() );
    let localSunrise = sunriseLocal.toLocaleString();
    let localCurrent = currentLocal.toLocaleString();
    let localSunset = sunsetLocal.toLocaleString(); 

    const openWeatherData = {};
    openWeatherData.cityCoordinates = data.coord;
    openWeatherData.weather = {}
    openWeatherData.weather.time = {}
    openWeatherData.weather.time.sunriseTime = localSunrise;
    openWeatherData.weather.time.currentTime = localCurrent;
    openWeatherData.weather.time.sunsetTime = localSunset;
    openWeatherData.weather.main = data.weather[0].main;
    openWeatherData.weather.description = data.weather[0].description;
    openWeatherData.weather.temp = `${Math.round(data.main.temp - 273.15)} ℃`;
    openWeatherData.weather.temp_feels_like = `${Math.round(data.main.feels_like - 273.15)} ℃`;
    openWeatherData.weather.temp_min = `${Math.round(data.main.temp_min - 273.15)} ℃`;
    openWeatherData.weather.temp_max = `${Math.round(data.main.temp_max - 273.15)} ℃`;
    openWeatherData.weather.pressure = `${data.main.pressure} hPa`;
    openWeatherData.weather.humidity = `${data.main.humidity} %`;
    openWeatherData.weather.visibility = `${data.visibility} meter`;
    openWeatherData.weather.windSpeed = `${data.wind.speed} meter/sec`;
    openWeatherData.weather.windDirecton = `${data.wind.deg} degress`;
    openWeatherData.weather.windGust = `${data.wind.gust} meter/sec`;   // it is returned as undefined sometimes from the OpenWeather API
    openWeatherData.weather.cloudiness = `${data.clouds.all} %`;

    return openWeatherData;
    }
    catch(error){
        console.log("Error in fetching weather details from Open weather map :" , error.message);
        return {weather: [ {messageFromOpenWeather : "Couldn't fetch weather data from Open weather map." }]}
    }
}


async function getWeather(city){

    const openWeatherData = await openWeather(city);
    const weatherForecast = await getWeatherForecast(city);

    const finalWeatherData = {...openWeatherData};
    finalWeatherData.weatherForecast = weatherForecast;
    return finalWeatherData;   

}


export default getWeather;