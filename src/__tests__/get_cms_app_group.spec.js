(function () {
    'use strict';

    jest.unmock('../get_cms_application_group');

    var translate = require('../get_cms_application_group');
    var assert = require('assert');

    var code, somecode, othercode, mockCMSResponse;


    describe('get cms application group', function () {
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

        describe('format translation', function () {
            it('when given a cms response, returns cms codes row in short name format', function (done) {
                var result = translate.formatCode(mockCMSResponse.result.uctResult.uctCodeCategoryList.uctCodeCategories.uctCodeCategory,
                    code)
                try {
                    console.log(result);
                    expect(result).to.contain('// This file was automatically generated for alliance code 15014 in default format \'ShortName\'');
                    expect(result).to.contain('"DP": "C",	// Domestic Partner => Domestic Partner');
                    expect(result).to.contain('"DI": "D"	// Divorced => Divorced');
                    expect(result).to.contain('cat');
                    done();
                }
                catch (e) {
                    done(e);
                }
            });

            it('when given an invalid format, returns an empty codes object with the string \'invalid format\'', function (done) {
                var result = translate.formatCode(mockCMSResponse.result.uctResult.uctCodeCategoryList.uctCodeCategories.uctCodeCategory, 'aninvalidformat')
                try {
                    // console.log(result);
                    expect(result).to.equal('module.exports = {\ninvalid format\n};')
                    done();
                }
                catch (e) {
                    done(e);
                }
            });

            it('when given an invalid short description, returns an empty codes object for that row only', function (done) {
                mockCMSResponse.result.uctResult.uctCodeCategoryList.uctCodeCategories.uctCodeCategory[0].fromCode.shortDesc = null;
                var result = translate.formatCode(mockCMSResponse.result.uctResult.uctCodeCategoryList.uctCodeCategories.uctCodeCategory,
                    code);
                try {
                    expect(result).to.contain('"DP": "C",	// NULL => Domestic Partner');
                    expect(result).to.contain('"DI": "D"	// Divorced => Divorced');
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
}());
