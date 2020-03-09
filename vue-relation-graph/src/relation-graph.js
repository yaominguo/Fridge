import * as d3 from 'd3'


// 求两点间的距离
function getDis(s, t) {
  return Math.sqrt((s.x - t.x) * (s.x - t.x) + (s.y - t.y) * (s.y - t.y))
}

// 求元素移动到目标位置所需要的 transform 属性值
function getTransform(source, target, _dis) {
  let r
  if (target.x > source.x) {
    if (target.y > source.y) {
      r = Math.asin((target.y - source.y) / _dis)
    } else {
      r = Math.asin((source.y - target.y) / _dis)
      r = -r
    }
  } else {
    if (target.y > source.y) {
      r = Math.asin((target.y - source.y) / _dis)
      r = Math.PI - r
    } else {
      r = Math.asin((source.y - target.y) / _dis)
      r -= Math.PI
    }
  }
  r = r * (180 / Math.PI)
  return 'translate(' + source.x + ',' + source.y + ')rotate(' + r + ')'
}

// 使文字折行
function textWrap(text, width) {
  text.each(function() {
    let text = d3.select(this),
      words = text.text().split('').reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      x = text.attr('x'),
      y = text.attr('y'),
      // dy = parseFloat(text.attr("dy")),
      dy = 0,
      tspan = text.text(null)
        .append('tspan')
        .attr('x', x)
        .attr('y', y)
        .attr('dy', dy + 'em')

    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(' '))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text.append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy + 'em')
          .text(word)
      }
    }
  })
}

// 默认配置
const defaultConfig = {
  nodes: [],                  // 节点数组
  links: [],                  // 线数组
  isHighLight: true,        // 是否启动 鼠标 hover 到节点上高亮与节点有关的节点，其他无关节点透明的功能
  isScale: true,              // 是否启用缩放平移zoom功能
  scaleExtent: [0.2, 1.5],    // 缩放的比例尺
  chargeStrength: -300,        // 万有引力
  collide: 100,                 // 碰撞力的大小 （节点之间的间距）
  alphaDecay: 0.0228,          // 控制力学模拟衰减率
  r: 45,                      // 圈圈的半径 [30 - 45]
  nodeColor: 'skyblue',       // 圈圈节点背景颜色
  fontColor: '#000',          // 圈圈内文字的颜色
  linkSrc: 30,                // 划线时候的弧度
  linkColor: 'gray',        // 链接线默认的颜色
  strokeColor: 'gray',     // 圈圈外围包裹的颜色
  strokeWidth: 0,             // 圈圈外围包裹的宽度
}

export default class RelationGraph {

  constructor(selector, data, configs = {}) {
    const mapW = selector.offsetWidth
    const mapH = selector.offsetHeight
    const defaultWH = {
      width: mapW,
      height: mapH,
    }

    // 画布
    this.graph = d3.select(selector)

    // 转换links的source和target
    const nodes = [...data.nodes]
    const links = [...data.links]
    links.forEach(item => {
      nodes.forEach((e, i) => {
        if (e.id === item.source) {
          item.source = i
        } else if (e.id === item.target) {
          item.target = i
        }
      })
    })
    // 合并配置
    this.config = Object.assign({}, defaultConfig, {links, nodes}, defaultWH, configs)

    // 需要高亮的node和link
    this.dependsNode = []
    this.dependsLinkAndText = []

    // 创建力学模拟器
    this.initSimulation()
    return this.graph
  }
  // 创建力学模拟器
  initSimulation() {
    const self = this

    // 1. 创建一个力学模拟器
    this.simulation = d3.forceSimulation(this.config.nodes)
    // simulation.force(name,[force])函数，添加某种力
      .force('link', d3.forceLink(this.config.links))
    // 万有引力
      .force('charge', d3.forceManyBody().strength(this.config.chargeStrength))
    // d3.forceCenter()用指定的x坐标和y坐标创建一个新的居中力。
      .force('center', d3.forceCenter(this.config.width / 2, this.config.height / 2))
    // 碰撞作用力，为节点指定一个radius区域来防止节点重叠，设置碰撞力的强度，范围[0,1], 默认为0.7。设置迭代次数，默认为1，迭代次数越多最终的布局效果越好，但是计算复杂度更高
      .force('collide', d3.forceCollide(this.config.collide).strength(0.2).iterations(5))
    // 在计时器的每一帧中，仿真的alpha系数会不断削减,当alpha到达一个系数时，仿真将会停止，也就是alpha的目标系数alphaTarget，该值区间为[0,1]. 默认为0，
    // 控制力学模拟衰减率，[0-1] ,设为0则不停止 ， 默认0.0228，直到0.001
      .alphaDecay(this.config.alphaDecay)
    // 监听事件 ，tick|end ，例如监听 tick 滴答事件
      .on('tick', () => this.ticked())

    // 2.创建svg标签
    this.SVG = this.graph.append('svg')
      .attr('class', 'svgclass')
      .attr('width', this.config.width)
      .attr('height', this.config.height)
      .call(d3.zoom().scaleExtent(this.config.scaleExtent).on('zoom', () => {
        if (this.config.isScale) {
          this.relMap_g.attr('transform', d3.event.transform)
        }
      }))
      .on('click', () => console.log('画布 click'))
      .on('dblclick.zoom', null)

    // 3.defs  <defs>标签的内容不会显示，只有调用的时候才显示
    this.defs = this.SVG.append('defs')
    // 3.1 添加箭头
    const border = this.config.strokeWidth == 0 ? 7.5 : (1.8 * this.config.strokeWidth)
    this.marker = this.defs
      .append('marker')
      .attr('id', 'marker')
      .attr('markerWidth', 10)    //marker视窗的宽
      .attr('markerHeight', 10)   //marker视窗的高
      .attr('refX', this.config.r + border)//refX和refY，指的是图形元素和marker连接的位置坐标
      .attr('refY', 4)
      .attr('orient', 'auto')     //orient="auto"设置箭头的方向为自动适应线条的方向
      .attr('markerUnits', 'userSpaceOnUse')  //marker是否进行缩放 ,默认值是strokeWidth,会缩放
      .append('path')
      .attr('d', 'M 0 0 8 4 0 8Z')    //箭头的路径 从 （0,0） 到 （8,4） 到（0,8）
      .attr('fill', this.config.linkColor)

    // 3.2 添加多个圈圈图片的 <pattern>
    this.patterns = this.defs
      .selectAll('pattern.patternclass')
      .data(this.config.nodes)
      .enter()
      .append('pattern')
      .attr('class', 'patternclass')
      .attr('id', function (d) {
        return d.id
      })
      .attr('width', '1')
      .attr('height', '1')

    this.patterns.append('rect')
      .attr('width', 2 * this.config.r)
      .attr('height', 2 * this.config.r)
      .attr('fill', function(d) {
        return d.color || self.config.nodeColor
      })

    this.patterns.append('text')
      .attr('class', 'nodetext')
      .attr('x', this.config.r)
      .attr('y', this.config.r * 0.9) // edit
      .attr('text-anchor', 'middle')
      .attr('fill', self.config.fontColor)
      .style('font-size', this.config.r / 3.8)
      .text(function (d) {
        // if (d.name.length > 4) {
        //   return [].slice.call(d.name, 0, 4).join('') + '...'
        // }
        return d.name
      })


      // .text(d => {
      //   const {name} = d
      //   const arr = name.split('')
      //   let result = ''
      //   while (arr.length > 4){
      //     result += (arr.splice(0, 4).join('') + '<br/>')
      //   }
      //   return result
      // })


    // 4.放关系图的容器
    this.relMap_g = this.SVG.append('g')
      .attr('class', 'relMap_g')
      .attr('width', this.config.width)
      .attr('height', this.config.height)

    // 5.关系图添加线
    // 5.1  每条线是个容器，有线 和一个装文字的容器
    this.edges = this.relMap_g
      .selectAll('g.edge')
      .data(this.config.links)
      .enter()
      .append('g')
      .attr('class', 'edge')
      .on('mouseover', function (d) {
        if (self.config.isHighLight) {
          self.highlightLinks(d)
        }
        d3.select(this).selectAll('path.links').attr('stroke-width', 2)
        d3.select(this).selectAll('.rect_g text').style('font-weight', 'bold')
      })
      .on('mouseout', function () {
        if (self.config.isHighLight) {
          self.highlightLinks(null)
        }
        d3.select(this).selectAll('path.links').attr('stroke-width', 1)
        d3.select(this).selectAll('.rect_g text').style('font-weight', 'normal')
      })
      .on('click', function (d) {
        console.log('线click')
      })
      .attr('fill', function(d) {
        return d.color || self.config.linkColor
      })

    // 5.2 添加线
    this.links = this.edges.append('path').attr('class', 'links')
      .attr('d', d => {
        return 'M' + this.config.linkSrc + ',' + 0 + ' L' + getDis(d.source, d.target) + ',0'
      })
      .style('marker-end', 'url(#marker)')
      .attr('stroke', (d) => {
        return d.color || this.config.linkColor
      })

    // 5.3 添加关系文字的容器
    this.rect_g = this.edges.append('g').attr('class', 'rect_g')

    // 5.4 添加rect
    this.rects = this.rect_g.append('rect')
      .attr('x', 40)
      .attr('y', -10)
      .attr('width', 40)
      .attr('height', 20)
      .attr('fill', 'white')
      .attr('stroke', (d) => {
        // var str = d.color ? '#' + d.color : this.config.linkColor
        // return str
        // return 'gray'
        return 'transparent'
      })

    // 5.5 文本标签  坐标（x,y）代表 文本的左下角的点
    this.texts = this.rect_g.append('text')
      .attr('x', 40)
      .attr('y', 5)
      .attr('text-anchor', 'middle')  // <text>文本中轴对齐方式居中  start | middle | end
      .style('font-size', 12).text(d => {
        return d.relation
      })

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'relation-tooltip')
      .style('opacity', 0)
    // 6.关系图添加用于显示圈圈的节点
    this.circles = this.relMap_g
      .selectAll('circle.circleclass')
      .data(this.config.nodes)
      .enter()
      // .append('rect')
      // .attr('width', this.config.r * 2)
      // .attr('height', this.config.r * 2)
      .append('circle')
      .attr('r', this.config.r)
      .attr('class', 'circleclass')
      .style('cursor', 'pointer')
    // .attr("cx", function (d) {
    //     return d.x;
    // })
    // .attr("cy", function (d) {
    //     return d.y;
    // })
      .attr('fill', function (d) {
        return ('url(#' + d.id + ')')
      })
      .attr('stroke', this.config.strokeColor)
      .attr('stroke-width', this.config.strokeWidth)
      .on('mouseover', function (d) {
        d3.select(this).attr('stroke-width', self.config.strokeWidth == 0 ? 5 : (1.5 * self.config.strokeWidth))
        d3.select(this).attr('stroke', d.strokeColor || self.config.strokeColor)
        if (self.config.isHighLight) {
          self.highlightObject(d)
        }
        tooltip.html(d.name)
          .style('left', (d3.event.pageX + 10) + 'px')
          .style('top', (d3.event.pageY + 10) + 'px')
          .style('opacity', 1)
      })
      .on('mouseout', function (d) {
        d3.select(this).attr('stroke-width', self.config.strokeWidth)
        d3.select(this).attr('stroke', d.strokeColor || self.config.strokeColor)
        if (self.config.isHighLight) {
          self.highlightObject(null)
        }
        tooltip.style('opacity', 0)
      })
      // .on('click', function (d) {
      //   console.log('圈圈节点click', d)
      //   // 展示方式2 ：浮窗展示
      //   event = d3.event || window.event
      //   var pageX = event.pageX ? event.pageX : (event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft))
      //   var pageY = event.pageY ? event.pageY : (event.clientY + (document.body.scrollTop || document.documentElement.scrollTop))
      //   // console.log('pagex', pageX);
      //   // console.log('pageY', pageY);
      //   //阻止事件冒泡  阻止事件默认行为
      //   event.stopPropagation ? (event.stopPropagation()) : (event.cancelBubble = true)
      //   event.preventDefault ? (event.preventDefault()) : (event.returnValue = false)
      // })
      // .on('contextmenu', function () {    //鼠标右键菜单
      //   event = event || window.event
      //   event.cancelBubble = true
      //   event.returnValue = false
      // })
    // 应用 自定义的 拖拽事件
      .call(d3.drag()
        .on('start', (d) => {
          d3.event.sourceEvent.stopPropagation()
          // restart()方法重新启动模拟器的内部计时器并返回模拟器。
          // 与simulation.alphaTarget或simulation.alpha一起使用时，此方法可用于在交互
          // 过程中进行“重新加热”模拟，例如在拖动节点时，在simulation.stop暂停之后恢复模拟。
          // 当前alpha值为0，需设置alphaTarget让节点动起来
          if (!d3.event.active) this.simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (d) => {
          // d.fx属性- 节点的固定x位置
          // 在每次tick结束时，d.x被重置为d.fx ，并将节点 d.vx设置为零
          // 要取消节点，请将节点 .fx和节点 .fy设置为空，或删除这些属性。
          d.fx = d3.event.x
          d.fy = d3.event.y
        })
        .on('end', (d) => {
          // 让alpha目标值值恢复为默认值0,停止力模型
          if (!d3.event.active) this.simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }))

    // 文字折行
    this.SVG.selectAll('text.nodetext').call(textWrap, this.config.r * 1.8)
  }

  ticked() {
    // 7.1 修改每条容器edge的位置
    this.edges.attr('transform', function (d) {
      return getTransform(d.source, d.target, getDis(d.source, d.target))
    })

    // 7.2 修改每条线link位置
    this.links.attr('d', d => {
      return 'M' + this.config.linkSrc + ',' + 0 + ' L' + getDis(d.source, d.target) + ',0'
    })


    // 7.3 修改线中关系文字text的位置 及 文字的反正
    this.texts
      .attr('x', function (d) {
        // 7.3.1 根据字的长度来更新兄弟元素 rect 的宽度
        var bbox = d3.select(this).node().getBBox()
        var width = bbox.width
        // ########################
        // $(this).prev('rect').attr('width', width + 10);
        // d3.select(this).prev('rect').attr('width', width + 10);
        // 7.3.2 更新 text 的位置
        return getDis(d.source, d.target) / 2
      })
      .attr('transform', function (d) {
        // 7.3.3 更新文本反正
        if (d.target.x < d.source.x) {
          var x = getDis(d.source, d.target) / 2
          return 'rotate(180 ' + x + ' ' + 0 + ')'
        } else {
          return 'rotate(0)'
        }
      })

    // 7.4 修改线中装文本矩形rect的位置
    this.rects
      .attr('x', function (d) {
        // ######################
        // return getDis(d.source, d.target) / 2 - $(this).attr('width') / 2
        return getDis(d.source, d.target) / 2 - d3.select(this).attr('width') / 2
      })    // x 坐标为两点中心距离减去自身长度一半

    // 5.修改节点的位置
    this.circles
      .attr('cx', function (d) {
        return d.x
      })
      .attr('cy', function (d) {
        return d.y
      })
      // .attr('x', function (d) {
      //   return d.x - d3.select(this).attr('width') / 2
      // })
      // .attr('y', function (d) {
      //   return d.y - d3.select(this).attr('height') / 2
      // })

  }

  // 高亮元素及其相关的元素
  highlightObject(obj) {
    if (obj) {
      let objIndex = obj.index
      this.dependsNode = this.dependsNode.concat([objIndex])
      this.dependsLinkAndText = this.dependsLinkAndText.concat([objIndex])
      this.config.links.forEach((lkItem) => {
        if (objIndex == lkItem['source']['index']) {
          this.dependsNode = this.dependsNode.concat([lkItem.target.index])
        } else if (objIndex == lkItem['target']['index']) {
          this.dependsNode = this.dependsNode.concat([lkItem.source.index])
        }
      })

      // 隐藏节点
      this.SVG.selectAll('circle').filter(d => this.dependsNode.indexOf(d.index) == -1).transition().style('opacity', 0.1)
      // 隐藏线
      this.SVG.selectAll('.edge').filter(d => {
        return ((this.dependsLinkAndText.indexOf(d.source.index) == -1) && (this.dependsLinkAndText.indexOf(d.target.index) == -1))
      }).transition().style('opacity', 0.1)
    } else {
      // 取消高亮
      // 恢复隐藏的线
      this.SVG.selectAll('circle').filter(() => true).transition().style('opacity', 1)
      // 恢复隐藏的线
      this.SVG.selectAll('.edge').filter(d => {
        return ((this.dependsLinkAndText.indexOf(d.source.index) == -1) && (this.dependsLinkAndText.indexOf(d.target.index) == -1))
      }).transition().style('opacity', 1)
      this.dependsNode = []
      this.dependsLinkAndText = []
    }
  }

  highlightLinks(obj) {
    if (obj) {
      // 隐藏节点
      this.SVG.selectAll('circle').filter(d => {
        const sourceIndex = this.config.nodes.findIndex(e => e.id == obj.source.id)
        const targetIndex = this.config.nodes.findIndex(e => e.id == obj.target.id)
        return (d.index != sourceIndex) && (d.index != targetIndex)
      }).transition().style('opacity', 0.1)
      // 隐藏线
      this.SVG.selectAll('.edge').filter(d => d.id != obj.id).transition().style('opacity', 0.1)
    } else {
      this.SVG.selectAll('circle').filter(() => true).transition().style('opacity', 1)
      this.SVG.selectAll('.edge').filter(() => true).transition().style('opacity', 1)
    }
  }
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory :
    (global = global || self, global.RelationGraph = factory)
}(this, RelationGraph))
