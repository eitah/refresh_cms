(function (){'use strict';
var refreshCMSCodes = require('./refresh_cmscodes');

var codesFile = 'alliance_Release_1_BE';
var system = codesFile.split('_')[0];

//if codes file is not specified, input codes will default to my_app_cms_codes;
// the first parameter of the codes file must be the system name as defined in system map;

var inputCodes = '../resources/app_groups/' + codesFile;
var outputPath = './common/'+ system; 
refreshCMSCodes.getCodesList(null, outputPath);


}());
