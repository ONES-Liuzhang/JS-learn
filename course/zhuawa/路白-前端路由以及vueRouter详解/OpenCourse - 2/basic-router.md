# 前端路由 router 原理及表现

vue -> hash, history
react -> hash, history

1. 页面间的交互不刷新页面
2. 不同 Url 会渲染不同的内容

面试！！
Hash 和 History

1. hash 有#,history 没有
2. hash 的#部分内容不会给服务端， history 的所有内容都会给服务端
3. hash 通过 hashchange 监听变化，history 通过 popstate 监听变化

## Hash

### 特性

1. url 中带有一个#符号，但是#只是浏览器端/客户端的状态，不会传递给服务端。

www.baidu.com/#/user -> http -> www.baidu.com/
www.baidu.com/#/list/detail/1 -> http -> www.baidu.com/

2. hash 值的更改，不会导致页面的刷新

location.hash = '#aaa';
location.hash = '#bbb';
从#aaa 到#bbb，页面是不会刷新的

3. hash 值的更改，会在浏览器的访问历史中添加一条记录。所以我们才可以通过浏览器的返回、前进按钮来控制 hash 的切换

4. hash 值的更改，会触发 hashchange 事件
   location.hash = '#aaa';
   location.hash = '#bbb';

   window.addEventLisenter('hashchange', () => {})

### 如何更改 hash

1. location.hash

location.hash = '#aaa';
location.hash = '#bbb';

2. html 标签的方式

<a href="#user"> 点击跳转到 user </a>

location.hash = '#user';

## History

hash 有个#符号，不美观，服务端无法接受到 hash 路径和参数

html5 history

```js
window.history.back(); // 后退
window.history.forward(); // 前进
window.history.go(-3); // 接收number参数，后退三个页面
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```

### pushState/replaceState 的参数

1. state, 是一个对象，是一个与指定网址相关的对象，当 popstate 事件触发的时候，该对象会传入回调函数
2. title, 新页面的标题，浏览器支持不一，null
3. url, 页面的新地址

pushState, 页面的浏览记录里添加一个历史记录
replaceState, 替换当前历史记录

### History 的特性

！！面试题
pushState 时，会触发 popstate 吗？

1. 没有#
2. pushState/replaceState 并不会触发 popstate 事件， 这时我们需要手动触发页面的重新渲染。
3. 我们可以使用 popstate 来监听 url 的变化
4. popstate 到底什么时候才能触发。
   4.1 点击浏览器后退按钮
   4.2 点击浏览器前进按钮
   4.3 js 调用 back 方法
   4.4 js 调用 forward 方法
   4.5 js 调用 go 方法
