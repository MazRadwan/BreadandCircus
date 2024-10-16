const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

global.DEBUG = true;

const logEvent = (message, level) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logMessage = `${dateTime}\t${level}\t${message}\t${uuid()}\n`;

  if (global.DEBUG) {
    console.log(logMessage);
  }
};

// Log when routes are accessed
myEmitter.on("routeAccessed", (route) =>
  logEvent(`Route accessed: ${route}`, "INFO")
);

// Log errors
myEmitter.on("errorOccurred", (error) =>
  logEvent(`Error: ${error}`, "ERROR")
);

module.exports = myEmitter;
