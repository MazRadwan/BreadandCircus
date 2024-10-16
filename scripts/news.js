document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.querySelector(".news-cards");

  const fetchNewsData = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      //   console.log("Fetched data:", data); // Log the data to verify it's being fetched
      displayNewsData(data);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const displayNewsData = (data) => {
    newsContainer.innerHTML = ""; // Clear previous data

    data.forEach((article) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");

      const headline = document.createElement("h3");
      const link = document.createElement("a");
      link.href = article.url;
      link.target = "_blank"; // Open the link in a new tab
      link.textContent = article.title;
      headline.appendChild(link);
      newsCard.appendChild(headline);

      const author = document.createElement("p");
      author.textContent = `By ${article.author || "Unknown"}`;
      newsCard.appendChild(author);

      const content = document.createElement("p");
      content.textContent = article.description || "No description available";
      newsCard.appendChild(content);

      if (article.urlToImage) {
        const image = document.createElement("img");
        image.src = article.urlToImage;
        image.alt = article.title;
        newsCard.appendChild(image);
      }

      const publishedAt = document.createElement("p");
      publishedAt.textContent = `Published Date: ${new Date(
        article.publishedAt
      ).toDateString()}`;
      newsCard.appendChild(publishedAt);

      newsContainer.appendChild(newsCard);
    });
  };

  fetchNewsData();
});
