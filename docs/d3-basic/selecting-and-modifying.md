# 选择与修改

## 说明
* 本文档对应版本
  * d3.js v5
  * d3-selection v1.4
* 主要使用到的 API
  * selection.select
  * selection.selectAll
  * selection.filter
  * selection.attr
  * selection.classed
  * selection.style
  * selection.text
  * selection.html
  * selection.append
  * selection.remove
  * selection.sort
* API 文档
  * [d3-selection selecting-elements](https://github.com/d3/d3-selection#selecting-elements)
  * [d3-selection modifying-elements](https://github.com/d3/d3-selection#modifying-elements)

## 使用 d3.js 操作元素
如果你会使用 [jQuery](https://jquery.com/)，那么肯定能很快上手 d3.js 操作元素的 API，它们之间十分相似，甚至 d3.js 的 API 还更好理解一些，
这个网站没有使用 jQuery，现在开始，切换思维，使用 d3.js 来实现你想绘制的图形，随时使用沙盒或者打开浏览器的调试工具验证你的想法！

### 选择元素
d3.js 中，`select` 用来选择一个元素，`selectAll` 用来选择多个元素，
这两个方法的参数可以为 W3C 选择器字符串 [W3C selector strings](https://www.w3.org/TR/selectors-api/)，
如果你阅读 [`select` 代码](https://github.com/d3/d3-selection/blob/v1.4.0/src/select.js) 或 
[`selectAll` 代码](https://github.com/d3/d3-selection/blob/v1.4.0/src/selectAll.js)
会发现使用了浏览器提供的 `document.querySelector`、`document.querySelectorAll` 方法。而后，这两个方法会返回一个 `Selection` 选集对象，
选集对象上依然有 `select`、`selectAll` 方法可供链式调用，此外还有一些用来修改元素的方法，对选集内的所有元素都进行修改，
在后文中选集对象的方法，使用 `selection.method` 表示，与 `d3.method` 区分开。

`selection.select` 和 `selection.selectAll` 的参数也可以为函数
