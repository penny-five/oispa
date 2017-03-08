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
        register: 'hapijs-status-monitor',
        options: {
          path: '/api/status'
        }
      }
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
          routes: 'modules/**/routes.js'
        }
      }
    }
  ]
});

module.exports = createManifest;
