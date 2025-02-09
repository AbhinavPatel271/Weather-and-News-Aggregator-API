import getNews from './utilities/newsServices.js';
import getWeather from './utilities/weatherServices.js';
import {getCache , setCache} from './config/redis.js';
 


// function for gathering all the city data from multiple sources 
async function collectCityInfo(city){

    const cachedData = await getCache(city);
    if ( cachedData !== null ) return cachedData;
    

    // data for the city was not found in the redis database , so we will use API requests for fetching the data
    console.log(`Cache missing for ${city}. Fetching data from APIs`);    

    const weather = await getWeather(city);  
    const news = await getNews(city);  
    
    const finalCityData = {...weather};
    finalCityData.newsArticles = news.length !=0 ? news : "No latest news available for this city";

    await setCache(city , finalCityData);

    return finalCityData;

}



export default collectCityInfo;