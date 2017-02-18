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
      plugin: 'hapijs-status-monitor'
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
            interval: 1000 * 60 * 5 // report every 5 minutes
          },
          reporters: {
            console: [
              {
                module: 'good-console'
              },
              'stdout'
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
