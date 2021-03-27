const RENDER_TO_DOM = Symbol('renderToDOM')

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
  get vdom() {
    return this.render().vdom
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    this._vdom = this.vdom
    this._vdom[RENDER_TO_DOM](range)
  }
  update() {
    const isSameNode = (oldNode, newNode) => {
      if (oldNode.tag !== newNode.tag) return false
      for (const name in newNode.props) {
        if (newNode.props[name] !== oldNode.props[name]) return false
      }
      if (Object.keys(oldNode.props).length > Object.keys(newNode.props).length) return false
      if (newNode.tag === '#text') {
        if (newNode.content !== oldNode.content) return false
      }
      return true
    }
    const update = (oldNode, newNode) => {
      if (!isSameNode(oldNode, newNode)) {
        newNode[RENDER_TO_DOM](oldNode._range)
        return
      }
      newNode._range = oldNode._range
      const newChildren = newNode.vchildren
      const oldChildren = oldNode.vchildren

      if (!newChildren || !newChildren.length) {
        return
      }

      let tailRange = oldChildren[oldChildren.length -1]._range

      for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        const oldChild = oldChildren[i];
        if (i < oldChildren.length) {
          update(oldChild, newChild)
        } else {
          const range = document.createRange()
          range.setStart(tailRange.endContainer, tailRange.endOffset)
          range.setEnd(tailRange.endContainer, tailRange.endOffset)
          newChild[RENDER_TO_DOM](range)
          tailRange = range
        }
      }
    }
    const vdom = this.vdom
    update(this._vdom, vdom)
    this._vdom = vdom
  }

  setState(newState) {
    if (!this.state || typeof this.state !== 'object') {
      this.state = newState
      this.update()
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
    this.update()
  }
}

class ElementWrapper extends Component{
  constructor(tag) {
    super(tag)
    this.tag = tag
  }
  get vdom() {
    this.vchildren = this.children.map(child => child.vdom)
    return this
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    const root = document.createElement(this.tag)
    for (const name in this.props) {
      const value = this.props[name]
      if (name.match(/^on([\s\S]+)$/)) {
        root.addEventListener(
          RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()),
          value
        )
      } else {
        if (name === 'className') {
          root.setAttribute('class', value)
        } else {
          root.setAttribute(name, value)
        }
      }
    }

    if (!this.vchildren) {
      this.vchildren = this.children.map(child => child.vdom)
    }
    for(const child of this.vchildren) {
      const childRange = document.createRange()
      childRange.setStart(root, root.childNodes.length)
      childRange.setEnd(root, root.childNodes.length)
      child[RENDER_TO_DOM](childRange)
    }
    replaceContent(range, root)
  }
}

class TextWrapper extends Component{
  constructor(content) {
    super(content)
    this.tag = '#text'
    this.content = content
  }
  get vdom() {
    return this
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    const root = document.createTextNode(this.content)
    replaceContent(range, root)
  }
}


function replaceContent(range, node) {
  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents()

  range.setStartBefore(node)
  range.setEndAfter(node)
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