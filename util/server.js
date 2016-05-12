var http = require('http'),
  beesmall = require('../index'),
  server;

/**
 * Starts the server.
 * @param {Object} app - App util object.
 */
var start = function(app) {
  /**
   * Handles HTTP requests.
   * @param {Object} request - HTTP request object.
   * @param {Object} response - HTTP response object.
   */
  var onRequest = function(request, response) {
    //try {
      beesmall.serve(request, response, app);
    //} catch (err) {
      //app.log.error('Failed to handle request:', err);
    //}
  };

  /**
   * Listenes to Ctrl + C command for process.
   */
  process.on('SIGINT', function() {
    app.log.nl().info('Shutting down resize-on-request server...');
    app.log.info('Waiting for open connections to close...');

    server.close(function() {
      app.log.info('Done. Bye bye...');
      app = null;
      process.exit();
    });
  });


  server = http.createServer(onRequest).listen(app.config.server.port);
};

exports.start = start;


