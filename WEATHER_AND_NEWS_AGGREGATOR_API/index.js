import express from 'express';
import collectCityInfo from './src/app.js';

const port = 3000;
const app = express();

app.get("/getCityInfo/:cityName" , async(req,res) =>{
     const city = req.params.cityName;
     try{
     const cityInfo = await collectCityInfo(city);
     res.json(cityInfo);
     }
     catch(error){
        console.log("Error in fetching data :", error.message);
        res.json({error_message: "Error in collecting city info" , error: error.message});
     }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
