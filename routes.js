const fs = require("fs").promises;
const path = require("path");
const myEmitter = require("./logEvents");
const handleError = require("./errorHandler");
const { getJoke } = require("./jokeService");

const fetchFile = async (filePath, res, data = null) => {
  try {
    let content = await fs.readFile(filePath, "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  } catch (error) {
    handleError(error, res);
  }
};

const routes = {
  indexPage: (filePath, res) => fetchFile(filePath, res),
  newsPage: (filePath, res) => fetchFile(filePath, res),
  sportsPage: (filePath, res) => fetchFile(filePath, res),
  weatherPage: (filePath, res) => fetchFile(filePath, res),
  jokesPage: (filePath, res) => fetchFile(filePath, res),
  randomJoke: async (req, res) => {
    try {
      const joke = await getJoke();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(joke));
    } catch (error) {
      handleError(error, res);
    }
  },
};

module.exports = routes;
