### JS ES5 作用域
####  声明和未声明变量之间的差异
声明变量的作用域限制在其声明位置的上下文中，而非声明变量总是全局的
``` javascript
function x() {
  y = 1;   // 在严格模式（strict mode）下会抛出 ReferenceError 异常
  var z = 2;
}

x();

console.log(y); // 打印 "1"
console.log(z); // 抛出 ReferenceError: z 未在 x 外部声明
```
#### 变量提升
* 由于变量的声明总是在**任意代码执行之前**进行处理的，所以代码中任意位置声明变量总是**等效于在代码开头声明**；这意味着变量可以在声明之前进行使用，这个行为叫“hositing”,就像把所有的变量声明移动到函数或者全局代码的开头位置；
* 变量和函数声明在代码里的位置是不会动的，**编译阶段被放入内存中**。
* **函数和变量相比，会被优先提升。这意味着函数会被提升到更靠前的位置**。
* JavaScript 仅提升声明，而不提升初始化。
* JavaScript 在执行任何代码段之前，将函数声明放入内存中的优点之一是，你可以在声明一个函数之前使用该函数。
``` javascript
bla = 2
var bla;
// ...

// 可以隐式地（implicitly）将以上代码理解为：

var bla;
bla = 2;

// ----------变量初始化-------------
// Example 1 - Does not hoist
var x = 1;                 // 声明 + 初始化 x
console.log(x + " " + y);  // '1 undefined'
var y = 2;    


// ----------函数声明提升-------------
hoisted(); // "foo"

function hoisted() {
     console.log("foo"); 
}


/* equal to*/
var hoisted; 

hoisted = function() {
  console.log("foo");
}
hoisted();
// "foo" 
```
####  