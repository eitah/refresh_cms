(function (){'use strict';

var getLogMessage = function(fileName, functionName, segmentDescription, messageText, policyNumber) {
  return (fileName.slice(fileName.lastIndexOf(require('path').sep)+1)+'; ' +
                       'Function: ' + functionName + '; ' +
                       'Segment: ' + segmentDescription + '; ' +
                       'Description: ' + messageText + '; ' +
                       'Policy#: ' + policyNumber);
};

module.exports = getLogMessage;

}());