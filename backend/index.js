const Server = require('./src/server');

new Server().start({
  port: 8080,
  loglevel: 'info'
});
