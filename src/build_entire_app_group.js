(function (){'use strict';
var refreshCMSCodes = require('./get_cms_application_group');
var systemMap = require('../resources/system_map');
var system = 'arms';
var releaseName = 'Production';
var applicationGroup = 'CF';

systemMap.forEach(function (s) {
  refreshCMSCodes.getCodeCategoriesList(s.system, s.releaseName, s.applicationGroup);

});
// refreshCMSCodes.getCodeCategoriesList(system, releaseName, applicationGroup);
// refreshCMSCodes.getCodeCategoriesList(system);


}());
// TODO fix this method to not loop thru these.