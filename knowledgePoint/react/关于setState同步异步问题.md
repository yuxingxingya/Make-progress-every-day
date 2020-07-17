### setState是同步还是异步？
面试时候，谈到react，经常会被问到，setState是同步的还是异步的，当时毫不犹豫的回答异步的，emmm，，，下来查询资料，发现结果是setState 可能是同步的，也可能是异步的。

官方文档中（ https://zh-hans.reactjs.org/docs/state-and-lifecycle.html  ）说到，setState 更新 **可能** 是异步的，出于性能考虑，React **可能** 会把多个 setState() 调用合并成一个调用。因此 this.state 和 this.props 可能会异步更新，所以不要依赖它们的值来更新下一个状态。
#### setState 何时是异步的何时是同步的？
setState 只在 **合成事件** 和 **钩子函数** 中是 **“异步”** 的，在 **原生事件** 和 **setTimeout** 中都是 **同步** 的。

> * setState的“异步”并不是说内部由异步代码实现，其实**本身执行的过程和代码都是同步的**，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
> * setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。
> * 链接：https://juejin.im/post/5b45c57c51882519790c7441

#### 如何获取更新后的值？
```javascript
setState(updater[, callback])
// 参数一为带有形式参数的 updater 函数：(state, props) => stateChange
// 第一个参数除了接受函数外，还可以接受对象类型；这种形式的 setState() 也是异步的，并且在同一周期内会对多个 setState 进行批处理，后调用的 setState() 将覆盖同一周期内先调用 setState 的值
```
* 可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
* 在生命周期函数 componentDidUpdate 中获取的是最新更新后的值
``` javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
#### 给 setState 传递一个对象与传递一个函数的区别是什么？
传递一个函数可以让你在函数内访问到当前的 state 的值。因为 setState 的调用是 **分批** 的，所以你可以链式地进行更新，并确保它们是一个建立在另一个之上的，这样才不会发生冲突。

```javascript
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 0

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 0

    this.setState((state, props) => {
        console.log(state.val);     // 1
        return { val: state.val + 1 }
    });
        
    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 3

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 4
    }, 0);
  }

  render() {
    return null;
  }
};
```
