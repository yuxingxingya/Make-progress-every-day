### Arguments 对象
* arguments对象是所有（非箭头）函数中都可用的局部变量。
* arguments对象不是一个 Array 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。
#### 将Arguments  转化为数组方法
```javascript
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);
// 对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8 )。如果你关心性能，尝试通过遍历arguments对象来构造一个新的数组。另一种方法是使用被忽视的Array构造函数作为一个函数：
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```