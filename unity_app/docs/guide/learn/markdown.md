# Markdown 文档


[[toc]]

## 列表

``` markdown
- 列表内容1
* 列表内容2
- 列表内容3

1. 列表内容
   1. sub 那额
   2. bug
2. 列表内容
3. 列表内容
```
- 列表内容1
* 列表内容2
- 列表内容3
  
1. 列表内容
   1. sub 那额
   2. bug
2. 列表内容
3. 列表内容

## 字体

``` markdown
  <i>斜体</i>   _斜体_
  <b>加粗</b>   **加粗**
  **_加粗+斜体_**
  ~~删除线~~
  <em>强调</em>
  Z<sup>a</sup>    Z<sub>a</sub>
  <kbd>Ctrl</kbd>  <kbd>Alt</kbd>

  <font face="微软雅黑" >微软雅黑字体</font>
  <font face="黑体" >黑体</font>
  <font size=3 >3 号字</font>
  <font size=4 >4 号字</font>
  <font color=#FF0000 >红色</font>
  <font color=#008000 >绿色</font>
  <font color=#0000FF >蓝色</font>
```

<i>斜体</i>   _斜体_

<b>加粗</b>   **加粗**

**_加粗+斜体_**  **_加粗+斜体_**

~~删除线~~
<em>强调</em>

Z<sup>a</sup> Z<sub>a</sub>

<kbd>Ctrl</kbd>  <kbd>Alt</kbd>

<font face="微软雅黑" >微软雅黑字体</font>
<font face="黑体" >黑体</font>
<font size=3 >3 号字</font>
<font size=4 >4 号字</font>
<font color=#FF0000 >红色</font>
<font color=#008000 >绿色</font>
<font color=#0000FF >蓝色</font>

## 引用

``` markdown
> 这是引用的内容
>> 这是引用的内容
>>> 这是引用的内容
```
> 这是引用的内容
>> 这是引用的内容
>>> 这是引用的内容

## 图片/链接
``` markdown
![图片alt](./images/agc.png)
[百度](http://baidu.com)
<xxx@outlook.com>
```

[百度](http://baidu.com)

<xxx@outlook.com>



## 表格
``` markdown
| 表头   | 表头   | 表头   |
| ------ | ------ | ------ |
| 第一行 | 第一行 | 第一行 |
| 第二行 | 第二行 | 第二行 |
| 第三行 | 第三行 | 第三行 |

```
| 表头   | 表头   | 表头   |
| ------ | ------ | ------ |
| 第一行 | 第一行 | 第一行 |
| 第二行 | 第二行 | 第二行 |
| 第三行 | 第三行 | 第三行 |

## 高亮
``` markdown
`代码内容`

```
`代码内容`

## 背景色
``` markdown
<table>
  <tr>
    <td bgcolor=orange>     
        snrewfiwnsdj
        sdifsndfsjdfsdjf
        senm 
    </td>
    <td bgcolor=cyan> 背景色是 1 cyan</td>
  </tr>
</table>
<table>
<tr>
<td bgcolor= BlueViolet >背景色2 BlueViolet</td>
</tr>
</table>
```

<table>
  <tr>
    <td bgcolor=orange>orange</td>
    <td bgcolor=cyan>cyan</td>
  </tr>
</table>

<table>
<tr>
<td bgcolor= BlueViolet >背景色2 BlueViolet</td>
</tr>
</table>


## 提示
```
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::
```
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

## 表情
```
:tada: :100:  
```
:tada: :100:  


## 页面变量

{{$page}}
