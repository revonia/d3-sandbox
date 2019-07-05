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
* API 文档
  * [d3-selection joining data](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#joining-data)

## 绑定数据集 selection.data
### 简单数据集的绑定
连接数据集是 d3.js 中最常见的操作了，首先使用 d3-selection 包中 `selectAll` 选中一组元素并连接数据集，并使用修改元素的 API，可以看到其效果：

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
之后的 `selectAll('td').data(d => d)` ，创建了三个组，每个组有六个数字，意味着每一个 `<tr>` 中的六个 `<td>` 都对应一个数字

#### 对象数组
具有标识的数据集也很普遍，例如从关系型数据库中查出的数据集，这时可以提供给 `data()` API 第二个参数：一个返回这条数据的唯一标志的函数，可以使 d3.js 追踪变化

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-bind-object-data.js

</CodeSandBox>

## join, enter, exit

d3.js 默认以元素个数和数据个数最小的为主，依次应用后面的修改元素操作，如果元素个数不够，则不再应用后面的操作了，元素个数有多，则不修改多出的元素。

对现有、多出或缺少的这部分元素，d3.js 提供了很方便处理它们的 API：

<CodeSandbox>

<<< @/src/config.yaml

<<< @/src/d3-basic/joining-data/example-bind-data.css

<<< @/src/d3-basic/joining-data/example-bind-data.html

<<< @/src/d3-basic/joining-data/example-enter-update-exit.js

</CodeSandBox>

d3-selection 中， 不再提供 `update()` API，因为写在 `exit()` 之前的代码，效果和 `update()` 一致

推荐继续阅读 [General Update Pattern](https://bl.ocks.org/mbostock/3808218)

<Vssue :title="$title"/>
