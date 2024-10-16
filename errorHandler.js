const myEmitter = require("./logEvents");

const handleError = (err, res) => {
  let message;
  switch (err.code) {
    case "ENOENT":
      message = "File not found";
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>", "utf-8");
      break;
    case "EACCES":
      message = "Permission denied";
      res.writeHead(403, { "Content-Type": "text/html" });
      res.end("<h1>403 Forbidden</h1>", "utf-8");
      break;
    case "ENOSPC":
      message = "No space left on device";
      res.writeHead(507, { "Content-Type": "text/html" });
      res.end("<h1>507 Insufficient Storage</h1>", "utf-8");
      break;
    case "EROFS":
      message = "Read-only file system";
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 Internal Server Error</h1>", "utf-8");
      break;
    default:
      message = "Server error";
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 Internal Server Error</h1>", "utf-8");
  }
  myEmitter.emit("errorOccurred", `${message}: ${err.message}`);
};

module.exports = handleError;
