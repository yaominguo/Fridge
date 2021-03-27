import {createElement, render, Component} from './toy-react.js'

class MyComponent extends Component {
  constructor() {
    super()
    this.state = {
      a: 1,
      b: 2,
    }
  }
  render() {
    return <div>
      <h1>my-component</h1>
      <p>{this.state.a.toString()}</p>
      {this.children}
    </div>
  }
}



render(
  <MyComponent class="class" id="id">
    <h1>h1</h1>
    <div>div</div>
    <p>p</p>
  </MyComponent>
, document.body)
