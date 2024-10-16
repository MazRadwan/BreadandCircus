const https = require("https");
const querystring = require("querystring");

const API_KEY = "9d9a3d00a61f8769dccfe12f18d1592f";

const getWeather = (city, callback) => {
  const params = querystring.stringify({
    q: city,
    appid: API_KEY,
    units: "metric",
  });

  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;

  https
    .get(url, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        if (resp.statusCode === 200) {
          callback(null, JSON.parse(data));
        } else {
          callback(new Error(`HTTP error! Status: ${resp.statusCode}`));
        }
      });
    })
    .on("error", (err) => {
      callback(err);
    });
};

module.exports = { getWeather };
