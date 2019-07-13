---
docTitle: D3.js 基础
docCategory: 
 - text: 选择与修改
   link: selecting-and-modifying
 - text: 连接数据集
   link: joining-data
 #- text: 深入理解：选集和数据集
 #  link: digging-deeper-collection-dataset
---
# 简介
D3.js 是基于提供的数据绘制图表的 JavaScript 库，通过选择元素得到的选集加数据集，配合一系列助手方法（API），
让你轻松画出各种数据可视化图表，或者自创新的图表！

D3 (Data-Driven Documents) 的核心在于由数据驱动，变换文档元素。数据绑定在 DOM 上，映射到元素外观样式，
比如数字 -> 高度，你就得到了条状图，数字的个数就是条状图的条数。在平常，你可能会写许多循环来达到目的：
```js
const dataset = [100, 210, 290, 190, 110]
const scale = 200 / Math.max(...dataset)
for (let i = 0; i < dataset.length; i++) {
  let bar = document.createElement('div')
  bar.style.setProperty('background-color', 'green')
  bar.style.setProperty('height', '20px')
  bar.style.setProperty('margin-bottom', '10px')
  bar.style.setProperty('width', dataset[i] * scale + 'px')
  document.body.append(bar)
}
```

使用 D3.js 丰富的链式调用 API，可以得到更清晰的代码：

```js
const dataset = [100, 210, 290, 190, 110]
const scale = d3.scaleLinear().domain([0, 200]).range([0, Math.max(...dataset)])
d3.select('body')
  .selectAll('div')
  .data(dataset)
  .join('div')
  .style('background-color', 'green')
  .style('height', '20px')
  .style('margin-bottom', '20px')
  .style('width', d => scale(d) + 'px')
```

在这份文档中，包含 D3.js 的基础知识、常用 API 的使用方法，带你快速入门。
