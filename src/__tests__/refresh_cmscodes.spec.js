(function () {
    'use strict';

    jest.unmock('../refresh_cmscodes');

    var refreshCMSCodes = require('../../src/refresh_cmscodes');
    var assert = require('assert');
    var Promise = require('bluebird');

    var code, somecode, othercode, mockCMSResponse;

    describe('refresh cms codes', function () {
        beforeEach(function (done) {
            code = {file: 'termination_reason_boat_15123.js', code: '15123', system: 'alliance', format: 'longName'};
            somecode = {
                code: '06',
                shortDesc: 'POLICY TRANSFER',
                longDesc: 'Policy Transfer',
                startDate: '2013-04-29T00:00:00.000Z',
                sortOrder: '0',
                uniqueId: '1263696',
                originalValue: 'Policy Transfer'
            };
            othercode = {
                code: '07',
                shortDesc: 'POLICY TRANSFER2',
                longDesc: 'Policy Transfer2',
                startDate: '2013-04-29T00:00:00.000Z',
                sortOrder: 0,
                uniqueId: 1263697,
                originalValue: 'Policy Transfer2'
            };
            mockCMSResponse = {
                result: {
                    msgStatus: {msgStatusCd: 'Success', extendedStatusList: [Object]},
                    uctResult: {uctCodeList: {uctCodes: {uctCode: [somecode, othercode]}}}
                },
                code: ' { file: \'termination_reason_boat_15123.js\', code: \'15123\', system: \'alliance\', format: \'longName\' }'
            };
            done();
        });
        describe('persist response', function () {
            xit('accepts valid parameters for filesystem and calls fs to write file', function (done) {
                var fs = jest.fn();
                var finalPath = '../ dog.js';
                var data = 'this is the file you want to write';
                var callPersistResponse = new Promise(function (resolve, reject) {resolve(refreshCMSCodes.persistResponse(finalPath, data))});
                callPersistResponse
                    .then(function(data) {
                        console.error('this is inside the promise!');
                        console.log('data is', data)
                        expect(fs).toBeCalledWith('mock set value action');

                        done();
                    });

            });
            xit('accepts invalid parameters for filesystem and refuses to write file', function (done) {
                var file = 'dog.js';
                var filePath = "~"
                var data = 'this is the file you want to write';

                console.log('before asynch call');
                try {
                    var result = refreshCMSCodes.persistResponse(file, filePath, data);
                    expect(typeof result).to.equal('object');
                    done();
                } catch (e) {
                    // console.log('e from try catch', e);
                    console.log(e.error, 'is');
                    done(e);
                }
            });
        });

        describe('gets CMS Promise', function () {
            it('when given a row, returns cms codes row', function (done) {
                var cms_wsdl = "http://edmdev/edm/uctwebservice/decodeservice_v2.asmx?wsdl";
                var allstateSoapHeader = "<msgHeader xmlns='http://allstate.com/xml/standard/soapHeader/v1' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><msgId>1</msgId><msgDateTime>1999-05-31T13:20:00-05:00</msgDateTime><sendingSystemCd>SMCE-BillingExplanation</sendingSystemCd><sendingSystemInfo><systemId>COMPOZED-BF-02</systemId></sendingSystemInfo></msgHeader>";
                var soapBody = "<getCodesListRequest xmlns='http://allstate.com/enterprise/codesManagement/codeDecode_v2'><retrievalMethod xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>usingCodeCategoryId</retrievalMethod><releaseName xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>Release 1</releaseName><localeId xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>1001</localeId><applicationGroup xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>BE</applicationGroup><codeCategoryId xmlns='http://allstate.com/enterprise/codesManagement/codeDecode'>15123</codeCategoryId></getCodesListRequest>"
                var code = "{ file: 'termination_reason_boat_15123.js', code: '15123', system: 'alliance', format: 'longName' }";
                var cmsPromise = refreshCMSCodes.getCMSPromise(cms_wsdl, allstateSoapHeader, "getCodesList", soapBody, code);
                cmsPromise
                // console.log(data.result.uctResult.uctCodeList.uctCodes.uctCode);
                    .then(function (data) {
                            expect(data.result.msgStatus.msgStatusCd).toBe('Success');
                            done();
                        }
                    );
            });
        });

        describe('format CMS code', function () {
            it('when given a cms response, returns cms codes row in longname format', function (done) {
                var result = refreshCMSCodes.formatCode(mockCMSResponse.result, code.format)
                try {
                    expect(result).to.equal('module.exports = {\n"06" : "Policy Transfer",\n"07" : "Policy Transfer2"\n};')
                    done();
                }
                catch (e) {
                    done(e);
                }
            });

            it('when given an invalid format, returns an empty codes object with the string \'invalid format\'', function (done) {
                var result = refreshCMSCodes.formatCode(mockCMSResponse.result, 'aninvalidformat')
                try {
                    expect(result).to.equal('module.exports = {\ninvalid format\n};')
                    done();
                }
                catch (e) {
                    done(e);
                }
            });

            it('when given an invalid shortdesc, returns an empty codes object for that row only', function (done) {
                mockCMSResponse.result.uctResult.uctCodeList.uctCodes.uctCode[0].longDesc = null;
                var result = refreshCMSCodes.formatCode(mockCMSResponse.result, code.format)
                try {
                    expect(result).to.equal('module.exports = {\n"06" : "",\n"07" : "Policy Transfer2"\n};')
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
}());

// var soap = require('soap');
// var getLogMessage = require('../common/log_helper');
// require('../config/config');
// var dateHelper = require('../common/date_Helper');
// var releaseName = '';
// var applicationGroup = '';
// var systemMap = require('../resources/system_map');
//
// var defaultCMSCodes = '../resources/my_app_cms_codes';
// var defaultFilePath = './common/cms_codes';
//
// var cms_wsdl = "http://edmdev/edm/uctwebservice/decodeservice_v2.asmx?wsdl";
// var allstateSoapHeader = "<msgHeader xmlns='http://allstate.com/xml/standard/soapHeader/v1' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><msgId>1</msgId><msgDateTime>1999-05-31T13:20:00-05:00</msgDateTime><sendingSystemCd>SMCE-BillingExplanation</sendingSystemCd><sendingSystemInfo><systemId>COMPOZED-BF-02</systemId></sendingSystemInfo></msgHeader>";
// var soapEnd = "</codeCategoryId>" +
//   "</getCodesListRequest>";
// var soapBody = '';
//

// var wrFunc = function () {
//   console.log('wrFile called');
// }
//
// var fsStub = function () {
//   // writeFile: function(finalPath, data, function(err) {
//   writeFile: wrFunc ()
//   })
// };
// describe('getCodesList', function() {
//
//   beforeEach(function (done){
//     expectedResponse = (JSON.parse(JSON.stringify(response)));
//     soapProcessor.setAssertionData(soapProcessor.scenarios.JSON_RESULT, expectedResponse);
//     done();
//   });
//
//
//   it('accepts valid parameters for CMS and returns a result and code', function(done) {
//     refreshCMSCodes.getCodesList(inputCodes, outputPath, function (err, result) {
//       try{
//         expect(result.dayMonthDue).to.not.equal('');
//         expect(result.dayMonthDue).to.not.equal(undefined);
//         expect(result.dayMonthDue).to.equal('12');
//         done();
//       }
//       catch(e){
//         done(e);
//       }
//     });
//   });
// });
