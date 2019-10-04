### exports , module.exports , export 区别
> 注：这是面试字节跳动的一个笔试题。

首先要先了解两个规范：
* CommonJS模块规范( http://javascript.ruanyifeng.com/nodejs/module.html )
> 根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
> CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
> require方法用于加载模块。

* ES6模块规范
> 使用 export 和 import 来导出、导入模块。export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

**CommonJS 规范中 exports 与 module.exports**

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令：` var exports = module.exports; ` 于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。
```
// a.js
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;

// b.js
exports.area = function (r) {
  return Math.PI * r * r;
};

exports.circumference = function (r) {
  return 2 * Math.PI * r;
};

// 另外c.js文件中引用
var example = require('./a.js');
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

**ES6 规范中的 export**

``` javascript
// a.js
const firstName = 'Michael';
const lastName = 'Jackson';
export const age = 18;
export {firstName, lastName};

// b.js
function add(item){
	return item++;
}
export default add();

// c.js
import  {firstName, lastName，age} from './a.js';
import add from 'b.js';

```
