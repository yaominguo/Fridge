# RelationGraph
A Vue component to draw a relation graph with d3.

## How to start
```bash
#first, install
npm install @omniview/vue-relation-graph --save

#then, use it in *.vue files
<relation-graph
  :data="data"
  :config="config"
  style="background:#fff;width:50rem; height:50rem" />
```
___
## 参数说明

> ## config

参数|说明|类型
-|-|-
isHighLight|是否开启鼠标hover高亮选中点、线，默认为true|Boolean
isScale|是否开启缩放和平移功能，默认为true|Boolean
scaleExtent|缩放的比例尺范围，默认为[0.2, 1.5]|Array
chargeStrength|万有引力，默认为-300|Number
collide|碰撞力的大小（影响节点间的距离），默认为100|Number
alphaDecay|控制力学模拟衰减率，默认为0.0228|Number
r|圈圈节点半径 [30-45]， 默认为45|Number
nodeColor|圈圈节点背景颜色，默认为'skyblue'|String
fontColor|圈圈内文字的颜色，默认为'#000'|String
linkSrc|划线时候的弧度，默认为30|Number
linkColor|关系线颜色，默认为'gray'|String
strokeColor|圈圈节点外围边框的颜色，默认为'gray'|String
strokeWidth|圈圈节点外围边框的宽度，默认为0|Number


> ## data

参数|说明|类型
-|-|-
data|关系图数据|Object
-|nodes：关系点数据|Array[Object]
-|links：关系线数据|Array[Object]

> ### nodes

参数|说明|类型
-|-|-
name|（必须）节点名称|String
id|（必须）节点唯一标识|[Number, String]
color|（可选）节点背景色，会覆盖config中的节点默认背景色|String
strokeColor|（可选）节点边框色，会覆盖config中的默认边框色|String

> ### links

参数|说明|类型
-|-|-
id|（必须）关系线唯一标识|String
source|（必须）来源节点id|[Number, String]
target|（必须）连接节点id|[Number, String]
relation|（必须）关系线的名称|String
color|（可选）关系线颜色，会覆盖config中的关系线默认颜色|String


