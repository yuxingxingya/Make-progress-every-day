### display:none、visibility:hidden和opacity:0之间的区别
#### 一、空间占据与渲染
* display:none隐藏后不占据额外空间，它会产生回流和重绘，
* visibility:hidden 仍然占据着空间，只会引起页面重绘
* opacity:0 仍然占据着空间，只会引起页面重绘
#### 二、子元素继承
* display:none不会被子元素继承，但是父元素都不在了，子元素自然也就不会显示了
* visibility:hidden 会被子元素继承，可以通过设置子元素visibility:visible 使子元素显示出来
* opacity: 0 也会被子元素继承，但是不能通过设置子元素opacity: 0使其重新显示
#### 三、事件绑定
* display:none 的元素都已经不再页面存在了，因此肯定也无法触发它上面绑定的事件；
* visibility:hidden 元素上绑定的事件也无法触发；
* opacity: 0元素上面绑定的事件是可以触发的。
#### 四、过渡动画
* transition对于display肯定是无效的，大家应该都知道；
* transition对于visibility也是无效的；
* transition对于opacity是有效，大家也是知道的:).