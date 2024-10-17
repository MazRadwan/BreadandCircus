const getNews = async () => {
  const apiKey = process.env.NEWS_API_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=50`
  );
  if (!response.ok) {
    console.error(`Error fetching news data: HTTP Status: ${response.status}`);
    const errorText = await response.text(); // Log response body in case it's useful
    console.error("Response body:", errorText);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.articles;
};
