const createManifest = opts => ({
  connections: [
    {
      port: opts.port
    }
  ],
  registrations: [
    {
      plugin: 'blipp'
    },
    {
      plugin: {
        register: 'hapi-alive',
        options: {
          path: '/echo',
          responses: {
            healthy: {
              message: 'ping? pong!'
            }
          }
        }
      }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            console: [
              {
                module: 'good-console'
              }
            ]
          }
        }
      }
    },
    {
      plugin: {
        register: 'hapi-router',
        options: {
          cwd: __dirname,
          routes: 'routes/**/*.js'
        }
      }
    }
  ]
});

module.exports = createManifest;
