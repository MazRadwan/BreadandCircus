const fetch = require("node-fetch");

const getNews = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=7cecf72ce77741969bba4a97e303e0b3&pageSize=50"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  //   console.log("News data fetched:", data); // Log fetched data
  return data.articles;
};

module.exports = { getNews };
