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

