(function (){'use strict';

  var winston = require('winston');

  var defaultTransport = [
    new (winston.transports.Console)({
      timestamp: function() {
        return Date.now();
      },
      formatter: function(options) {
        return options.timestamp() +':'+ options.level.toUpperCase() +':'+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'logs/filelog-error.log',
      level: 'warn'
    })
  ];

  var transports = {
    "development": {
      transport: defaultTransport
    },
    "test": {
      transport: [
        new (winston.transports.File)({
          name: 'error-file',
          filename: 'logs/filelog-error-test.log',
          level: 'warn'
        })
      ]
    },
    "integration": {
      transport: defaultTransport
    },
    "staging": {
      transport: defaultTransport
    },
    "uat": {
      transport: defaultTransport
    },
    "production": {
      transport: defaultTransport
    }
  };
  function setLogger (env) {
    var logger = new (winston.Logger)({
      transports: transports[env].transport 
    });
    
    global.logger = logger;
  }

  module.exports = {
    setLogger: setLogger
  };

}());