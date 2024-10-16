const fetch = require("node-fetch");

const getNews = async () => {
  const apiKey = process.env.NEWS_API_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=50`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.articles;
};

module.exports = { getNews };
