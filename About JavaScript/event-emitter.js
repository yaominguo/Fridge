// EventEmitter的简单实现
class EventEmitter {
  constructor () {
    this.events = {} //事件列表
    this.maxListeners = 10 //最大监听事件数目
  }
  // 监听
  on (type, listener) {
    if (typeof listener != 'function') {
      throw new Error(`${listener} is not a Function!`)
    }
    if (this.events[type]) {
      this.events.push(listener)
      if (this.maxListeners != 0 && this.events[type].length > this.maxListeners) {
        console.warn('Warning: Possible EventEmitter memory leak detected')
      }
    } else {
      this.events[type] = [listener]
    }
  }
  // 触发
  emit (type, ...rest) {
    if (this.events[type]) {
      // 遍历事件数组，绑定this，传入结构参数rest
      this.events[type].forEach(listen => {
        listen.apply(this, rest)
      })
    } else {
      throw new Error(`There is not a EventListener called ${type}, please check again.`)
    }
  }
  // 移除监听事件
  remove (type, listener) {
    if (typeof listener != 'function') {
      throw new Error(`${listener} is not a Function!`)
    }
    if (this.events[type]) {
      // 筛选不等于listener的元素形成新的事件数组
      this.events[type] = this.events[type].filter(item => {
        item != listener
      })
    } else {
      throw new Error(`There is not a EventListener called ${type}, please check again.`)
    }
  }
}