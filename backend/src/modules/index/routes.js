module.exports = {
  method: 'GET',
  path: '/api',
  config: {
    description: 'Hello, world'
  },
  handler(request, reply) {
    reply('<h1>Oispa API</h1>');
  }
};
