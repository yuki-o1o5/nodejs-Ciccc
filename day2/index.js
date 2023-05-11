const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  // Respond to requests from “/write-message” by sending a html form that has a text input field.
  // When a user enters some text into the field, write the content of it to some text file.
  // (you will need to deal with parsing and buffers for this.)
  // Respond to requests from “/read-message” by sending some html that displays the content of your text file.

  if (req.url === "/") {
    console.log("Request is received");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
          <body>
            <h1>Hello Node!</h1>
            <p><a href=http://localhost:8000/read-message>ReadMsg</a></p>
            <p><a href=http://localhost:8000/write-message>WriteMsg</a></p>
          </body>
        </html>
    `);
    res.end();
  }

  if (req.url === "/write-message" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <form action="/write-message" method="post">
        <input type="text" name="message"></input>
        <button type="submit" mthod="POST">submit</button>
      </form>
    `);
    res.end();
  }

  if (req.url === "/write-message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const [key, value] = parsedBody.split("=");
      fs.writeFile("message.txt", `${key} - ${value}`, (err) => {
        if (err) {
          console.log(err);
          return res.end(err);
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  if (req.url === "/read-message") {
    fs.readFile("message.txt", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return res.end(err);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data, "utf8");
    });
  }
});

server.on("listening", () => {
  console.log("Server is listening");
});

server.listen(8000);
// Save and upload all your work on Google Classroom to Node.Js - Lab 2 Submission.
