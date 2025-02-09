<h2>🚀 How to Run the Project locally:</h2>

<h4>Make sure to have redis downloaded locally</h4>
<h4>🔹 Windows</h4> <ul> <li>Download Redis for Windows from <a href="https://github.com/microsoft/redis/releases">here</a></li> <li>Extract and navigate to the folder</li> <li>Run the following command in PowerShell or Command Prompt:</li> </ul>
<pre>
<code>
redis-server
</code>
</pre>
<h4>🔹 Mac (via Homebrew)</h4> <ul> <li>Install Redis using Homebrew:</li> </ul>
<pre>
<code>
brew install redis
</code>
</pre>
<ul> <li>Start Redis:</li> </ul>
<pre>
<code>
redis-server
</code>
</pre>

<h4>🔹 Linux (Debian/Ubuntu)</h4> <ul> <li>Install Redis:</li> </ul>
<pre>
<code>
sudo apt update
sudo apt install redis
</code>
</pre>
<ul> <li>Start Redis:</li> </ul>
<pre>
<code>
redis-server
</code>
</pre>


<pre>
<code>
1. Clone the repository:
   git clone https://github.com/AbhinavPatel271/Weather-and-News-Aggregator-API.git

2. Navigate to the project directory:
   cd Weather-and-News-Aggregator-API
   cd WEATHER_AND_NEWS_AGGREGATOR_API

3. Install dependencies:
   npm install

4. Run the local server
   node index.js

</code>
</pre>





# 🌦️📰 Weather & News Aggregator API

## 📌 Overview
The **Weather & News Aggregator API** is a powerful tool that provides **real-time weather updates 🌤️, weather forecasts ⏳, and the latest news 🗞️** for a given city. It efficiently combines data from multiple APIs and implements **Redis caching** to optimize performance and minimize API requests.

---

## 🚀 Features
- **Weather Information 🌍**
  - Retrieves **current weather** using OpenWeatherMap API.
  - Fetches **5-day weather forecast** for better planning.
  
- **Latest City-Specific News 🏙️**
  - Aggregates top news articles from multiple sources:
    - 🌎 World News API
    - 📰 News API
    - 📢 GNews API

- **Optimized Performance ⚡**
  - Uses **Redis caching** to **reduce redundant API calls** and improve response time.
  - Ensures fresh data while minimizing third-party API requests.

---

## 🛠️ Technologies Used
- **Backend:** Node.js (Express.js)
- **Caching:** Redis
- **APIs Used:**
  - 🌦️ OpenWeatherMap (Current Weather & Forecast)
  - 📰 World News API
  - 📰 News API
  - 📰 GNews API
- **Data Format:** JSON

---

## 📌 How It Works
1. **User inputs a city name** 🌆
2. The API fetches **weather & forecast data** 🌦️ from OpenWeatherMap.
3. It retrieves **latest news** 📰 from the news APIs.
4. The response is **cached in Redis** 🗄️ for improved efficiency.
5. If the same city is requested again within the cache expiry time (10min), **cached data is served** ⚡ instead of making a new API request.

---

