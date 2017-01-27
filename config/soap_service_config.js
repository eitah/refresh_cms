(function (){'use strict';

var moment = require('moment');

//SOAP Headers
  function getAllstateSoapHeader () {
    return "<msgHeader xmlns='http://allstate.com/xml/standard/soapHeader/v1' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><msgId>1</msgId><msgDateTime>1999-05-31T13:20:00-05:00</msgDateTime><sendingSystemCd>SMCE-BillingExplanation</sendingSystemCd></msgHeader>";
  }

  function getTibcoSoapHeader () {
    return "<msgHeader xmlns='http://allstate.com/xml/standard/soapHeader/v1' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><msgId>1</msgId><msgDateTime>1999-05-31T13:20:00-05:00</msgDateTime><sendingSystemCd>SMCE-BillingExplanation</sendingSystemCd><sendingSystemInfo><systemId>COMPOZED-BF-02</systemId></sendingSystemInfo></msgHeader>";
  }

  function getIPSSoapHeaderPreProd () {
    return "<q1:msgHeader><msgDateTime xmlns='http://allstate.com/xml/standard/soapHeader/v1'>0001-01-01T00:00:00</msgDateTime><sendingSystemCd xmlns='http://allstate.com/xml/standard/soapHeader/v1'>BIS-CPZ-LCL-001</sendingSystemCd><sendingSystemInfo  xmlns='http://allstate.com/xml/standard/soapHeader/v1'/><versionExt xmlns='http://allstate.com/xml/standard/soapHeader/v1'></versionExt></q1:msgHeader>";
  }
  
  function getIPSSoapHeaderProd () {
    return "<q1:msgHeader><msgDateTime xmlns='http://allstate.com/xml/standard/soapHeader/v1'>0001-01-01T00:00:00</msgDateTime><sendingSystemCd xmlns='http://allstate.com/xml/standard/soapHeader/v1'>BIS-CPZ-PRD-001</sendingSystemCd><sendingSystemInfo  xmlns='http://allstate.com/xml/standard/soapHeader/v1'/><versionExt xmlns='http://allstate.com/xml/standard/soapHeader/v1'></versionExt></q1:msgHeader>";
  }
  
  
//SOAP Bodies
  function getAllianceSvcSoapBody (policyNumber, agentNumber, policyDate) {
    return {
      "get-policy-read-web-request-dto":"<get-policy-read-web-request-dto><policy-number>" + policyNumber + "</policy-number>" + 
                      "<agent-id>" + agentNumber +"</agent-id><credentials>???  </credentials><request-id></request-id>" + 
                      "<effective-dt>" + (policyDate || "") + "</effective-dt><activity-history-count></activity-history-count>" + 
                      "<correlation-id>123444444444444444444444444444444444</correlation-id>" + 
                      "<lob-sub-cd></lob-sub-cd><state></state>" + 
                      "<client-system-id></client-system-id><company></company>" + 
                      "<policy-type></policy-type><channel>21</channel><role></role>" + 
                      "<business-function></business-function><application></application>" + 
                      "<transaction-status-cd></transaction-status-cd></get-policy-read-web-request-dto>"
    };
  }

  function getAlliancePolicyInquirySvcSoapBody (policyNumber, asOfDate) {
    if(!policyNumber) {
      return '';
    }
    else {
      return "<v2:PolicyInquiryRq xmlns:v2='http://www.allstate.com/product/PolicyInquiry/v2'><v2:CaseId>1</v2:CaseId>" +
              "<v2:ServiceRequest><v2:PolicyRequest><v2:PolicyNumber>" + policyNumber + "</v2:PolicyNumber>" +
              "<v2:AsOfDt>" + (asOfDate || '') + "</v2:AsOfDt></v2:PolicyRequest></v2:ServiceRequest><v2:QuoteOrPolicy/></v2:PolicyInquiryRq>";
    }
  }

  function getAlliancePolicyActivityHistorySvcSoapBody (policyNumber, agentNumber, lineCode, stateCode, noOfEvents, eventNumber) {
    return {
            "get-policy-read-web-request-dto":"<get-policy-read-web-request-dto>"+
                      "<policy-number>" + policyNumber + "</policy-number>" + 
                      "<agent-id>" + agentNumber +"</agent-id>"+
                      "<credentials>???  </credentials>"+
                      "<correlation-id>123444444444444444444444444444444444</correlation-id>" + 
                      "<lob-sub-cd>" + lineCode + "</lob-sub-cd>"+
                      "<state>" + stateCode + "</state>" + 
                      "<number-of-events>" + noOfEvents + "</number-of-events>"+
                      "<event-number>" + eventNumber + "</event-number>" +
                      "</get-policy-read-web-request-dto>"
    };
  }

  function getAlliancePolicyNarrativesSvcSoapBody (policyNumber, agentNumber, lineCode, stateCode, noOfNarratives, sequenceNumber, processDate) {
    return {
            "get-policy-narrative-history-request-dto":
                      "<get-policy-narrative-history-request-dto>"+
                      "<policy-number>" + policyNumber + "</policy-number>" + 
                      "<agent-id>" + agentNumber +"</agent-id>"+
                      "<credentials>RND</credentials>"+
                      "<correlation-id>123444444444444444444444444444444444</correlation-id>" + 
                      "<lob-sub-cd>" + lineCode + "</lob-sub-cd>"+
                      "<state>" + stateCode + "</state>" + 
                      "<process-date>" + processDate + "</process-date>" +
                      "<sequence-number>" + sequenceNumber + "</sequence-number>"+
                      "<number-to-retrieve>" + noOfNarratives + "</number-to-retrieve>" +
                      "</get-policy-narrative-history-request-dto>"
    };
  }

  function getIpsSvcSoapBody (policyNumber, billingMethodCd, dayMonthDue, paymentPlanCd) {
    return "<tns:ALGetInstallmentScheduleRq_Type xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><tns:PolicyNumber>" + policyNumber +
    "</tns:PolicyNumber><tns:InputChannelCd>CSR</tns:InputChannelCd><tns:BillingMethodCd>" + billingMethodCd + 
    "</tns:BillingMethodCd><tns:DayMonthDue>" + dayMonthDue +
    "</tns:DayMonthDue><tns:PaymentPlanCd>" + paymentPlanCd +
    "</tns:PaymentPlanCd><tns:BillingActionTypeCd>Enroll</tns:BillingActionTypeCd><tns:GetInstallmentScheduleRqExt /></tns:ALGetInstallmentScheduleRq_Type>";
  }

  function getIpsPaymentInqSvcSoapBody (policyNumber,agentNumber, adjustedPremiumAmt, discountedAdjustedPremiumAmt, activityEffectiveDt, postingArray) {

    return '<v1:GetPaymentInquiry xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
      ' xmlns:v1="http://www.allstate.com/billing/BillingCalculationService/v1"' +
      ' xmlns:v11="http://allstate.com/xml/standard/soapHeader/v1">' +
        '<v1:aLPaymentInquiryRq_Type>' +
          '<v1:msgHeader>' +
            '<v11:msgDateTime>'+moment().format()+'</v11:msgDateTime>' +   
            '<v11:sendingSystemCd>BIS-CPZ-LCL-001</v11:sendingSystemCd>' + 
            '<v11:versionExt>' +
              '<v11:userId>'+ agentNumber+ '</v11:userId>' +
            '</v11:versionExt>' +
          '</v1:msgHeader>' +
          '<v1:TransactionTypeCd CodeListName="?" CodeListOwnerCd="?" Description="?">WD</v1:TransactionTypeCd>' +   
          '<v1:InputChannelCd CodeListName="?" CodeListOwnerCd="?" Description="?">BET</v1:InputChannelCd>' +   
          '<v1:AdjustedBillingCd CodeListName="?" CodeListOwnerCd="?" Description="?">01</v1:AdjustedBillingCd>' +
          '<v1:BillingInfo idAttribute="?">' +   
            '<v1:PolicyNumber>'+policyNumber+'</v1:PolicyNumber>' +  
            '<v1:BalanceInfo idAttribute="?">' +
              '<v1:FullPayAAPBalanceAmt>' +
                '<v1:Amt>'+adjustedPremiumAmt+'</v1:Amt>' +
                '<v1:CurCd CodeListName="?" CodeListOwnerCd="?" Description="?">?</v1:CurCd>' +
              '</v1:FullPayAAPBalanceAmt>' +
              '<v1:dayMonthDue>1</v1:dayMonthDue>' + 
            '</v1:BalanceInfo>' +
            '<v1:BillingActivityInfoBill PayorRef="?" idAttribute="?">' +
            '<v1:billingActivityDt>0001-01-01</v1:billingActivityDt>' + 
            '<v1:BillingActivityAmt>' +
              '<v1:Amt>-10.00</v1:Amt>' +   
              '<v1:CurCd CodeListName="?" CodeListOwnerCd="?" Description="?">?</v1:CurCd>' +
            '</v1:BillingActivityAmt>' +
            getPostingTypeCdArrayXML(postingArray) +
            '</v1:BillingActivityInfoBill>' +
            '<v1:Policy idAttribute="?">' +  
              '<v1:PaymentOption idAttribute="?">' + 
                '<v1:PaymentPlanCd CodeListName="?" CodeListOwnerCd="?" Description="?">01</v1:PaymentPlanCd>' + 
                '<v1:MethodPaymentCd CodeListName="?" CodeListOwnerCd="?" Description="?">01</v1:MethodPaymentCd>' + 
                '<v1:numPayments>1</v1:numPayments>' +
              '</v1:PaymentOption>' +
              '<v1:endorsementDt>'+activityEffectiveDt+'</v1:endorsementDt>' +  
              '</v1:Policy>' +   
            '<v1:BillingInfoExt>' +  
              '<v1:AnnualizedAdjustedPremiumInfo>' +   
              '<v1:FullPayAAPDiscountAmt>' +
              '<v1:Amt>'+discountedAdjustedPremiumAmt+'</v1:Amt>' +
              '<v1:CurCd CodeListName="?" CodeListOwnerCd="?" Description="?">?</v1:CurCd>' +
              '</v1:FullPayAAPDiscountAmt>' + 
              '</v1:AnnualizedAdjustedPremiumInfo>' +   
            '</v1:BillingInfoExt>' +
          '</v1:BillingInfo>' +   
        '</v1:aLPaymentInquiryRq_Type>' +
      '</v1:GetPaymentInquiry>';
  }

  function getPostingTypeCdArrayXML (postingArray){

    var str = "";
    for (var i = 0; i < postingArray.length; i++) {
      str += '<v1:BillingActivityInfoBillExt>' +
        '<v1:PostingTypeCd>'+postingArray[i].postingTypeCd+'</v1:PostingTypeCd>' +
        '<v1:PostingAmt>' +
        '<v1:Amt>'+postingArray[i].postingAmt+'</v1:Amt>' +
        '</v1:PostingAmt>' +
      '</v1:BillingActivityInfoBillExt>';
    }
    return str;
  }

  function getTibcoSvcBillingSummarySoapBody (policyNumber) {
    return "<BillingSummaryByPolicyNumberRq xmlns='http://www.allstate.com/billing/billingInquiryService/v1'><PolicyNumberRq><PolicyNumber>" + policyNumber + "</PolicyNumber><PolicyNumberRqExt><InputChannelCd>BET</InputChannelCd></PolicyNumberRqExt></PolicyNumberRq></BillingSummaryByPolicyNumberRq>";
  }

  function getTibcoSvcBillingTransactionHistorySoapBody (policyNumber) {
    return "<BillingTransactionHistoryRq xmlns='http://www.allstate.com/billing/billingInquiryService/v1'><PolicyNumberRq><PolicyNumber>" + policyNumber + "</PolicyNumber></PolicyNumberRq></BillingTransactionHistoryRq>";
  }

  function getTibcoSvcBillingActivitySoapBody (policyNumber) {
    return "<BillingActivityRq xmlns='http://www.allstate.com/billing/billingInquiryService/v1'><PolicyNumberRq><PolicyNumber>" + policyNumber + "</PolicyNumber></PolicyNumberRq></BillingActivityRq>";
  }

  function getTibcoSvcBillingPreferenceSoapBody (policyNumber) {
    return "<RetrieveBillingPreferencesRq xmlns='http://www.allstate.com/billing/billingInquiryService/v1'><PolicyNumber>" + policyNumber + "</PolicyNumber></RetrieveBillingPreferencesRq>";
  }

  function getTibcoSvcBillingHistorySoapBody (policyNumber) {
    return "<BillingHistoryRq xmlns='http://www.allstate.com/billing/billingInquiryService/v1'><PolicyNumberRq><PolicyNumber>" + policyNumber + "</PolicyNumber></PolicyNumberRq></BillingHistoryRq>";
  }
  
  function getTibcoSvcPaymentHistorySoapBody (policyNumber) {
    return "<RetrievePaymentHistoryRq xmlns='http://www.allstate.com/billing/billingInquiryService/v1'><PolicyNumber>" + policyNumber + "</PolicyNumber></RetrievePaymentHistoryRq>";
  }

  

//Service Method Settings
 var localPreProdBillingInquiryWsdl = "./config/preproduction/billing-inquiry-build-68-testZ.wsdl";
 var localProdBillingInquiryWsdl = "./config/production/billing-inquiry.wsdl";

  var allianceSvcSettings = {
    "preproduction" : {
      "wsdl": "https://ho14g01.alliance.apps.allstate.com/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl",
      "soapHeader" : getAllstateSoapHeader,
      "webMethodName" : "getPolicyService",
      "soapBody": getAllianceSvcSoapBody,
      "responseProperty" :  "getPolicyServiceReturn"
    },
    "production": {
      "wsdl": "https://policy-ws.alliance.apps.allstate.com/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl",
      "soapHeader" : getAllstateSoapHeader,
      "webMethodName" : "getPolicyService",
      "soapBody": getAllianceSvcSoapBody,
      "responseProperty" :  "getPolicyServiceReturn"
    }
  };

  var alliancePolicyInquirySvcSettings = {
    preproduction : {
      wsdl: "./config/preproduction/alliance_layer7/PolicyInquiryService.wsdl",
      username: "sys-sg-dv-a1",
      password: "WelUZW02",
      soapHeader : getAllstateSoapHeader,
      webMethodName : "retrievePolicy",
      soapBody : getAlliancePolicyInquirySvcSoapBody,
      responseProperty :  "getPolicyServiceReturn"
    }
  };

  var alliancePolicyActivityHistorySvcSettings = {
    "preproduction" : {
      "wsdl": "https://ho14g01.alliance.apps.allstate.com/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl",
      "soapHeader" : getAllstateSoapHeader,
      "webMethodName" : "getPolicyActivityHistoryService",
      "soapBody": getAlliancePolicyActivityHistorySvcSoapBody,
      "responseProperty" :  "getPolicyActivityHistoryServiceReturn"
    },
    "production" : {
      "wsdl": "https://policy-ws.alliance.apps.allstate.com/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl",
      "soapHeader" : getAllstateSoapHeader,
      "webMethodName" : "getPolicyActivityHistoryService",
      "soapBody": getAlliancePolicyActivityHistorySvcSoapBody,
      "responseProperty" :  "getPolicyActivityHistoryServiceReturn"
    }
  };

  var alliancePolicyNarrativeSvcSettings = {
    "preproduction" : {
      "wsdl": "https://ho14g01.alliance.apps.allstate.com/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl",
      "soapHeader" : getAllstateSoapHeader,
      "webMethodName" : "getPolicyNarrativeService",
      "soapBody": getAlliancePolicyNarrativesSvcSoapBody,
      "responseProperty" :  "getPolicyNarrativeServiceReturn"
    },
    "production" : {
      "wsdl": "https://policy-ws.alliance.apps.allstate.com/PolicyRequestVariationWEB/services/PolicyRequestVariationWrapper/wsdl/PolicyRequestVariationWrapper.wsdl",
      "soapHeader" : getAllstateSoapHeader,
      "webMethodName" : "getPolicyNarrativeService",
      "soapBody": getAlliancePolicyNarrativesSvcSoapBody,
      "responseProperty" :  "getPolicyNarrativeServiceReturn"
    }
  };

  var ipsSvcSettings = {
    "preproduction" : {
      "wsdl": "./config/preproduction/InstallmentScheduleService.wsdl",
      "soapHeader" : getIPSSoapHeaderPreProd,
      "webMethodName" : "GetInstallmentSchedule",
      "soapBody": getIpsSvcSoapBody
    },
     "production": {
       "wsdl": "./config/production/InstallmentScheduleService.wsdl",
       "soapHeader" : getIPSSoapHeaderProd,
       "webMethodName" : "GetInstallmentSchedule",
       "soapBody": getIpsSvcSoapBody
     }
  };

  var ipsPaymentInqSvcSettings = {
    "preproduction" : {
      "wsdl": "https://ipssvc-itest3.allstate.com/CalculationsSvc/V01/InstallmentScheduleService.svc?wsdl",
      "soapHeader" : null,
      "webMethodName" : "GetPaymentInquiry",
      "soapBody": getIpsPaymentInqSvcSoapBody
    }
  };

  var tibcoSvcBillingSummarySettings = {
    "preproduction" : {
      "wsdl": localPreProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingSummary",
      "soapBody" : getTibcoSvcBillingSummarySoapBody
    },
    "production" : {
      "wsdl": localProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingSummary",
      "soapBody" : getTibcoSvcBillingSummarySoapBody
    }
  };

  var tibcoSvcBillingTransactionHistorySettings = {
    "preproduction" : {
      "wsdl": localPreProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingTransactionHistory",
      "soapBody" : getTibcoSvcBillingTransactionHistorySoapBody
    },
    "production" : {
      "wsdl": localProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingTransactionHistory",
      "soapBody" : getTibcoSvcBillingTransactionHistorySoapBody
    }
  };

  var tibcoSvcBillingActivitySettings = {
    "preproduction" : {
      "wsdl": localPreProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingActivity",
      "soapBody" : getTibcoSvcBillingActivitySoapBody
    },
    "production" : {
      "wsdl": localProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingActivity",
      "soapBody" : getTibcoSvcBillingActivitySoapBody
    }
  };

  var tibcoSvcBillingPreferenceSettings = {
    "preproduction" : {
      "wsdl": localPreProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "RetrieveBillingPreferences",
      "soapBody" : getTibcoSvcBillingPreferenceSoapBody
    },
    "production" : {
      "wsdl": localProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "RetrieveBillingPreferences",
      "soapBody" : getTibcoSvcBillingPreferenceSoapBody
    }
  };

  var tibcoSvcBillingHistorySettings = {
    "preproduction" : {
      "wsdl": localPreProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingHistory",
      "soapBody" : getTibcoSvcBillingHistorySoapBody
    },
    "production" : {
      "wsdl": localProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "retrieveBillingHistory",
      "soapBody" : getTibcoSvcBillingHistorySoapBody
    }
  };

 var tibcoSvcPaymentHistorySettings = {
   "preproduction" : {
      "wsdl": localPreProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "RetrievePaymentHistory",
      "soapBody" : getTibcoSvcPaymentHistorySoapBody
   },
    "production" : {
      "wsdl": localProdBillingInquiryWsdl,
      "soapHeader" : getTibcoSoapHeader,
      "webMethodName" : "RetrievePaymentHistory",
      "soapBody" : getTibcoSvcPaymentHistorySoapBody
    }
 };

  module.exports = {
    allianceSvcSettings: allianceSvcSettings,
    alliancePolicyInquirySvcSettings: alliancePolicyInquirySvcSettings,
    alliancePolicyActivityHistorySvcSettings: alliancePolicyActivityHistorySvcSettings,
    alliancePolicyNarrativeSvcSettings: alliancePolicyNarrativeSvcSettings,
    ipsSvcSettings: ipsSvcSettings,
    ipsPaymentInqSvcSettings: ipsPaymentInqSvcSettings,
    tibcoSvcBillingSummarySettings: tibcoSvcBillingSummarySettings,
    tibcoSvcBillingTransactionHistorySettings: tibcoSvcBillingTransactionHistorySettings,
    tibcoSvcBillingActivitySettings: tibcoSvcBillingActivitySettings,
    tibcoSvcBillingPreferenceSettings: tibcoSvcBillingPreferenceSettings,
    tibcoSvcBillingHistorySettings: tibcoSvcBillingHistorySettings,
    tibcoSvcPaymentHistorySettings: tibcoSvcPaymentHistorySettings,
  };

}());