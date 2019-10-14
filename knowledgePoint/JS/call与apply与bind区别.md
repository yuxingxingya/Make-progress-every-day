## call与apply与bind区别
### apply
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

```
func.apply(thisArg, [argsArray])
```

` fun.apply(this, ['eat', 'bananas'])`，或数组对象， 如 ` fun.apply(this, new Array('eat', 'bananas'))`。
* 用 apply 将数组添加到另一个数组
* 我们可以使用push将元素追加到数组中。并且，因为push接受可变数量的参数，我们也可以一次推送多个元素。但是，如果我们传递一个数组来推送，它实际上会将该数组作为单个元素添加，而不是单独添加元素，因此我们最终得到一个数组内的数组。如果那不是我们想要的怎么办？在这种情况下，concat确实具有我们想要的行为，但它实际上并不附加到现有数组，而是创建并返回一个新数组。 

```
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

### call
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```
fun.call(thisArg, arg1, arg2, ...)
```

call()方法的作用和 apply() 方法类似，**区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。**
### bind
bind()方法**创建一个新的函数**，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```