import axios from "axios";


const worldNewsAPIkey = '4153f9dc979d4cc2b241720faa213019';
const newsAPIapikey = "19452038b3174a31b62b4cdf49ad04a0";
const gnewsAPIkey = "ed21fa49c4196386a3ccc3d1f3b74dc1";


// function for getting the date n days before the present data
function getPreviousDate(n) {
    let date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().split('T')[0];  
}


// function for collecting news articles from world news api
async function worldNewsAPI(city) {
 
    const text = city;
    const language = 'en';
    const number = 100;
    const sort = 'publish-time';
    const sortDirection = 'DESC';
    const from = getPreviousDate(1);      // gathering news of last 1 day with the World News API
    const news = [];
    try{
    const response = await axios.get(`https://api.worldnewsapi.com/search-news?api-key=${worldNewsAPIkey}&text=${text}&language=${language}&earliest-publish-date=${from}&number=${number}&sort=${sort}&sort-direction=${sortDirection}`)
    const numArticles = response.data.number <= response.data.available ? response.data.number : response.data.available;
    const articles = response.data.news;
    for(let i=0 ; i<numArticles ; i++){
        const currentArticle = articles[i];
        if (currentArticle.title.includes(city) === false)
            continue;
        const newsObj = {};
        newsObj.sourceName = "Not Found";        // the source name is not provided by the World News API
        newsObj.author = currentArticle.author;
        newsObj.title = currentArticle.title;
        newsObj.description = "None";            // there is no title description in case of world news API 

        // sometimes , the main content of the news sent by the World News API is useless in few of the articles,
        // for eg. sometimes the main content is like - "Top 10 dishes in the world" and other sentences like this
        // to prevent this from reaching the frontend, one possible solution is to check if the content is of sufficient length(has some useful information)
        if (currentArticle.text.length > 100) 
            newsObj.content = currentArticle.text;
        else newsObj.content = "No useful content in response. Please check the URL to News for getting more details about the news."
        newsObj.URLtoNews = currentArticle.url;
        newsObj.URLtoNewsImage = currentArticle.image;
        newsObj.publishedAt = currentArticle.publish_date;
        news.push(newsObj);

    }
    return news;
   }
   catch(error){
    console.log("Error in fetching data from World News API : " , error.message);
    news.push({messageFromWorldNewsAPI: "Couldn't fetch news from WorldNews API."});
    return news;
   }
}


// function for collecting news articles from news api
async function newsAPI(city) {
     
    const searchIn = "title,description";
    const language= "en";
    const q = city;
    const from = getPreviousDate(5);       // gathering news of last 5 days with the news API
    const sortBy = 'publishedAt'
    const news = [];
    try{
    const response = await axios.get(`https://newsapi.org/v2/everything?apiKey=${newsAPIapikey}&q=${city}&searchIn=${searchIn}&language=${language}&from=${from}&sortBy=${sortBy}`);
    if (response.data.status === "ok"){
    const articles = response.data.articles;
    for(let i=0 ; i< articles.length ; i++){
        const currentArticle = articles[i];
        const newsObj = {};
        newsObj.sourceName = currentArticle.source.name;
        newsObj.author = currentArticle.author;
        newsObj.title = currentArticle.title;
        newsObj.description = currentArticle.description;

        // same case is with News API as in World News API, the main content of the news is useless in few of the articles,
        // to prevent this from reaching the frontend, one possible solution is to check if the content is of sufficient length(has some useful information)
        if (currentArticle.content.length > 100) 
            newsObj.content = currentArticle.content
        else newsObj.content = "No useful content in response. Please check the URL to News for getting more details about the news."
        newsObj.URLtoNews = currentArticle.url;
        newsObj.URLtoNewsImage = currentArticle.urlToImage;
        newsObj.publishedAt = currentArticle.publishedAt;
        news.push(newsObj);
       }
    return news;
    }
    else if (response.data.status === "error"){
        console.log(`Error from news api : ${response.data.message}`)
        news.push({messageFromNewsAPI: "Couldn't fetch news from News API."});
        return news;
    }
  }
  catch(error){
    console.log("Error in fetching data from News API : " , error.message);
    news.push({messageFromNewsAPI: "Couldn't fetch news from News API."});
    return news;
  }
}


// function for collecting news articles from  gnews api
async function gnewsAPI(city) {
     
    const searchIn = "title,description";
    const language= "en";
    const q = city;
    const from = getPreviousDate(3) + "T00:00:00Z";       // gathering news of last 3 days with the gnews API
    const sortBy = 'publishedAt'
    const news = [];
    try{
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${q}&in=${searchIn}&lang=${language}&from=${from}&sortby=${sortBy}&max=100&apikey=${gnewsAPIkey}`);
    const articles = response.data.articles;
    for(let i=0 ; i< articles.length ; i++){
        const currentArticle = articles[i];
        const newsObj = {};
        newsObj.sourceName = currentArticle.source.name;
        newsObj.author = "Not Found";            // the author name is not provided by the gnews API
        newsObj.title = currentArticle.title;
        newsObj.description = currentArticle.description;

        // same case is with gnews API as in World News API, the main content of the news is useless in few of the articles,
        // to prevent this from reaching the frontend, one possible solution is to check if the content is of sufficient length(has some useful information)
        if (currentArticle.content.length > 100) 
            newsObj.content = currentArticle.content
        else newsObj.content = "No useful content in response. Please check the URL to News for getting more details about the news."
        newsObj.URLtoNews = currentArticle.url;
        newsObj.URLtoNewsImage = currentArticle.image;
        newsObj.publishedAt = currentArticle.publishedAt;
        news.push(newsObj);
    }
    return news;
  }
  catch(error){
    console.log("Error in fetching data from GNews API : " , error.message);
    news.push({messageFromNewsAPI: "Couldn't fetch news from GNews API."});
    return news;
  }
}



async function getNews(city){

    const newsAPI_news = await newsAPI(city);
    const gnewsAPInews = await gnewsAPI(city);
    const worldAPI_news = await worldNewsAPI(city);
    const totalNews = [...newsAPI_news , ...gnewsAPInews , ...worldAPI_news ]

    return totalNews; 

}


export default getNews;