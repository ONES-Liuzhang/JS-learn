# 使用Node.js实现一个带CLI的爬虫应用

## 写在前面

今天在线直播的课我们学习了如何通过命令行+爬虫来下载百度图片

也经历了非常多的反爬策略以及在线debug. 

后面的下载视频就留给同学们做课后作业了, 这里给大家的代码是完整的包含视频的, 同学们可以先自己写着试试, 不行的话再来看代码.

然后因为下载视频和下载图片有很多共同之处, 所以我提取了很多方法到common.js里, 

一步步的操作都在step.md里, 大家可以赏脸看一下~

## 什么是爬虫?

是一种用来自动浏览万维网的网络机器人.

* 比如网络引擎使用爬虫更新自身的网站内容或其对其他网站的索引;
* 比如个人使用爬虫去获取网站的内容

其实归根结底, 都是利用程序在服务端来替自己访问网站, 更快更大范围的获取自己想要的内容.

## 爬虫可以肆无忌惮的爬取所有网站内容吗？

不是的.

可以想一下, 爬虫访问网站的时候其实也会消耗网站的浏览, 占用网站的带宽, 占用网站服务器的资源对吧?

那如果爬虫可以毫无限制地访问所有网站的所有内容, 那可能对于小网站来说, 一个恶意的爬虫就能消耗掉大量的资源, 让网站不堪重负.

所以这里就要提到一个叫做robots.txt的文件了.

1. robots.txt是放在哪里的文件?

存在网站根目录下, 是一个ASCII编码的文本文件.

2. robots.txt的作用是什么?

它来告诉爬虫, 这个网站里哪些内容你能爬, 哪些不允许你爬.

3. 允许所有爬虫应该怎么写?

User-agent: *
Disallow:

或者

User-agent: *
Allow:/

4. 允许指定爬虫应该怎么写?

User-agent: name_spider
Allow:

5. 拦截所有机器人?

User-agent: *
Disallow: /

6. 禁止访问特定目录?

User-agent: *
Disallow: /cgi-bin/
Disallow: /images/
Disallow: /tmp/
Disallow: /private/


## 应该怎样开始一个爬虫应用?

1. 确定要爬去的网站/页面

www.baidu.com

下载 视频/图片

视频页, 需要点击进入每一个视频Item, 才能进入视频播放页, 拿到视频链接


2. 分析网页的数据和DOM结构

3. 确定技术选型

   * 模拟浏览器端请求 
     * request (已经不再维护了) 
     * superagent ✅
     
   * 解析DOM
     * cheerio (类似于Jquery的API) ✅
     * jsdom


4. gogogogogogogo!!!

## 搭配CLI食用?

支持交互式命令行, 可以选择百度知道/视频/图片, 然后输入关键字, 最后开始执行程序
