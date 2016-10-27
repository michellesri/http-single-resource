const http = require('http');
const server = require('./lib/http-server');
const port = process.env.PORT || 8080;

server.httpServer.listen(port, () => {
  console.log('server listening on port',
  server.httpServer.address().port);
});
