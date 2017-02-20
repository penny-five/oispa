module.exports = {
  method: 'GET',
  path: '/api',
  handler(request, reply) {
    reply('<h1>Oispa API</h1>');
  }
};
