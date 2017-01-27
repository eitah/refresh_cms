(function () {
    'use strict';
    var Promise = require('bluebird');
    var soap = require('soap');
    var getLogMessage = require('../common/log_helper');
    require('../config/config');
    var dateHelper = require('../common/date_Helper');
    var releaseName = '';
    var applicationGroup = '';
    var systemMap = require('../resources/system_map');

    var defaultCMSCodes = '../resources/my_app_cms_codes';
    var defaultFilePath = './common/cms_codes';

    var fs = require('fs');
    var cms_wsdl = "http://edmdev/edm/uctwebservice/decodeservice_v2.asmx?wsdl";
    var allstateSoapHeader = "<msgHeader xmlns='http://allstate.com/xml/standard/soapHeader/v1' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><msgId>1</msgId><msgDateTime>1999-05-31T13:20:00-05:00</msgDateTime><sendingSystemCd>SMCE-BillingExplanation</sendingSystemCd><sendingSystemInfo><systemId>COMPOZED-BF-02</systemId></sendingSystemInfo></msgHeader>";

    var getCodesList = function (inputCodes, outputPath) {

        var myCodes = (inputCodes) ? require(inputCodes) : require(defaultCMSCodes);
        var filePath = (outputPath) ? outputPath : defaultFilePath;

        myCodes.forEach(function (code) {
            var mySystem = systemMap.filter(function (s) {
                return s.system === code.system;
            });

            if (mySystem[0]) {
                releaseName = mySystem[0].releaseName;
                applicationGroup = mySystem[0].applicationGroup;
            } else {
                // TODO: test error logic
                console.log('Error: Invalid System Type for code: ' + code.code);
                return new Error('Invalid System Type');
            }

            var soapBody = "<getCodesListRequest xmlns='http://allstate.com/enterprise/codesManagement/codeDecode_v2'>" +
                "<retrievalMethod xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>usingCodeCategoryId</retrievalMethod>" +
                "<releaseName xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>" + releaseName + "</releaseName>" +
                "<localeId xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>1001</localeId>" +
                "<applicationGroup xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>" + applicationGroup + "</applicationGroup>" +
                "<codeCategoryId xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>" + code.code + "</codeCategoryId>" +
                "</getCodesListRequest>";
            var cmsPromise = getCMSPromise(cms_wsdl, allstateSoapHeader, "getCodesList", soapBody, code);

            cmsPromise
                .then(function (data) {
                    console.log('Writing ' + "CMS code " + data.code.code + " (" + data.code.system + ") => \t" + data.code.file);
                    var finalPath = filePath + '/' + data.code.file;

                    persistResponse(finalPath, formatCode(data.result, data.code.format));
                })
                .catch(function (reason) {
                    console.log('CMS lookup failed!!! Reason:', reason);
                });
        });
    };

    var getCMSPromise = function (wsdl, header, method, body, code) {
        var functionName = 'getCMSPromise: ';
        return new Promise(function (resolve, reject) {
            try {
                soap.createClient(wsdl, function (err, client) {
                    if (err) {
                        console.log('error creating soap client ' + wsdl);
                        console.log(err.stack);
                    }
                    else {
                        client.addSoapHeader(header);

                        client[method](body, function (err, result) {
                            if (err) {
                                // console.log('Error is', err, '\n \n SOAP error for code #', code.code, 'and file', code.file, '\n');
                                logger.error(getLogMessage(module.filename, functionName, 'SOAP error for code #' + code.code + 'and file' + code.file, err));
                                return reject('SOAP error for code #' + code.code + 'and file' + code.file + '\n' + err);
                            }
                            if (result.msgStatus.msgStatusCd !== 'Success') {
                                console.log('\nCMS Lookup failed for code', code.code, 'and file', code.file, '\n');
                                logger.error(getLogMessage(module.filename, functionName, 'CMS Lookup failed for code ' + code.code + ' and file ' + code.file, err));
                                return reject('CMS Lookup failed for code ' + code.code + ' and file ' + code.file + '\n');
                            }
                            else {
                                resolve({result: result, code: code});
                            }
                        });
                    }
                });
            }
            catch (e) {
                console.log('error thrown while creating soap client: ', e.stack);
                return reject(e);
            }
        });
    };

    var compare = function (a, b) {
        if (a.code < b.code) {
            return -1;
        }
        if (a.code > b.code) {
            return 1;
        }
        if (dateHelper.dateOrder(a.startDate, b.startDate) === ">") {
            return -1;
        } // If duplicate non expired codes, sort by newest first (date descending)
        if (dateHelper.dateOrder(a.startDate, b.startDate) === "<") {
            return 1;
        } // If duplicate non expired codes, sort by newest first (date descending)
        return 0;
    };

    var formatCode = function (data, format) {
        var QUOT = "\"";
        var EOL = ",";
        var HEADER_LINE = "module.exports = {";
        var NWLN = "\n";
        var FOOTER_LINE = "};";
        var SHRT = ":{ \"ShortName\": ";
        var LNG = ", \"LongName\": ";
        var ORIGVALUE = ", \"OriginalValue\": ";
        var STDATE = ", \"StartDate\": ";
        var ENDDATE = ", \"EndDate\": ";
        var UNIQUEID = ", \"UniqueId\": ";
        var CLS = " }";
        var result = '';
        var myLine = '';

        var sortedData = data.uctResult.uctCodeList.uctCodes.uctCode.filter(function (d) {
            return (d.endDate === undefined);
        }).sort(compare);

        result += HEADER_LINE + NWLN;
        sortedData.every(function (item) {
            if (sortedData.lastIndexOf(item) === sortedData.length - 1) {
                EOL = "";
            }

            if (format === 'all') {
                myLine = QUOT + item.code + QUOT +
                    SHRT + QUOT + (item.shortDesc || '') + QUOT +
                    LNG + QUOT + (item.longDesc || '') + QUOT +
                    ORIGVALUE + QUOT + (item.originalValue || '') + QUOT +
                    STDATE + QUOT + (item.startDate || '') + QUOT +
                    ENDDATE + QUOT + (item.endDate || '') + QUOT +
                    UNIQUEID + QUOT + (item.uniqueId || '') + QUOT +
                    CLS + EOL + NWLN;
            } else if (format === 'both') {
                myLine = QUOT + item.code + QUOT + SHRT + QUOT + (item.shortDesc || '') + QUOT + LNG + QUOT + (item.longDesc || '') + QUOT + CLS + EOL + NWLN;
            } else if (format === 'longName') {
                myLine = QUOT + item.code + QUOT + " : " + QUOT + (item.longDesc || '') + QUOT + EOL + NWLN;
            } else if (format === 'shortName') {
                myLine = QUOT + item.code + QUOT + " : " + QUOT + (item.shortDesc || '') + QUOT + EOL + NWLN;
            } else {
                return false;
            }
            result += myLine;
            return true;
        });

        if (myLine === '') {
            return HEADER_LINE + NWLN + 'invalid format' + NWLN + FOOTER_LINE;
        }

        result += FOOTER_LINE;
        return result;
    };


    //Save files
    var persistResponse = function (fileName, data) {
        // var functionName = 'persistResponse: ';
        console.log('persist response hit');
        setTimeout(function () {return('cat')}, 1000)
        fs.writeFile(fileName, data, function (err) {
            // console.log('callback hit');
            // console.log('error is', err);
            if (err) {
                console.log('Error in writing your file', err);
                return (new Error('Error in writing your file: ' + err));
            }
            // console.log('Success!');
            return ('Success!');
        });
    };

    var triggerRefresh = function () {
        getCodesList();
    };

    module.exports = {
        getCodesList: getCodesList,
        triggerRefresh: triggerRefresh,
        formatCode: formatCode,
        getCMSPromise: getCMSPromise,
        persistResponse: persistResponse
    };
}());


//curl -X POST -H 'Content-Type: text/xml; charset=utf-8' -H 'SOAPAction:;' --data-binary '<msgHeader' https://policy-ws.alliance.apps.allstate.com:443/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl
