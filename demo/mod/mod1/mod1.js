define('mod1', function(require, exports, module){
	module.exports = {
		mod2: require('mod2')
	};
});