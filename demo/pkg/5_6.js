define('mod5', function(require, exports, module){
	module.exports = {
		mod5: require('mod6')
	};
}, 'mod6'); 

define('mod6', function(require, exports, module){
	module.exports = {
		name: 'mod6'
	};
});