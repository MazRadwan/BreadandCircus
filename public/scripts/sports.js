document.addEventListener("DOMContentLoaded", () => {
  const sportsContainer = document.querySelector(".sports-data");

  const fetchSportsData = async (url, sport) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // Log the data to verify it's being fetched
      displaySportsData(data, sport);
    } catch (error) {
      console.error("Error fetching sports data:", error);
    }
  };

  const displaySportsData = (data, sport) => {
    sportsContainer.innerHTML = ""; // Clear previous data

    data.forEach((event) => {
      const sportsCard = document.createElement("div");
      sportsCard.classList.add("sports-card");

      const title = document.createElement("h3");
      title.textContent = `${event.HomeTeam} vs. ${event.AwayTeam}`;
      sportsCard.appendChild(title);

      const details = document.createElement("p");
      details.textContent = `Status: ${event.Status} - ${new Date(
        event.DateTime
      ).toLocaleString()}`;
      sportsCard.appendChild(details);

      const scores = document.createElement("p");
      const homeScore = event.HomeTeamRuns !== null ? event.HomeTeamRuns : "";
      const awayScore = event.AwayTeamRuns !== null ? event.AwayTeamRuns : "";
      scores.textContent = `Scores: ${homeScore} - ${awayScore}`;
      sportsCard.appendChild(scores);

      sportsContainer.appendChild(sportsCard);
    });
  };

  fetchSportsData("/api/sports/mlb", "MLB");
});
