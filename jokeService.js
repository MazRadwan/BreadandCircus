const https = require("https");

const getJoke = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "official-joke-api.appspot.com",
      path: "/jokes/random",
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP error! Status: ${res.statusCode}`));
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};

module.exports = { getJoke };
