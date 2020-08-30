## 如何实现一个New

1、要创建一个对象的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4个步骤：
(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
(3) 执行构造函数中的代码（为这个新对象添加属性）；
(4) 返回新对象。
```javascript
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```

## 使用apply来链接一个对象构造器

```javascript
Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};
```
