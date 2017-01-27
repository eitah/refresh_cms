(function (){'use strict';


  function getPolicyNarrativePath (policyNumber, agentNumber, lineCd, stateCd, noOfNarratives, sequenceNumber, processDt) {
    if(validateParameter(policyNumber) && 
        validateParameter(agentNumber) && 
        validateParameter(lineCd) && 
        validateParameter(stateCd) && 
        validateParameter(noOfNarratives) && 
        validateParameter(sequenceNumber) && 
        validateParameter(processDt)) {
    return  "/v1/policies/" + policyNumber + "/policy-narratives?contractNumber=" + agentNumber + "&lobCd=" + lineCd + "&stateCode=" + stateCd + "&seqNumber=" + sequenceNumber + "&numOfNarratives=" + noOfNarratives + "&userId=" + agentNumber + "&correlationId=111111111111111111111111111111111111&processDt=" + processDt;
    }
    else {
      return '';
    }
 }

  function getActivityHistoryPath (policyNumber, agentNumber, stateCd, noOfEvents, eventNumber) {
    if(validateParameter(policyNumber) && 
        validateParameter(agentNumber) && 
        validateParameter(stateCd) && 
        validateParameter(noOfEvents) && 
        validateParameter(eventNumber)) {
      return  "/v1/policies/" + policyNumber + "/activity-history-events?eventNumber=" + eventNumber + "&numOfEvents=" + noOfEvents + "&userId=" + agentNumber + "&stateCode=" + stateCd;
    }
    else {
      return '';
    }
  }

  var betListenerRestApi = {
    test : {
      url: "https://beteventlistener-dev.apps.nonprod-mpn.ro11.allstate.com/retrieveEvents",
      port : 443,
      method: 'POST'
    },
    development : {
      url: "https://beteventlistener-dev.apps.nonprod-mpn.ro11.allstate.com/retrieveEvents",
      port : 443,
      method: 'POST'
    },
    integration : {
      url: "https://beteventlistener-int.apps.nonprod-mpn.ro11.allstate.com/retrieveEvents",
      port : 443,
      method: 'POST'
    }
  };

  var alliancePolicyNarrativesRestApi = {
    preproduction : {
      host: 'sgglint-dv.allstate.com',
      url: "https://sgglint-dv.allstate.com/sg/a2a/APT/Alliance/PolicyServices",
      port: 443,
      method: 'GET',
      username: "sys-sg-dv-a1",
      password: "WelUZW02",
      path: getPolicyNarrativePath
    }
  };

    var allianceActivityHistoryRestApi = {
    preproduction : {
      host: 'sgglint-dv.allstate.com',
      url: "https://sgglint-dv.allstate.com/sg/a2a/APT/Alliance/PolicyServices",
      port: 443,
      method: 'GET',
      username: "sys-sg-dv-a1",
      password: "WelUZW02",
      path: getActivityHistoryPath
    }
  };

  var validateParameter = function(param) {
    return (param !== undefined && param !== '' && param !== null);
  };


  module.exports = {
    betListenerRestApi: betListenerRestApi,
    alliancePolicyNarrativesRestApi : alliancePolicyNarrativesRestApi,
    allianceActivityHistoryRestApi : allianceActivityHistoryRestApi
  };

}());