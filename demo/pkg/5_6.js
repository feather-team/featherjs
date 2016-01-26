define('mod5', 'mod6', function(require, exports, module){
	module.exports = {
		mod5: require('mod6')
	};
}); 

define('mod6', function(require, exports, module){
	module.exports = {
		name: 'mod6'
	};
});