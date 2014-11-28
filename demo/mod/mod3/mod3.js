//可为完整路径

define('mod/mod3/mod3.js', function(require, exports, module){
	module.exports = {
		mod4: require('mod2')
	};
}, 'mod2'); //显式依赖mod2 可为短路径