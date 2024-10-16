document.addEventListener("DOMContentLoaded", () => {
  const weatherDataContainer = document.getElementById("weather-data");
  const submitButton = document.getElementById("submit");
  const cityInput = document.getElementById("city");

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();
      console.log("Fetched weather data:", data); // Log the data to verify it's being fetched
      displayWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const displayWeatherData = (data) => {
    weatherDataContainer.innerHTML = ""; // Clear previous data

    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    const temperature = document.createElement("h3");
    temperature.textContent = `${data.main.temp}°C`;
    weatherCard.appendChild(temperature);

    const description = document.createElement("p");
    description.textContent = data.weather[0].description;
    weatherCard.appendChild(description);

    const details = document.createElement("p");
    details.textContent = `Wind: ${data.wind.speed} m/s, Humidity: ${data.main.humidity}%`;
    weatherCard.appendChild(details);

    weatherDataContainer.appendChild(weatherCard);
  };

  submitButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
      fetchWeatherData(city);
    }
  });
});
