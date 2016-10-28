const http = require('http');
const url = require('url');
const querystring = require('querystring');

module.exports = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');

  const params = url.parse(req.url);
  const query = querystring.parse(req.url);

  if(req.method === 'GET'){
    res.statusCode = 200;
    console.log('GET request');
  } else if(req.method === 'POST'){
    console.log('POST request');
  } else {
    res.writeHead(400, {'content-type': 'text/plain'});
    res.statusCode = 400;
    res.write(error);
    res.end();
  }
});
