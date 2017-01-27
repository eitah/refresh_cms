(function (){'use strict';

  var Promise = require('bluebird');
  var soap = require('soap');
  var getLogMessage = require('../common/log_helper');
  require('../config/config');
  var refreshCMSCodes = require('./refresh_cmscodes');
  var systemMap = require('../resources/system_map');

  var defaultCMSCodes = './resources/my_app_translations';
  var defaultFilePath = './common/translations';

  var fs = require('fs');
  var cms_wsdl = "http://edmdev/edm/uctwebservice/decodeservice_v2.asmx?wsdl";
  var allstateSoapHeader = '<msgHeader xmlns="http://allstate.com/xml/standard/soapHeader/v1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><msgId>1</msgId><msgDateTime>1999-05-31T13:20:00-05:00</msgDateTime><sendingSystemCd>SMCE-BillingExplanation</sendingSystemCd><sendingSystemInfo><systemId>COMPOZED-BF-02</systemId></sendingSystemInfo></msgHeader>';


var translateAppGroup = function(inputCodesPath, outputPath) {
  var myCodes = (inputCodesPath) ? require(inputCodesPath) : require(defaultCMSCodes) ;
  var filePath = (outputPath) ? outputPath : defaultFilePath;

  myCodes.forEach(function(code) {
    // console.log('code', code);
    var mySystem = systemMap.filter( function(s) { return s.system === code.fromSystem; });
    if (mySystem[0]){
      code.releaseName = mySystem[0].releaseName;
      code.applicationGroup = mySystem[0].applicationGroup;
    } else {
      // TODO: test error logic
      console.log('Error: Invalid System Type for code: ' + code.code);
      return new Error('Invalid System Type');
    }

    var soapBody = '<getTranslationsListRequest xmlns="http://allstate.com/enterprise/codesManagement/codeDecode_v2">' +
      '<retrievalMethod xmlns="http://allstate.com/enterprise/codesManagement/codeDecode">usingCodeCategoryId</retrievalMethod>' +
      '<releaseName xmlns="http://allstate.com/enterprise/codesManagement/codeDecode">' + code.releaseName + '</releaseName>' +
      '<localeId xmlns="http://allstate.com/enterprise/codesManagement/codeDecode">1001</localeId>' +
      '<applicationGroup xmlns="http://allstate.com/enterprise/codesManagement/codeDecode">' + code.applicationGroup + '</applicationGroup>' +
      '<fromCodeCategoryId xmlns="http://allstate.com/enterprise/codesManagement/codeDecode">' + code.fromCode + '</fromCodeCategoryId>' +
      '<toCodeCategoryId xmlns="http://allstate.com/enterprise/codesManagement/codeDecode">' + code.toCode + '</toCodeCategoryId>' +
      '<versionExt xmlns="http://allstate.com/enterprise/codesManagement/codeDecode">xml</versionExt>' +
    '</getTranslationsListRequest>';

    var cmsPromise = refreshCMSCodes.getCMSPromise(cms_wsdl, allstateSoapHeader, "getTranslationsList", soapBody, code);
    var fileName = filePath + '/' + code.fromSystem.replace(' ', '_') + '_' + code.fromCode + '_to_' + code.toSystem.replace(' ', '_') + "_" + code.toCode + ".js";
    // console.log('filename', fileName);

  cmsPromise
    .then(function(data) {
      if (data.result.uctResult.uctTranslationList === null) {
        // console.log('data is', data.result.uctResult.uctTranslationList.uctTranslations);
        return new Error('No relationship found for specified codes:' + data.code.fromCode + ' and ' + data.code.toCode );
      } else {
        // console.log('data', data.result, data.code)
        console.log('Writing translation from ' + data.code.fromSystem + ' code ' + data.code.fromCode + ' to ' +
                    data.code.toSystem + ' code ' + data.code.toCode +' using release name ' +
                    data.code.releaseName + ' and application group ' + data.code.applicationGroup);
        // console.log(formatCode(data.result.uctResult.uctTranslationList.uctTranslations.uctTranslation, data.code.format, data.code.fromSystem));
        refreshCMSCodes.persistResponse(fileName,
                        formatTranslation(data.result.uctResult.uctTranslationList.uctTranslations.uctTranslation,
                                          data.code)
                        );
      }
    })
  });
};

var compareIds = function(a,b) {
  if (a.id < b.id){ return -1; }
  if (a.id > b.id){ return 1; }
  return 0;
};

var formatTranslation = function(data, code) {

  var COMMENT =
  "// This file was automatically generated for " + code.fromSystem + " code " + code.fromCode + " in default format 'ShortName'.\n\n" +
  "// If your app needs a different format of CMS file for a given code translation, override the 'format' property.";
  var QUOT = "\"";
  var EOL = ",";
  var HEADER_LINE = "module.exports = {";
  var NWLN = "\n";
  var TAB = "\t";
  var SHRT = ":{ \"ShortName\": ";
  var CLS = "};";
  var LNG = ", \"LongName\": ";
  var result = '';

  var codes = data.sort(compareIds).map(function(c, i, arr) {
    if(i === arr.length-1)  { EOL = ""; }
    switch (code.format) {
      case 'shortName':
        // console.log('{  TAB + QUOT + c.fromCode.code + QUOT +" : " + QUOT + (c.toCode.code||'') + QUOT + EOL + ' // '+ c.fromCode.shortDesc + ' => ' + c.toCode.shortDesc + NWLN);
        return TAB + QUOT + c.fromCode.code + QUOT +": " + QUOT + (c.toCode.code||'') + QUOT + EOL + TAB + '// ' + (c.fromCode.shortDesc||'NULL') + ' => ' + (c.toCode.shortDesc||'null');
      default:
        return 'Code format invalid'
    }
  });

  if (codes[0] === 'Code format invalid') {
    return HEADER_LINE + NWLN + 'invalid format' + NWLN + CLS;
  } else {
    return COMMENT + NWLN + HEADER_LINE + NWLN + codes.join(NWLN) + NWLN + CLS;
  }
  return result;

};

var translate = {
    translateAppGroup : translateAppGroup,
    formatTranslation: formatTranslation
};

module.exports = translate;

}());

//curl -X POST -H 'Content-Type: text/xml; charset=utf-8' -H 'SOAPAction:;' --data-binary '<msgHeader' https://policy-ws.alliance.apps.allstate.com:443/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl
