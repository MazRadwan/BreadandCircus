// logEvents.js
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format, getYear, getMonth, getDate } = require("date-fns");
const { v4: uuid } = require("uuid");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

global.DEBUG = true;

const createLogDirectory = async () => {
  const now = new Date();
  const year = getYear(now).toString();
  const month = (getMonth(now) + 1).toString().padStart(2, "0");
  const day = getDate(now).toString().padStart(2, "0");

  const dirPath = path.join(__dirname, "logs", year, month, day);
  if (!fs.existsSync(dirPath)) {
    await fsPromises.mkdir(dirPath, { recursive: true });
  }

  return dirPath;
};

const logEvent = async (message, level, filename) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logMessage = `${dateTime}\t${level}\t${message}\t${uuid()}\n`;

  if (global.DEBUG) {
    console.log(logMessage);
  }

  const logDirPath = await createLogDirectory();
  const logFilePath = path.join(logDirPath, filename);

  try {
    await fsPromises.appendFile(logFilePath, logMessage);
  } catch (err) {
    console.error(`Failed to write to log file: ${err}`);
  }
};

myEmitter.on("routeAccessed", (route) =>
  logEvent(`Route accessed: ${route}`, "INFO", "access.log")
);
myEmitter.on("errorOccurred", (error) =>
  logEvent(`Error: ${error}`, "ERROR", "error.log")
);

module.exports = myEmitter;
