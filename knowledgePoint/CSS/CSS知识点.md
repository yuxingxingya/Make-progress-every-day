## BFC 
### 什么是BFC？
* 块格式化上下文(Block Formatting Context)是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
### BFC作用？
* BFC元素内，垂直方向边距重叠---> 如何解决--->（给子元素外面加一个父元素，创建BFC）
* 让浮动内容和周围的内容等高，计算BFC高度时，浮动元素也会参与计算
* BFC 区域，浮动元素不重叠，清除浮动
* 使元素变为独立容器，里面元素不影响外面元素，外面元素不影响里面元素

### BFC 如何创建？
* 根元素( &lthtml>)
* 浮动元素（元素的 float 不是 none）
* 绝对定位元素（元素的 position 为 absolute 或 fixed）
* 行内块元素（元素的 display 为 inline-block）
* 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
* 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
* 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
* overflow 值不为 visible 的块元素 : auto,hidden
* display 值为 flow-root 的元素
* contain 值为 layout、content或 paint 的元素
* 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
* 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
* 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
* column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中

## CSS 盒模型
### 1、盒模型分类
* 标准盒模型 --- width/height 数值不包含 border，padding 
	* 设置：box-sizing：content-box（浏览器默认的方式）
* IE 盒模型 --- width/height 数值包含 border，padding 
	* 设置：box-sizing：border-box

### 2、如何获取盒模型的宽高
* dom.style.width/height : 获取内联样式的宽高。
* dom.currentStyle.width/height: 获取计算后的宽高（仅IE支持）
* window.getComputedStyle(dom).width.height(): 获取计算后的宽高，兼容性强
* dom.getBoundingClientRect().width/height:可以获取计算后的宽高，主要运用与计算元素的相对于视窗的左上角绝对位置，可以拿到4个值，left,top,width,height

