(function (){'use strict';
  var soap = require('soap');

  var fs = require('fs');
  var cms_wsdl = "http://edmdev/edm/uctwebservice/decodeservice_v2.asmx?wsdl";
  var Promise = require('bluebird');
  var filePath = './resources/app_groups';
  var getLogMessage = require('../common/log_helper');
  require('../config/config');
  var refreshCMSCodes = require('./refresh_cmscodes');

  var allstateSoapHeader = "<msgHeader xmlns='http://allstate.com/xml/standard/soapHeader/v1' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><msgId>1</msgId><msgDateTime>1999-05-31T13:20:00-05:00</msgDateTime><sendingSystemCd>SMCE-BillingExplanation</sendingSystemCd><sendingSystemInfo><systemId>COMPOZED-BF-02</systemId></sendingSystemInfo></msgHeader>";



var getCodeCategoriesList = function(system, releaseName, applicationGroup) {
  var soapBody = "<getCodeCategoriesListRequest xmlns='http://allstate.com/enterprise/codesManagement/codeDecode_v2'>" +
  "<releaseName xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>" + releaseName +"</releaseName>" +
  "<applicationGroup xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>" + applicationGroup + "</applicationGroup>" +
  "<versionExt xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>xml</versionExt>" +
  "</getCodeCategoriesListRequest>";

  var cmsPromise = refreshCMSCodes.getCMSPromise(cms_wsdl, allstateSoapHeader, "getCodeCategoriesList", soapBody, system);
  var finalPath = filePath + '/' + system + '_' + releaseName.replace(/ /g,"_") + "_" + applicationGroup + ".js";

  cmsPromise
    .then(function(data) {
      console.log('Writing app group resource file for ' + system + " using application group " + applicationGroup + " and release name " + releaseName);
      console.log(data);

      refreshCMSCodes.persistResponse(finalPath, formatCode(data.result.uctResult.uctCodeCategoryList.uctCodeCategories.uctCodeCategory, system));
    });
  };

var compare = function(a,b) {
  if (a.id < b.id){ return -1; }
  if (a.id > b.id){ return 1; }
  return 0;
};

var formatCode = function(data, system) {

  var COMMENT =
  "// This file was automatically generated for " + system + " in default format 'all'.\n\n" +
  "// If your app needs a different format of CMS file for a given code, override the 'format' property.";
  var QUOT = "\"";
  var EOL = ",";
  var HEADER_LINE = "module.exports = [";
  var NWLN = "\n";
  var CLS = "];";
  var result = '';

  // console.log(COMMENT);
  // console.log(HEADER_LINE);
  result += COMMENT + NWLN + HEADER_LINE + NWLN;

  // console.log('result.uctResult.uctCodeCategoryList.uctCodeCategories.uctCodeCategory', result.uctResult.uctCodeCategoryList.uctCodeCategories.uctCodeCategory);
  var codes = data.sort(compare).map(function(c, i, arr) {

    if(i === arr.length-1)  {
          EOL = "";
    }

    // console.log('{ file: "' + system + "_" + c.id + '.js", code: ' + QUOT + c.id + QUOT + ', name: ' + QUOT + c.name + QUOT + ', system:'+ QUOT + system + QUOT +', format: "both" }' + EOL + NWLN);
    result += '{ file: "' + system + "_" + c.id + '.js", code: ' + QUOT + c.id + QUOT  + ', system: '+ QUOT + system + QUOT +', format: "all", name: ' + QUOT + c.name + QUOT + ' }' + EOL + NWLN;
    return;
  });

  result += CLS;
  return result;

};

module.exports = {
  getCodeCategoriesList : getCodeCategoriesList,
  formatCode : formatCode
};

}());

//curl -X POST -H 'Content-Type: text/xml; charset=utf-8' -H 'SOAPAction:;' --data-binary '<msgHeader' https://policy-ws.alliance.apps.allstate.com:443/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl
