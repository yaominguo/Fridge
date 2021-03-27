const RENDER_TO_DOM = Symbol('renderToDOM')
const RE_RENDER = Symbol('reRender')

class ElementWrapper {
  constructor(tag) {
    this.root = document.createElement(tag)
  }
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      this.root.addEventListener(
        RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()),
        value
      )
      return
    }
    if (name === 'className') {
      this.root.setAttribute('class', value)
      return
    }

    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    const range = document.createRange()
    range.setStart(this.root, this.root.childNodes.length)
    range.setEnd(this.root, this.root.childNodes.length)
    component[RENDER_TO_DOM](range)
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class TextWrapper{
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._range = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    this.render()[RENDER_TO_DOM](range)
  }
  [RE_RENDER]() {
    let oldRange = this._range
    const newRange = document.createRange()
    newRange.setStart(oldRange.startContainer, oldRange.startOffset)
    newRange.setEnd(oldRange.startContainer, oldRange.startOffset)
    this[RENDER_TO_DOM](newRange)

    oldRange.setStart(newRange.endContainer, newRange.endOffset)
    oldRange.deleteContents()
  }
  setState(newState) {
    if (!this.state || typeof this.state !== 'object') {
      this.state = newState
      this[RE_RENDER]()
      return
    }
    const merge = (oldState, newState) => {
      for(const key in newState) {
        if (!oldState[key] || typeof oldState[key] !== 'object') {
          oldState[key] = newState[key]
        } else {
          merge(oldState[key], newState[key])
        }
      }
    }
    merge(this.state, newState)
    this[RE_RENDER]()
  }
}

export function createElement(tag, attrs, ...children) {
  let e
  if (typeof tag === 'string') {
    e = new ElementWrapper(tag)
  } else {
    e = new tag
  }

  for (const key in attrs) {
    e.setAttribute(key, attrs[key])
  }

  const insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      if (!child) {
        continue
      }
      if (Array.isArray(child)) {
        insertChildren(child)
      } else {
        e.appendChild(child)
      }
    }
  }
  insertChildren(children)
  return e
}

export function render(component, parentNode) {
  const range = document.createRange()
  range.setStart(parentNode, 0)
  range.setEnd(parentNode, parentNode.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_DOM](range)
}