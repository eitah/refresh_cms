(function (){'use strict';

var moment = require('moment');
var getLogMessage = require('./log_helper');
var MILLISECONDSINDAY = 1000*60*60*24;

function getDaysDifference(date1, date2) {
  var myResultDays = Math.ceil((date2 - date1) /1000 /60 /60 /24);

  if(isNaN(myResultDays) || myResultDays < 0) { myResultDays = 0;}
  
  return myResultDays;
}

function formatDateText(dateText) {
  var functionName = 'formatDateText';

  if (typeof dateText === 'undefined' || dateText === '') {return '';}
  if (typeof dateText === 'object') {dateText = JSON.stringify(dateText);}
  
  //e.g. Thu Mar 06 2014 00:00:00 GMT+0000 (GMT) (JSON.stringify converts this to '03/06/2014 00:00:00 ZZ')
  var dateFormat = /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} \w{3}\+\d{4} \(\w{3}\)$/;
  if (dateText.match(dateFormat)) {return moment(JSON.stringify(dateText),'ddd MMM DD YYYY HH:mm:ss ZZ').format('l');}

  //e.g. 2014-05-09T00:00:00.000Z
  dateFormat = /\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'YYYY-MM-DDT00:00:00.000Z').format('l');}

  //e.g. 12/28/2015 06:00:00 GMT
  dateFormat = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2} [\w]{3}$/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'MM/DD/YYYY HH:mm:ss ZZ').format('l');}
  
  //e.g. 1999-01-31T00:00:00-05:00
  dateFormat = /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\-\d{2}:\d{2}$/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'YYYY-MM-DDTHH:mm:ss-05:00').format('l');}

  //e.g. 12/28/2015
  dateFormat = /^\d{2}\/\d{2}\/\d{4}$/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'MM/DD/YYYY').format('l');}
  
  //e.g. 1/28/2015 or 1/3/2015 or 10/3/2015
  dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'M/D/YYYY').format('l');}
  
  //e.g. 2015/12/28
  dateFormat = /^\d{4}\/\d{2}\/\d{2}$/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'YYYY/MM/DD').format('l');}
  
  //e.g. 2015-12-28
  dateFormat = /^\d{4}\-\d{2}\-\d{2}$/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'YYYY-MM-DD').format('l');}

  //e.g. 151228
  dateFormat = /^\d{6}$/; 
  if (dateText.match(dateFormat)) {return moment(dateText,'YYMMDD').format('MM-DD-YY');}
  
  logger.error(getLogMessage(module.filename, functionName,'Unknown date format', dateText));
  return 'Invalid date';

}

function dateOrder(firstDate,secondDate) {
  if(typeof firstDate !== 'undefined' && firstDate !== '' && firstDate !== 'Invalid date' && typeof secondDate !== 'undefined' && secondDate !== '' && secondDate !== 'Invalid date' ) {
    if (moment(formatDateText(firstDate),'M/D/YYYY').format('YYYYMMDD') < moment(formatDateText(secondDate),'M/D/YYYY').format('YYYYMMDD')) {return '<';}
    if (moment(formatDateText(firstDate),'M/D/YYYY').format('YYYYMMDD') === moment(formatDateText(secondDate),'M/D/YYYY').format('YYYYMMDD')) {return '=';}
    if (moment(formatDateText(firstDate),'M/D/YYYY').format('YYYYMMDD') > moment(formatDateText(secondDate),'M/D/YYYY').format('YYYYMMDD')) {return '>';}
  }
  else {
    return '';
  }
}

function dateOffset(date, offset) {
  var validatedDate = formatDateText(date);
  if (validatedDate === 'Invalid date' || validatedDate === ''){
    return validatedDate;
  }
  if (typeof offset === 'number' && offset){
    validatedDate = formatDateText(new Date(Date.parse(date) + offset*MILLISECONDSINDAY));
    return validatedDate;
  }
  else if (!offset) {
    return validatedDate;
  }
  else {
    return 'Invalid offset';
  }
}


var dateHelper = {
  getDaysDifference : getDaysDifference,
  formatDateText: formatDateText,
  dateOffset: dateOffset,
  dateOrder: dateOrder
};
module.exports = dateHelper;

}());