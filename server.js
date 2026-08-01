const fs = require("fs");
const qs = require("querystring");
const http = require("http");
const url = require("url");
const validator = require("./validation.js");

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url).pathname;

  console.log(pathName);
  console.log(req.method);

  if (pathName === "/") {
    fs.readFile(`${__dirname}/public/index.html`, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal server error!");
      } else {
        res.writeHead(200, {
          "Content-type": "text/html",
        });
        res.end(data);
      }
    });
  } else if (pathName === "/styles.css") {
    fs.readFile(`${__dirname}/public/styles.css`, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Uh oh! Internal error!");
      } else {
        res.writeHead(200, {
          "Content-type": "text/css",
        });
        res.end(data);
      }
    });
  } else if (pathName === "/success") {
    fs.readFile(`${__dirname}/public/success.html`, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Uh oh! We've hit a snag.");
      } else {
        res.writeHead(200, {
          "Content-type": "text/html",
        });
        res.end(data);
      }
    });
  } else if (pathName === "/success.css") {
    fs.readFile(`${__dirname}/public/success.css`, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Oh no, we've hit a snag!");
      } else {
        res.writeHead(200, {
          "Content-type": "text/css",
        });
        res.end(data);
      }
    });
  } else if (pathName === "/error.css") {
    fs.readFile(`${__dirname}/public/error.css`, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal server error");
      } else {
        res.writeHead(200, {
          "content-type": "text/css",
        });
        res.end(data);
      }
    });
  } else if (pathName === "/index.js") {
    fs.readFile(`${__dirname}/public/index.js`, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Uh oh, we've got a problem!");
      } else {
        res.writeHead(200, {
          "Content-type": "application/javascript",
        });
        res.end(data);
      }
    });
  } else if (pathName === "/signup" && req.method === "POST") {
    let body = "";

    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      let finishedSignUp = qs.parse(body);
      let ready = validator(finishedSignUp);
      if (ready.isValid === false) {
        fs.readFile(`${__dirname}/public/error.html`, "utf-8", (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal error");
          } else {
            res.writeHead(200, {
              "Content-type": "text/html",
            });
            res.end(data);
          }
        });
      } else if (ready.isValid === true) {
        fs.appendFileSync(
          "./data/members.json",
          JSON.stringify(finishedSignUp) + "\n",

          (err) => {
            if (err) {
              res.end("Uh oh, looks like we hit a snag!");
            }
          },
        );
        res.writeHead(302, {
          location: "/success",
        });
        res.end();
      }
    });
  }
});

server.listen(8000, () => {
  console.log("server ready and running!");
});
