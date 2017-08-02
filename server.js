// The url library allows us to parse parts of the request url.
var url = require("url");

var fs = require("fs");

var http = require("http");

var PORT = 8080;

var server = http.createServer(handleRequest);

// Lets start our server
server.listen(PORT, function() {
  // Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});

// We need a function which handles requests and send response
function handleRequest(req, res) {

  // Capturing the url the request is made to.
  var urlParts = url.parse(req.url);
  console.log('\n' + urlParts.pathname);
  var page;

  // When we visit different urls, the switch statement call on different functions.
  switch (urlParts.pathname) {
    case "/":
      page = "/index.html"
      displayRoot(urlParts.pathname, req, res, page);
      break;
    case "/frameworks":
      page = "/frameworks.html"
      displayRoot(urlParts.pathname, req, res, page);
      break;
    case "/food":
      page = "/food.html"
      displayRoot(urlParts.pathname, req, res, page);
      break;
    case "/movies":
      page = "/movies.html"
      displayRoot(urlParts.pathname, req, res, page);
      break;
    default:
      display404(urlParts.pathname, req, res);
  }
}

// When we visit the "http://localhost:8080/" path, this function is run.
function displayRoot(url, req, res, page) {
  
  console.log(page);  
  // Here we use the fs package to read our index.html file
  fs.readFile(__dirname + page, function(err, data) {

    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

// When we visit any path that is not specifically defined, this function is run.
function display404(url, req, res) {
  res.writeHead(404, {
    "Content-Type": "text/html"
  });
  res.write("<h1>404 Not Found </h1>");
  res.end("The page you were looking for: " + url + " can not be found ");
}


// Starts our server
server.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});
