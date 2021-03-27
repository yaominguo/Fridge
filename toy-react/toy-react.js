const RENDER_TO_DOM = Symbol('renderToDOM')

class ElementWrapper {
  constructor(tag) {
    this.root = document.createElement(tag)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    const range = document.createRange()
    range.setStart(this.root, this.root.childNodes.length)
    range.setEnd(this.root, this.root.childNodes.length)
    component[RENDER_TO_DOM](range)
    // this.root.appendChild(component.root)
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
    // this._root = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  [RENDER_TO_DOM](range) {
    this.render()[RENDER_TO_DOM](range)
  }
  // get root () {
  //   if (!this._root) {
  //     this._root = this.render().root
  //   }
  //   return this._root
  // }
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
  // parentNode.appendChild(component.root)
  const range = document.createRange()
  range.setStart(parentNode, 0)
  range.setEnd(parentNode, parentNode.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_DOM](range)
}