import { createClient } from 'redis';

const client = createClient();
client.on('error', (error) => console.log('Redis Client Error', error));
await client.connect();


async function getCache(city){

    const cachedData = await client.get(city);
    // checking whether the data for the city is already present or not in the redis database
    if (cachedData) {
        console.log(`Cache data found for ${city}`);
        return JSON.parse(cachedData);
    }
    else return null;
}


async function setCache(city , finalData){

    // storing data for a city in the redis database to use it next time if asked for the same city within next 10 minutes
    await client.setEx(city, 600, JSON.stringify(finalData)); 
    // the expiration time is set to 10 minutes because open weather updates the weather data every 10 minutes

}

export { getCache , setCache };