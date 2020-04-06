### JS 事件
#### 一、事件流
DOM2级事件流包括3个阶段：事件捕获阶段，处于目标阶段，事件冒泡阶段；（IE8之前不支持DOM事件流）
 * 捕获：window -> document -> html ->body -> ... -> 目标元素
 * 冒泡：相反
##### 取消默认事件
*  IE中: e.cancelBubble：true; 
*  DOM中：e.stopPropagation()方法
##### 取消事件冒泡
* IE中：事件函数中 return false
* DOM中：e.preventDefault()方法
####  二、事件处理程序
* DOM0级：处理操作 onclick，删除置null
``` javascript
var btn = document.getElementById("myBtn");
btn.onclick=function(){
    alert(this.id); //"myBtn"
}
// 删除事件
btn.onclick=null;
```

* DOM2级：
	* 用于处理和删除处理程序的操作：addEventListener(事件名，处理函数，布尔值)与removeEventListener(事件名，处理函数，布尔值);布尔值：true-捕获调用，false-冒泡调用;因为兼容性问题，不建议用捕获； 一个元素可以添加多个事件程序，是顺序执行的。
    * IE中类似的方法：attachEvent(事件名称，事件处理函数)与detachEvent(事件名称，事件处理函数)，仅支持事件冒泡；一个元素可以添加多个事件处理程序，是相反顺序执行的。
``` javascript
var btn = document.getElementById("myBtn");
//此例子中函数与匿名函数，该事件无法用removeEventListener移除
btn.addEventListener("click",function(){
    alter(this.id)
},false)
btn.addEventListener("click",function(){
    alter("hello world");
},false)
// 点击后的执行顺序是先弹出id，后弹出hello world。
var handler = function(){
    alert(this.id);
};
//这样才能用removeEventListener进行移除
btn.addEventListener("click",handler,false);
btn.removeListener("click",handler,false);

var btn = document.getElementById("myBtn");
//同样匿名函数不能移除
btn.attachEvent("onclick", function(){
alert("Clicked");
});
btn.attachEvent("onclick", function(){
alert("hello world");
});
//点击后执行顺序是hello world，然后是Clicked。
var handler = function(){
    alert(this.id);
};
//这样才能用removeEventListener进行移除
btn.attachEvent("onclick",handler);
btn.detachEvent("onclick",handler);
```

* DOM3级：
	* UI事件，当用户与页面上的元素交互时触发，如：load(window上实现)、unload(window上实现)、scroll(有兼容问题)、resize(有兼容问题)
	* 焦点事件，当元素获得或失去焦点时触发，如：blur、focus、focusin、focusout
	* 鼠标事件，当用户通过鼠标在页面执行操作时触发如：click、dblclick、mousedown、mouseenter、mouseleave、mousemove、mouseout、mouseover、mouseup
	鼠标事件位置信息：
		* 相对于整个电脑屏幕的位置screenX 和 screenY 属性
		* 相对于浏览器窗口clientX 和clientY 属性；
		* 相对于页面坐标：pageX 和 pageY 属性，坐标是从页面本身而非视口的左边和顶边计算的；
		* 在页面没有滚动的情况下， pageX 和 pageY 的值与 clientX 和 clientY 的值相等。
		* IE8 及更早版本不支持事件对象上的页面坐标，不过使用客户区坐标和滚动信息可以计算出来。这时候需要用到 document.body（混杂模式）或 document.documentElement（标准模式）中的scrollLeft 和 scrollTop 属性。处理兼容性问题：
	* 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
	* 文本事件，当在文档中输入文本时触发，如：textInput
	* 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
	* 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
	* 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified
同时DOM3级事件也允许使用者自定义一些事件。

#### 三、 事件对象
事件处理程序中，对象this始终等于currentTarget值，而 **target只包含事件实际目标**。
#### 四、事件的委托
事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。只需在DOM 树中尽量最高的层次上添加一个事件处理程序。
优点：减少内存消耗，提高性能；动态绑定事件
``` javascript
var EventUtil = {
    addHandler: function(element, type, handler){
    //省略的代码
},
    getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    removeHandler: function(element, type, handler){
        //省略的代码
    },
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

<ul id="myLinks">
    <li id="goSomewhere">Go somewhere</li>
    <li id="doSomething">Do something</li>
    <li id="sayHi">Say hi</li>
</ul>

var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch(target.id){
        case "doSomething":
            document.title = "I changed the document's title";
            break;
        case "goSomewhere":
            location.href = "http://www.wrox.com";
            break;
        case "sayHi":
            alert("hi");
            break;
    }
});
```
