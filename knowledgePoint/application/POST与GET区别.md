###  POST与GET区别
#### 基本显而易见的区别：
* GET 在浏览器回退时是无害的，而 POST 会再次请求
* GET 产生的URL地址是可以被收藏的，而 POST 不可以
* GET 请求会被浏览器主动缓存，而 POST 不会，除非手动设置
* GET 请求只能进行URL编码，而 POST支持多种编码方式
* GET 请求参数会被完整的保留在历史记录里，而POST参数不会被保留
* GET 请求在URL中传送的参数是有长度限制的，而POST没有现在
* GET 只接受ASCII字符，POST没有限制
* GET 比 POST 更不安全，参数直接暴露在URL上，不能传递敏感信息
* GET 参数通过URL传递，POST 放在Request body 中

HTTP的底层是TCP/IP。所以GET和POST的底层也是TCP/IP，也就是说，GET/POST都是TCP链接。GET和POST能做的事情是一样一样的。你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。 

#### GET和POST还有一个重大区别，简单的说：

GET产生一个TCP数据包；POST产生两个TCP数据包。
#### 长点的说：
对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。