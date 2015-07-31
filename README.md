feather.js
=============

简介
------------

feather.js是为[feather](http://feather-team.github.io)提供一个前端模块化加载工具，提供require, define, require.async等相关接口，对js和css进行模块化管理，并可预设置模块的相关依赖进行模块依赖的并行加载，以提高前端的加载性能优化，且大小很小，整体代码包含注释不到300行左右。支持浏览器版本IE6+, firefox3.5+, chrome, safari, opera，除此之外，feather.js还支持css的加载，所有的解析规则于使用方式和加载js模块一致。

feather没有遵循严格的AMD规范， 接口单一，但依赖前置，并延迟执行函数（之前为提前执行回调函数，因配合feather的编译，修改为延迟执行），即require时会才调用模块的回调函数。


API
------------

* **define(modname, factory[, deps])**：定义一个模块, define依赖某一模块时 需要提供deps参数, deps参数可为数组或者字符串。

```js
define('mod/mod1/mod1.js', function(require, exports, module){
    module.exports = {
        name: 'mod1',
        desc: 'this is mod1'
    };
});
```

* **require(modname)**: 获取某一个模块

```js
define('mod/mod1/mod1.js', function(require, exports, module){
    var jquery = require('mod/jquery/jquery.js');
    
    module.exports = {
        name: 'mod1',
        desc: 'this is mod1',
        $: jquery
    };
}, 'mod/jquery/jquery.js');
```

* **require.async(modname[, callback])**: 调用某一个模块， 多个modname则使用数组表示，callback为记载完所有的模块后执行的回调函数。
```js
require.async('mod/mod1/mod1.js', function(Mod1){
    console.log(Mod1);
});
```

* **require.config**: 配置全局。
```js
//baseurl配置，所有不以/开头的模块名会自动加上该参数得到完整的模块名。
require.config.baseurl = '';

//解析模块名
require.config.rules = [
    [/^\w+$/, '$&/$&.js'],   //定义了一个规则，所以为或调用了字母和数组合的模块名时，比如 abc,则都会解析成abc/abc.js
    [/^common~\w+$/, 'common/plugins/$&.js'] //common~a => common/plugins/a.js
];

//通过rules配置会自动调用mod/mod1/mod1.js模块，解析过程为 baseurl + rules = 模块名; 
//注: 这一解析过程包含define和require以及require.async过程。
require.async('mod1'); 


//配置domain参数，所有的请求发出时会自动带上domain参数，并发出请求，
//注：该参数不参与模块名的解析。
require.config.domain = 'http://github.com/';

//map表，用于将模块合并打包，表示包于各模块的对应关系，并当require某一个模块时，会自动发送请求至map的key值url上。 //该参数不参与模块名的解析。
require.config.map = {
    'pkg/mod.js': ['mod/mod1/mod1.js', 'mod/jquery/jquery.js']
};

//配置模块的依赖，该项如果使用feather的话，会被工具自动分析到该项，并塞进页面中，等加载模块时，会自动并行下载所有的依赖
//注：key值必须为全路径，value值则可以使用baseurl和rules去进行解析
//如下配置，当使用require.async('mod/mod1/mod1.js')时，则会自动去加载mod1和jquery2个模块，而非需等待mod1加载完毕后，jquery会去加载。
require.config.deps = {
    'mod/mod1/mod1.js': ['jquery']  
};
```


