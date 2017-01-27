(function () {
    'use strict';

    var expect = require('chai').expect;
    var rewire = require('rewire');
    // var refreshCMSCodes = require('../../src/refresh_cms_codes');
    var translate = require('../../src/translate_app_group');
    var assert = require('assert');
    var Promise = require('bluebird');

    var code, somecode, othercode, mockCMSResponse;

    describe('Translate App Group', function () {
        beforeEach(function (done) {
            code = {
                fromSystem: 'alliance',
                fromCode: '15014',
                toSystem: 'common',
                toCode: '15148',
                format: 'shortName'
            };
            somecode = {
                fromCode: {
                    code: 'DP',
                    shortDesc: 'Domestic Partner',
                    longDesc: 'Domestic Partner',
                    startDate: '2005-01-24T00:00:00.000Z',
                    sortOrder: 0,
                    uniqueId: 0,
                    originalValue: 'Domestic Partner'
                },
                toCode: {
                    code: 'C',
                    shortDesc: 'Domestic Partner',
                    longDesc: 'Domestic Partner',
                    startDate: '2012-07-03T00:00:00.000Z',
                    sortOrder: 0,
                    uniqueId: 0,
                    originalValue: 'Domestic Partner'
                },
                startDt: '0001-01-01T00:00:00.000Z'
            },
                othercode = {
                    fromCode: {
                        code: 'DI',
                        shortDesc: 'Divorced',
                        longDesc: 'Divorced',
                        startDate: '1997-01-01T00:00:00.000Z',
                        sortOrder: 0,
                        uniqueId: 0,
                        originalValue: 'Divorced'
                    },
                    toCode: {
                        code: 'D',
                        shortDesc: 'Divorced',
                        longDesc: 'Divorced',
                        startDate: '2012-07-03T00:00:00.000Z',
                        sortOrder: 0,
                        uniqueId: 0,
                        originalValue: 'Divorced'
                    },
                    startDt: '0001-01-01T00:00:00.000Z'
                }
            mockCMSResponse = {
                result: {
                    msgStatus: {msgStatusCd: 'Success', extendedStatusList: [Object]},
                    uctResult: {uctTranslationList: {uctTranslations: {uctTranslation: [somecode, othercode]}}}
                },
                code: code
            };
            done();
        });

        describe('format translation', function () {
            it('when given a cms response, returns cms codes row in short name format', function (done) {
                var result = translate.formatTranslation(mockCMSResponse.result.uctResult.uctTranslationList.uctTranslations.uctTranslation,
                    code)
                try {
                    expect(result).to.contain('// This file was automatically generated for alliance code 15014 in default format \'ShortName\'');
                    expect(result).to.contain('"DP": "C",	// Domestic Partner => Domestic Partner');
                    expect(result).to.contain('"DI": "D"	// Divorced => Divorced');
                    done();
                }
                catch (e) {
                    done(e);
                }
            });

            it('when given an invalid format, returns an empty codes object with the string \'invalid format\'', function (done) {
                var result = translate.formatTranslation(mockCMSResponse.result.uctResult.uctTranslationList.uctTranslations.uctTranslation, 'aninvalidformat')
                try {
                    expect(result).to.equal('module.exports = {\ninvalid format\n};')
                    done();
                }
                catch (e) {
                    done(e);
                }
            });

            it('when given an invalid short description, returns an empty codes object for that row only', function (done) {
                mockCMSResponse.result.uctResult.uctTranslationList.uctTranslations.uctTranslation[0].fromCode.shortDesc = null;
                var result = translate.formatTranslation(mockCMSResponse.result.uctResult.uctTranslationList.uctTranslations.uctTranslation,
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
