(function (){'use strict';

var translate = require('./translate_app_group');
var inputCodesPath = '../resources/my_app_translations'
var outputPath = './common/translations';

translate.translateAppGroup(inputCodesPath, outputPath);

}());
