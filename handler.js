if (!global._babelPolyfill) {
   require('babel-polyfill');
}

export const hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello, oispa!',
      input: event,
    }),
  };

  callback(null, response);
};
