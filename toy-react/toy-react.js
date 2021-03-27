class ElementWrapper {
  constructor(tag) {
    this.root = document.createElement(tag)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper{
  constructor(content) {
    this.root = document.createTextNode(content)
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  get root () {
    if (!this._root) {
      this._root = this.render().root
    }
    return this._root
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
  parentNode.appendChild(component.root)
}