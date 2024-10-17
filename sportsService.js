const https = require("https");

const fetchMLBData = (date, callback) => {
  const API_KEY = process.env.SPORTS_API_KEY;
  const url = `https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/${date}?key=${API_KEY}`;

  const req = https.get(url, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
    resp.on("end", () => {
      callback(JSON.parse(data));
    });
  });

  req.on("error", (err) => {
    console.error("Error fetching MLB data:", err.message);
  });

  req.setTimeout(5000, () => {
    req.abort();
    console.error("Request timed out");
  });
};

module.exports = {
  fetchMLBData,
};
