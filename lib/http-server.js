const http = require('http');
const fs = require('fs');
const parseUrl = require('url').parse;
const qs = require('querystring');
const sander = require('sander');
server = {};
server.dir = (__dirname).slice(0, -4) + '/data/boardsports/';


server.httpServer = http.createServer((req, res) => {
  const url = parseUrl(req.url);
  const query = qs.parse(url.query);
  console.log('query as string', url.query);
  console.log('query as object', query);
  if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    server.requestBody = '';
    req.on('data', data => {
      server.requestBody += data;
    });

    req.on('end', () => {
      try {
        server.newBoardsport = JSON.parse(server.requestBody);
        console.log('new boardsport:', server.newBoardsport);
        console.log(server.dir);
        console.log('new boardsport name:', server.newBoardsport.name);
        server.filePath = server.dir + server.newBoardsport.name + '.json';
        console.log('file path:', server.filePath);
        fs.writeFile(server.filePath, server.requestBody, (err) => {
          if (err) console.log(err);
        });
        res.write(server.requestBody);
        res.end();    
      }
      catch (err) {
        console.log('Error:', err);
      }

    });
   
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`<h1>Hello world. You asked for ${req.url}.</h1><h2>I don't really have anything special for you based on that url.</h2>`);
    res.end();
  } 
});

module.exports = server;


