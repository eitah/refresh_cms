(function (){'use strict';

  var root = require('../root');
  var soapSvcConfig = require('./soap_service_config');
  var restSvcConfig = require('./rest_service_config');
  var loggerSetting = require('./logger_config');

  function getApplicationRootPath(){
    return root.path;
  }
            
  var localOptions = {
    vcap : {
      services: {
        "test": {
            "name": "test",
            "label": "user-provided",
            "alliance" : soapSvcConfig.allianceSvcSettings.preproduction,
            "alliancePolicyInquiryLayer7" : soapSvcConfig.alliancePolicyInquirySvcSettings.preproduction,
            "alliancePolicyActivityHistory": soapSvcConfig.alliancePolicyActivityHistorySvcSettings.preproduction,
            "allianceActivityHistoryLayer7": restSvcConfig.allianceActivityHistoryRestApi.preproduction,
            "alliancePolicyNarratives": soapSvcConfig.alliancePolicyNarrativeSvcSettings.preproduction,
            "alliancePolicyNarrativesLayer7": restSvcConfig.alliancePolicyNarrativesRestApi.preproduction,
            "ipsInstallmentSchedule": soapSvcConfig.ipsSvcSettings.preproduction,
            "ipsPaymentInquiry": soapSvcConfig.ipsPaymentInqSvcSettings.preproduction,
            "tibcoBillingSummary" : soapSvcConfig.tibcoSvcBillingSummarySettings.preproduction,
            "tibcoBillingTransactionHistory": soapSvcConfig.tibcoSvcBillingTransactionHistorySettings.preproduction,
            "tibcoBillingActivity": soapSvcConfig.tibcoSvcBillingActivitySettings.preproduction,
            "tibcoBillingPreferences" : soapSvcConfig.tibcoSvcBillingPreferenceSettings.preproduction,
            "tibcoBillingHistory" : soapSvcConfig.tibcoSvcBillingHistorySettings.preproduction,
            "tibcoPaymentHistory" : soapSvcConfig.tibcoSvcPaymentHistorySettings.preproduction,
            "certificateFileName" : "polaris_base64.cer",
            "soapProcessorServicePath": getApplicationRootPath() + "/test/integration/mockService/mock_soap_processor.js",
            "restProcessorServicePath": getApplicationRootPath() + "/test/integration/mockService/mock_rest_processor.js",
            "betEventListener": restSvcConfig.betListenerRestApi.test,
            "setLogger": loggerSetting.setLogger,
            "analyticsScript": "//assets.adobedtm.com/b46e318d845250834eda10c5a20827c045a4d76f/satelliteLib-3a1f4c2b8d5c02306966683798d27a3d6a00241f-staging.js"
          },
        "development": 
          {
            "name": "development",
            "label": "user-provided",
            "alliance": soapSvcConfig.allianceSvcSettings.preproduction,
            "alliancePolicyInquiryLayer7" : soapSvcConfig.alliancePolicyInquirySvcSettings.preproduction,
            "alliancePolicyActivityHistory": soapSvcConfig.alliancePolicyActivityHistorySvcSettings.preproduction,
            "allianceActivityHistoryLayer7": restSvcConfig.allianceActivityHistoryRestApi.preproduction,
            "alliancePolicyNarratives": soapSvcConfig.alliancePolicyNarrativeSvcSettings.preproduction,
            "alliancePolicyNarrativesLayer7": restSvcConfig.alliancePolicyNarrativesRestApi.preproduction,
            "ipsInstallmentSchedule": soapSvcConfig.ipsSvcSettings.preproduction,
            "ipsPaymentInquiry": soapSvcConfig.ipsPaymentInqSvcSettings.preproduction,
            "tibcoBillingSummary" : soapSvcConfig.tibcoSvcBillingSummarySettings.preproduction,
            "tibcoBillingTransactionHistory": soapSvcConfig.tibcoSvcBillingTransactionHistorySettings.preproduction,
            "tibcoBillingActivity": soapSvcConfig.tibcoSvcBillingActivitySettings.preproduction,
            "tibcoBillingPreferences" : soapSvcConfig.tibcoSvcBillingPreferenceSettings.preproduction,
            "tibcoBillingHistory" : soapSvcConfig.tibcoSvcBillingHistorySettings.preproduction,
            "tibcoPaymentHistory" : soapSvcConfig.tibcoSvcPaymentHistorySettings.preproduction,
            "certificateFileName" : "polaris_base64.cer",
            "soapProcessorServicePath": getApplicationRootPath() + "/common/soap_processor.js",
            "restProcessorServicePath": getApplicationRootPath() + "/common/rest_processor.js",
            "betEventListener": restSvcConfig.betListenerRestApi.development,
            "setLogger": loggerSetting.setLogger,
            "analyticsScript": "//assets.adobedtm.com/b46e318d845250834eda10c5a20827c045a4d76f/satelliteLib-3a1f4c2b8d5c02306966683798d27a3d6a00241f-staging.js"
          },
        "integration": 
          {
            "name": "integration",
            "label": "user-provided",
            "alliance": soapSvcConfig.allianceSvcSettings.preproduction,
            "alliancePolicyActivityHistory": soapSvcConfig.alliancePolicyActivityHistorySvcSettings.preproduction,
            "alliancePolicyNarratives": soapSvcConfig.alliancePolicyNarrativeSvcSettings.preproduction,  
            "ipsInstallmentSchedule": soapSvcConfig.ipsSvcSettings.preproduction,
            "ipsPaymentInquiry": soapSvcConfig.ipsPaymentInqSvcSettings.preproduction,
            "tibcoBillingSummary" : soapSvcConfig.tibcoSvcBillingSummarySettings.preproduction,
            "tibcoBillingTransactionHistory": soapSvcConfig.tibcoSvcBillingTransactionHistorySettings.preproduction,
            "tibcoBillingActivity": soapSvcConfig.tibcoSvcBillingActivitySettings.preproduction,
            "tibcoBillingPreferences" : soapSvcConfig.tibcoSvcBillingPreferenceSettings.preproduction,
            "tibcoBillingHistory" : soapSvcConfig.tibcoSvcBillingHistorySettings.preproduction,
            "tibcoPaymentHistory" : soapSvcConfig.tibcoSvcPaymentHistorySettings.preproduction,
            "certificateFileName" : "polaris_base64.cer",
            "soapProcessorServicePath": getApplicationRootPath() + "/common/soap_processor.js",
            "restProcessorServicePath": getApplicationRootPath() + "/common/rest_processor.js",
            "betEventListener": restSvcConfig.betListenerRestApi.integration,
            "setLogger": loggerSetting.setLogger,
            "analyticsScript": "//assets.adobedtm.com/b46e318d845250834eda10c5a20827c045a4d76f/satelliteLib-3a1f4c2b8d5c02306966683798d27a3d6a00241f-staging.js"
          },
        "staging": 
          {
            "name": "staging",
            "label": "user-provided",
            "alliance": soapSvcConfig.allianceSvcSettings.preproduction,
            "alliancePolicyActivityHistory": soapSvcConfig.alliancePolicyActivityHistorySvcSettings.preproduction,
            "alliancePolicyNarratives": soapSvcConfig.alliancePolicyNarrativeSvcSettings.preproduction,  
            "ipsInstallmentSchedule": soapSvcConfig.ipsSvcSettings.preproduction,
            "ipsPaymentInquiry": soapSvcConfig.ipsPaymentInqSvcSettings.preproduction,
            "tibcoBillingSummary" : soapSvcConfig.tibcoSvcBillingSummarySettings.preproduction,
            "tibcoBillingTransactionHistory": soapSvcConfig.tibcoSvcBillingTransactionHistorySettings.preproduction,
            "tibcoBillingActivity": soapSvcConfig.tibcoSvcBillingActivitySettings.preproduction,
            "tibcoBillingPreferences" : soapSvcConfig.tibcoSvcBillingPreferenceSettings.preproduction,
            "tibcoBillingHistory" : soapSvcConfig.tibcoSvcBillingHistorySettings.preproduction,
            "tibcoPaymentHistory" : soapSvcConfig.tibcoSvcPaymentHistorySettings.preproduction,
            "certificateFileName" : "polaris_base64.cer",
            "soapProcessorServicePath": getApplicationRootPath() + "/common/soap_processor.js",
            "restProcessorServicePath": getApplicationRootPath() + "/common/rest_processor.js",
            "setLogger": loggerSetting.setLogger,
            "analyticsScript": "//assets.adobedtm.com/b46e318d845250834eda10c5a20827c045a4d76f/satelliteLib-3a1f4c2b8d5c02306966683798d27a3d6a00241f-staging.js"
          },
        "uat": 
          {
            "name": "uat",
            "label": "user-provided",
            "alliance": soapSvcConfig.allianceSvcSettings.preproduction,
            "alliancePolicyActivityHistory": soapSvcConfig.alliancePolicyActivityHistorySvcSettings.preproduction,
            "alliancePolicyNarratives": soapSvcConfig.alliancePolicyNarrativeSvcSettings.preproduction,  
            "ipsInstallmentSchedule": soapSvcConfig.ipsSvcSettings.preproduction,
            "ipsPaymentInquiry": soapSvcConfig.ipsPaymentInqSvcSettings.preproduction,
            "tibcoBillingSummary" : soapSvcConfig.tibcoSvcBillingSummarySettings.preproduction,
            "tibcoBillingTransactionHistory": soapSvcConfig.tibcoSvcBillingTransactionHistorySettings.preproduction,
            "tibcoBillingActivity": soapSvcConfig.tibcoSvcBillingActivitySettings.preproduction,
            "tibcoBillingPreferences" : soapSvcConfig.tibcoSvcBillingPreferenceSettings.preproduction,
            "tibcoBillingHistory" : soapSvcConfig.tibcoSvcBillingHistorySettings.preproduction,
            "tibcoPaymentHistory" : soapSvcConfig.tibcoSvcPaymentHistorySettings.preproduction,
            "certificateFileName" : "polaris_base64.cer",
            "soapProcessorServicePath": getApplicationRootPath() + "/common/soap_processor.js",
            "restProcessorServicePath": getApplicationRootPath() + "/common/rest_processor.js",
            "setLogger": loggerSetting.setLogger,
            "analyticsScript": "//assets.adobedtm.com/b46e318d845250834eda10c5a20827c045a4d76f/satelliteLib-3a1f4c2b8d5c02306966683798d27a3d6a00241f-staging.js"
          },
          "production": {
            "name": "production",
            "alliance" : soapSvcConfig.allianceSvcSettings.production,
            "alliancePolicyActivityHistory": soapSvcConfig.alliancePolicyActivityHistorySvcSettings.production,
            "alliancePolicyNarratives": soapSvcConfig.alliancePolicyNarrativeSvcSettings.production,
            "ipsInstallmentSchedule": soapSvcConfig.ipsSvcSettings.production,
            "tibcoBillingSummary" : soapSvcConfig.tibcoSvcBillingSummarySettings.production,
            "tibcoBillingTransactionHistory": soapSvcConfig.tibcoSvcBillingTransactionHistorySettings.production,
            "tibcoBillingActivity": soapSvcConfig.tibcoSvcBillingActivitySettings.production,
            "tibcoBillingPreferences" : soapSvcConfig.tibcoSvcBillingPreferenceSettings.production,
            "tibcoBillingHistory" : soapSvcConfig.tibcoSvcBillingHistorySettings.production,
            "tibcoPaymentHistory" : soapSvcConfig.tibcoSvcPaymentHistorySettings.production,
            "certificateFileName": "polaris_base64.cer",
            "soapProcessorServicePath": getApplicationRootPath() + "/common/soap_processor.js",
            "restProcessorServicePath": getApplicationRootPath() + "/common/rest_processor.js",
            "setLogger": loggerSetting.setLogger,
            "analyticsScript": "//assets.adobedtm.com/b46e318d845250834eda10c5a20827c045a4d76f/satelliteLib-3a1f4c2b8d5c02306966683798d27a3d6a00241f.js"
          }
      }
    }
  };

  var env = process.env.NODE_ENV || 'development';

  loggerSetting.setLogger(env);

  module.exports = localOptions.vcap.services[env];

}());
