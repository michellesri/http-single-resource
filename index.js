const server = require('./lib/server');

const port = process.argv[2] || process.env.PORT || 65000;

server.listen(port, () => {
  console.log('server started on port: ' , port);
});
