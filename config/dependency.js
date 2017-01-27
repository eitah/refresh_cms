(function (){'use strict';

  var root = require('../root');

  var resetDependencies = function (env){
    var localConfig;
    if(global.config){
      localConfig = global.config;
    } 
    else {
      localConfig = require(root.path + '/config/config');
    }
    delete require.cache[require.resolve(root.path + '/config/config')];
    delete require.cache[require.resolve(root.path + '/model/header')];
    delete require.cache[require.resolve(root.path + '/model/billing_log')];
    delete require.cache[require.resolve(root.path + '/model/tiles')];
    delete require.cache[require.resolve(root.path + '/model/endorsements')];
    delete require.cache[require.resolve(root.path + '/common/rest_processor')];
    
    
    process.env.NODE_ENV = env;
    
    localConfig = require(root.path + '/config/config');
    global.soapProcessor = require(localConfig.soapProcessorServicePath);
    global.restProcessor = require(localConfig.restProcessorServicePath);
    global.header = require(root.path + '/model/header');
    global.billingLog = require(root.path + '/model/billing_log');
    global.tiles = require(root.path + '/model/tiles');
    global.endorsements = require(root.path + '/model/endorsements');
    
    if(global.config){
      config = localConfig;
    }
  };

  module.exports = {
    resetDependencies: resetDependencies
  };

}());