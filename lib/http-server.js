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


  if (url.pathname === '/boardsports'){
    res.stausCode = 200;
    res.setHeader('Content-Type', 'text/html');
    sander.readdir(server.dir)
      .then(function (files) {
        files.forEach((file) => {
          res.write(file + '<br>');
        });
        res.end();

      });
  } else if (url.pathname === '/boardsports/surfing') {
    res.stausCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let fileLocation = server.dir + 'surfing.json';
    sander.readFile(fileLocation)
      .then((fileContents) => {
        res.write(fileContents);
        res.end();
      });


  } else if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    server.requestBody = '';
    req.on('data', data => {
      server.requestBody += data;
    });

    req.on('end', () => {
      try {
        server.newBoardsport = JSON.parse(server.requestBody);
        server.filePath = server.dir + server.newBoardsport.name + '.json';
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

  } else if (req.method === "PUT") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    server.requestBody2 = '';
    req.on('data', data => {
      server.requestBody2 += data;
    });

    req.on('end', () => {
      try {
        server.updatedBoardsport = JSON.parse(server.requestBody2);
        server.filePath2 = server.dir + server.updatedBoardsport.name + '.json';
        fs.writeFile(server.filePath2, server.requestBody2, (err) => {
          if (err) console.log(err);
        });
        res.write(server.requestBody2);
        res.end();
      }
     catch (err) {
       console.log('Error:', err);
     };
    });

  } else if (req.method === "DELETE") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var deleteBody = '';
    req.on('data', data => {
      deleteBody += data;
    });

    req.on('end', () => {
      // try {
      var deleteBoardsport = JSON.parse(deleteBody);
      server.deletePath = server.dir + deleteBoardsport.name + '.json';
      sander.unlink(server.deletePath)
          .then(() => {
            res.write('{"name":"surfing"}');
            res.end();
          });
      // }
    //  catch (err) {
    //    console.log('Error:', err);
    //  };
    });
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`<h1>Hello world. You asked for ${req.url}.</h1><h2>I don't really have anything special for you based on that url.</h2>`);
    res.end();
  }
});

module.exports = server;
