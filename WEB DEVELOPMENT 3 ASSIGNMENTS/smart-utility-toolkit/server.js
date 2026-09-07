// server.js

const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {

    console.log("Request received:", req.url);

    // Route: /
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Node Server");
    }

    // Route: /about
    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("About Page");
    }

    // Route: /contact
    else if (req.url === "/contact") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Contact Page");
    }

    // Invalid route
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});