function createElement(tag, attrs, ...children) {
  const e = document.createElement(tag)
  for (const key in attrs) {
    e.setAttribute(key, attrs[key])
  }
  for (let child of children) {
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    e.appendChild(child)
  }
  return e
}

const ele = <div class="class" id="id">
  <h1>h1</h1>
  <div>div</div>
  <p>p</p>
</div>

document.body.appendChild(ele)
