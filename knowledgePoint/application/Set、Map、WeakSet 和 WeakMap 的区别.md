###  Set、Map、WeakSet 和 WeakMap 的区别
#### 总结：
**Set**
* 成员唯一且不重复
* [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
* 可以遍历，有size属性；方法有：add、delete、has、clear

**WeakSet**
* 成员都是对象
* 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
* 不能遍历，没有size属性；方法有add、delete、has

**Map**
* 本质上是键值对的集合，类似集合
* 可以遍历，有size属性；方法很多：set、get 、has 、delete、clear;可以跟各种数据格式转换

**WeakMap**
* 只接受对象作为键名（null除外），不接受其他类型的值作为键名
* 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
* 不能遍历，方法有get、set、has、delete

#### Set
它类似于数组，但是**成员的值都是唯一**的，没有重复的值。
Set 本身是一个构造函数，可以接受一个数组（或者具有 iterable 接口的其他数据结构 (类数组)）作为参数
Set 方法有add, delete,has,clear,有size属性
Set **添加两次NaN，只会加入一个**
用途：数组去重；字符串去重
``` 
// 数组去重
[...new Set(array)]
// 字符串去重
[...new Set('ababbc')].join('')
```
Set 遍历方法（**遍历顺序为插入顺序**）
keys();values();entries();forEach(callbackFn, thisArg)
```
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
set.forEach((value, key) => console.log(key + ' : ' + value))
// red:red
// green:green
// blue:blue
for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```
可以用map,fillter方法：
```
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```
#### WeakSet
 WeakSet 的**成员只能是对象**，而不能是其他类型的值;
 WeakSet 中的**对象都是弱引用**，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
 WeakSet** 不可遍历**
  weakSet 方法有add, delete,has,**没有size属性**
> 这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。
>WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

#### Map
Map它类似于对象，键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键;
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键
方法：set,get ,has delete,clear;size属性
```
const m = new Map()
const o = {p: 'haha'}
m.set(o, 'content')
m.get(o)	// content
m.size // 1
m.has(o)	// true
m.delete(o)	// true
m.has(o)	// false
```
Map 遍历方法（**遍历顺序为插入顺序**）
keys();values();entries();forEach(callbackFn, thisArg)
```
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

Map 与其他数据结构的相互转换：
* Map 转为数组:使用扩展运算符
* 数组 转为 Map:将数组传入 Map 构造函数
* Map 转为对象
* 对象转为 Map:可以通过Object.entries()。
* Map 转为 JSON:
* JSON 转为 Map
```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```
#### WeakMap
WeakMap**只接受对象作为键名**（null除外），不接受其他类型的值作为键名。
其次，WeakMap的键名所指向的对象，**不计入垃圾回收机制**。
>只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
**不可遍历**
WeakMap只有四个方法可用：get()、set()、has()、delete()。