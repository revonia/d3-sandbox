# 选择与修改

## 说明
* 本文档对应版本
  * D3.js v5
  * d3-selection v1.4
* 主要使用到的 API
  * select
  * selectAll
  * selection.filter
  * selection.attr
  * selection.style
  * selection.text
  * selection.html
  * selection.classed
  * selection.property
  * selection.append
  * selection.remove
* API 文档
  * [d3-selection selecting-elements](https://github.com/d3/d3-selection#selecting-elements)
  * [d3-selection modifying-elements](https://github.com/d3/d3-selection#modifying-elements)

## 使用 D3.js 操作元素
如果你会使用 [jQuery](https://jquery.com/)，那么肯定能很快上手 D3.js 操作元素的 API，它们之间十分相似，
这个网站没有使用 jQuery，使用 D3.js 来绘制的图形，你可以随时使用沙盒或者打开浏览器的调试工具验证你的想法！

### 选择元素
D3.js 中，`select` 用来选择一个元素，`selectAll` 用来选择多个元素，
这两个方法的参数可以为 W3C 选择器字符串 [W3C selector strings](https://www.w3.org/TR/selectors-api/)，
如果你阅读 [`select` 代码](https://github.com/d3/d3-selection/blob/v1.4.0/src/select.js) 或 
[`selectAll` 代码](https://github.com/d3/d3-selection/blob/v1.4.0/src/selectAll.js)
会发现使用了浏览器提供的 `document.querySelector`、`document.querySelectorAll` 方法。

这两个方法会返回一个 `Selection` 选集对象，选集对象上依然有 `select`、`selectAll` 方法可供链式调用，
此外还有一些用来修改元素的方法，对选集内的所有元素都进行修改，在后文中选集对象的方法，
使用 `selection.method` 表示，与 `d3.method` 区分开。

#### 选集对象 `Collection` 的 `select`、`selectAll`
`select`、`selectAll` 在选集对象上有一些略微的差别，选集上，两个方法的参数可以为一个函数，以便你选择选集中所有元素的父节点，或者依据数据选择元素：

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/selecting-and-modifying/example-select.html

<<< @/src/d3-basic/selecting-and-modifying/example-select.js

</CodeSandbox>

#### 选集过滤
选集过滤可以使用 `selection.filter`，以下三种写法，都可以达到选择选集中偶数元素的目的：
```js
let even
// 提供选择器作为参数
even = d3.selectAll("tr").filter(":nth-child(even)");
// 提供过滤函数作为参数
even = d3.selectAll("tr").filter((d, i) => i & 1);
```

### 修改元素
得到选集之后，使用选集上的方法来操作元素：
* `selection.attr(name[, value])` 设置、获取元素属性
* `selection.property(name[, value])` 设置、获取 DOM 对象属性
* `selection.style(name[, value[, priority]])` 设置、获取元素样式
* `selection.classed(names[, value])` 设置、获取元素的类
* `selection.text([value])` 设置、获取元素文本
* `selection.html([value])` 设置、获取元素内部 html

这些方法的使用起来都大同小异，有以下几个规则：
1. 不提供 `value` 参数，直接获取对应值
2. 提供 `value` 参数，则改变对应值
3. 如果 `value === null` ，则删除掉对应值
4. 如果 `value` 是个函数，则取函数返回值来改变或删除对应值

::: tip
对于 `selection.classed`，`names` 参数可以是空格分割的类列表，而 `value` 应该是 `true` (truthy) 或 `false` 或者返回上述值的函数，来表示类的有无。
:::

<Vssue :title="$title"/>
