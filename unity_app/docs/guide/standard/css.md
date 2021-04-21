# css 规范
[[toc]]
## 代码组织
<font color=#FF0000 >【必须】</font>代码按如下形式按顺序组织：
@import
变量声明
样式声明
``` markdown
// ✓
@import "est/all.less";

@default-text-color: #333;

.page {
    width: 960px;
    margin: 0 auto;
}
```
## @import 语句
<font color=#FF0000 >【必须】</font> @import 语句引用的文件必须（MUST）写在一对引号内，.less 后缀不得省略（与引入 CSS 文件时的路径格式一致）。引号使用 "
``` markdown
// ✗
@import 'est/all';
@import "my/mixins.less";

// ✓
@import "est/all.less";
@import "my/mixins.less";
```
## 运算
<font color=#FF0000 >【必须】</font> + / - / * / / 四个运算符两侧保留一个空格。+ / - 两侧的操作数有相同的单位，如果其中一个是变量，另一个数值书写单位。
``` markdown
// ✗
@a: 200px;
@b: (@a+100)*2;

// ✓
@a: 200px;
@b: (@a + 100px) * 2;
```
## 混入（Mixin）
<font color=#FF0000 >【必须】</font> Mixin 和后面的空格之间不得包含空格。在给 mixin 传递参数时，在参数分隔符（, / ;）后要保留一个空格：
``` markdown
// ✗
.box {
    .size(30px,20px);
    .clearfix ();
}

// ✓
.box {
    .size(30px, 20px);
    .clearfix();
}
```
<font color=#FF0000 >【必须】</font> 在定义 mixin 时，如果 mixin 名称不是一个需要使用的 className，加上括号，否则即使不被调用也会输出到 CSS 中。
``` markdown
// ✗
.big-text {
    font-size: 2em;
}

h3 {
    .big-text;
}

// ✓
.big-text() {
    font-size: 2em;
}

h3 {
    .big-text();
}
```
<font color=#FF0000 >【必须】</font> 如果混入的是本身不输出内容的 mixin，在 mixin 后添加括号（即使不传参数），以区分这是否是一个 className（修改以后是否会影响 HTML）。
``` markdown
// ✗
.box {
    .clearfix;
    .size (20px);
}

// ✓
.box {
    .clearfix();
    .size(20px);
}
```
## 继承
<font color=#FF0000 >【必须】</font> 使用继承时，如果在声明块内书写 :extend 语句，写在开头：
``` markdown
// ✗
.sub {
    color: red;
    &:extend(.mod all);
}

// ✓
.sub {
    &:extend(.mod all);
    color: red;
}
```
