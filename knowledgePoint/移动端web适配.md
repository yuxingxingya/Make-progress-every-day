### 1、移动开发特点：
* 跑在手机端的web页面（H5页面）
* 跨平台（可以在PC端，Android，IOS）
* 基于webview
* 告别IE拥抱webkit
* 更高的适配和性能要求

---

### 2、常见的web适配方法：
* 定高，宽度百分比 --->（做比较简单的适配）
* flex
* Media Query（媒体查询）
* rem

#### 2.1 Media Query（媒体查询）：
```
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

@media 媒体类型 and (媒体特性){
    /* CSS 样式 */
}
// 媒体类型：screen（用于电脑屏幕，平板电脑，智能手机等。），print（用于打印机和打印预览），all（用于所有设备）...
// 媒体特性：max-width,max-height...
<style>
@media screen and (max-width: 320px) {
  html {
    font-size: 16px;
  }
}
@media screen and (min-width: 321px) {
  html {
     font-size: 20px;
  }
}
</style>
```
>` 缺点 `：
屏幕分辨率分区间：区间内无法进行区分，无法实现100%兼容，一般是用主流分辨率来进行划分；
额外的工作量：响应式布局的工作都是需要开发者去实现的，带来了额外的开放量；
不适合功能复杂的页面：响应式一般适合用于资讯类页面，功能复杂的网站对于页面的整体排版和样式要求较高（特别是对比PC和H5）；

#### 2.2 rem原理与简介：
* 字体单位 --- 值是根据html 根元素font-size 大小而定
* 适配原理 --- 将px 替换rem，动态修改font-size 适配
* 兼容性 --- IOS 6 以上和 Android 2.1 以上，基本覆盖所有流行的手机系统
* 换算 ---  html 的 font-size 大小 = 1 rem
* 现在大部分浏览器 IE9+，Firefox、Chrome、Safari、Opera ，如果我们不修改相关的字体配置，都是默认显示 font-size 是 16px 

##### 2.2.1 单位换算：
* 对于使用 sass 的工程：
```
@function px2rem($px){
    $rem : 37.5px;
    @return ($px/$rem) + rem;
}
// 使用
height: px2rem(90px);
width: px2rem(90px);;
```
* CSSREM
CSSREM是一个CSS的px值转rem值的Sublime Text3自动完成插件。
* PostCSS(px2rem)
	PostCSS插件postcss-px2rem



##### 2.2.2 动态设置html元素的font-size 大小
> 方式一：媒体查询的方法 
* `缺点1`：媒体查询样式可能会叠加，这时显示与定义时候的顺序有关，需要谨慎严谨。
* `缺点2`：由于Android 机型太多，尺寸大小多，所以媒体查询这样的定义方法会比较繁琐。
```
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
      html{font-size: 37.5px;}
}
```
> 方式二：JS方法根据屏幕的宽度，动态根据比例计算得出
优点：使用JS来获取屏幕宽度的好处在于可以100%适配所有的机型宽度，因为其<html>元素的基准尺寸是直接算出来的。
* 既然是JS代码，为了避免造成因为动态设置<html>元素的font-size而造成页面抖动，一般这部分代码我们放在header底部去加载，并内联到html文档里面。
```
<script>
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth/比例 + 'px';
    
    // 绑定页面的事件来达到变化时更新 html 的 font-size
    document.addEventListener('DOMContentLoaded', function(e) {
        document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
    }, false);
</script>
  // 下面是手淘的处理代码）
  !function (e, t) {
    var n = t.documentElement, d = e.devicePixelRatio || 1;

    function i() {
      var e = n.clientWidth / 3.75;
      n.style.fontSize = e + "px"
    }

    if (function e() {
      t.body ? t.body.style.fontSize = "16px" : t.addEventListener("DOMContentLoaded", e)
    }(), i(), e.addEventListener("resize", i), e.addEventListener("pageshow", function (e) {
      e.persisted && i()
    }), 2 <= d) {
      var o = t.createElement("body"), a = t.createElement("div");
      a.style.border = ".5px solid transparent", o.appendChild(a), n.appendChild(o), 1 === a.offsetHeight && n.classList.add("hairlines"), n.removeChild(o)
    }
  }(window, document)
```

>方式三：使用vw
按照设计稿的尺寸算出比例(基准值)。假如设计稿750px,即为2倍屏的尺寸大小，实际为375px, 方便计算，根元素的font-size设置为50px；（1rem=50px, 按图纸上100px,实际就是50px,则为1rem.）
100vw=375px; 1vw = 3.75px; 50px/3.75px = 13.3333vw; 所以设置根元素13.3333vw；
```
html, body {
  font-size: 13.33333vw;
}
```
##### 2.2.3 rem 基准值计算
rem 的基准值，是根据我们所拿到的视觉稿来决定的。由于我们所写出的页面是要在不同的屏幕大小设备上运行的，所以我们在写样式的时候必须要先以一个确定的屏幕来作为参考，这个就由我们拿到的视觉稿来定。

假如我们拿到的视觉稿是以 iphone6 的屏幕为基准设计的。iPhone6 的屏幕大小是 375px, 这种屏幕属于高清屏，设备像素比(device pixel ratio)dpr比较大，所以显示的像素较为清晰。一般手机的dpr是1，iphone这种高清屏是2,尺寸是双倍大小的750px.

可以通过js的window.devicePixelRatio获取到当前设备的dpr,拿到了dpr之后，我们就可以在viewport meta头里，取消让浏览器自动缩放页面，而自己去设置viewport的content。

> 优点：
*  解决了图片高清问题。
*  解决了 border 1px 问题（我们设置的 1px，在 iphone 上，由于 viewport 的 scale 是 0.5，所以就自然缩放成 0.5px）

```
meta.setAttribute('content', 'initial-scale=' + 1/dpr + ', maximum-scale=' + 1/dpr + ', minimum-scale=' + 1/dpr + ', user-scalable=no');

@function px2rem($px){
    $rem : 75px;
    @return ($px/$rem) + rem;
}
```
##### 2.2.4  不适合设置 rem 场景：
*  当用作`图片`或者一些不能缩放的展示时，必须要使用固定的px值，因为缩放可能会导致图片压缩变形等。
*  设置`backgroundposition`或者`backgroundsize`时不宜使用rem。
*  `文字`不需要适应各种视窗大小变化。建议描述性的字体使用px。

