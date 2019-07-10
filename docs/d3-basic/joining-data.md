# 连接数据集

## 说明
* 本文档对应版本
  * d3.js v5
  * d3-selection v1.4
* 主要使用到的 API
  * selection.data
  * selection.join
  * selection.enter
  * selection.exit
  * selection.datum
* API 文档
  * [d3-selection joining data](https://github.com/d3/d3-selection#joining-data)

## 绑定数据集 selection.data
### 简单数据集的绑定
连接数据集是 d3.js 中最常见的操作了，首先使用 d3-selection 包中 `selectAll` 选中一组元素并连接数据集，
并使用修改元素的 API，可以看到其效果：

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-bind-data.css

<<< @/src/d3-basic/joining-data/example-bind-data.html

<<< @/src/d3-basic/joining-data/example-bind-data.js

</CodeSandBox>

### 复杂数据集的绑定
#### 二维数组
有时候数据集不是单纯的单值数组，二维的数组（或称为矩阵），也可以进行绑定：

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-bind-matrix-data.js

</CodeSandBox>

在 `selectAll('tr').data(dataset)` 后，创建了一个具有三个数据的组，意味着每个 `<tr>` 对应一行数据
之后的 `selectAll('td').data(d => d)` ，创建了三个组，每个组有六个数字，意味着每一个 `<tr>` 中的六个 `<td>` 都对应一个数字。

#### 对象数组
具有标识的数据集也很普遍，例如从关系型数据库中查出的数据集，这时可以提供给 `data()` API 第二个参数：
一个返回这条数据的唯一标志的函数，可以使 d3.js 追踪变化（`join()` 的说明请看下一节）：

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-bind-object-data.js

</CodeSandBox>

## enter, exit, join

d3.js 默认以元素个数和数据个数最小的为主，依次应用后面的修改元素操作，如果元素个数不够，则不再应用后面的操作了，
元素个数有多，则不修改多出的元素。

对现有、多出或缺少的这部分元素，d3.js 提供了很方便处理它们的 API。

### enter, exit
`enter()` 是用来选中所有**未对应元素的数据**，一般后面接 `append('someElementTagName')` 用来插入新元素，
而后接的链式方法对插入的新元素进行修改。

`exit()` 用来选中所有**未对应数据的元素**，一般接 `remove()` 移除掉这些多余的元素，
在 `remove()` 之前，可以写一些退场动画增强视觉效果

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-enter-exit.js

</CodeSandBox>

### join
`join()` 是一个快捷方法，将 `enter()`、`exit()` 和更新写在一起，有更强的可读性，
同时少写一些重复代码，[join.js 源码](https://github.com/d3/d3-selection/blob/v1.4.0/src/selection/join.js)

提供不同的参数，`join()` 会有不同的动作，但返回值都是移除掉多余元素后，所有元素的选集：

#### 只提供一个标签名字符串 `selection.join('tagName')` 
插入不足的元素，删除多余的元素，等价于 `selection.enter().append('tagName')` 和 `selection.exit().remove()`。

#### 提供一到三个函数 `selection.join(onEnter, onUpdate, onExit)`
`onEnter` 函数将收到未对应元素的数据选集，`onUpdate` 将收到所有选中的当前元素选集，`onExit` 将收到多余的元素选集，
当未提供 `onExit` 时，多余的元素将被移除。

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-join.js

</CodeSandBox>

::: tip
d3-selection 中， 不再提供 `update()` API，因为写在 `exit()` 之前的代码，效果和 `update()` 一致，
推荐继续阅读 [General Update Pattern](https://bl.ocks.org/mbostock/3808218)。
:::

## 获取和设置元素的数据 selection.datum
这是一个与 `selection.data` 完全不一样的 API，使用这个方法不会连接数据集，也不会提供 `enter` 和 `exit` 选集。
而是根据参数不同，提供设置数据、获取数据的功能：

`selection.datum([value])`

* 如果不提供参数，那么返回选集中的**第一个非 null元素**上绑定的数据
* 如果提供一个值，那么将选集中的所有元素都将绑定到这个值
* 如果提供一个函数，这个函数将对选集中的每个元素都执行一遍，函数能够接收到当前元素绑定的数据 `d`、索引 `i` 和当前组 `nodes`，
  函数返回值将依次绑定在元素上。

<CodeSandbox initial-height="500px">

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-datum.js

<<< @/src/d3-basic/joining-data/example-datum.html

</CodeSandBox>

<Vssue :title="$title"/>
