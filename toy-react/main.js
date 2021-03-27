import {createElement, render, Component} from './toy-react.js'

class MyComponent extends Component {
  render() {
    return <div>
      <h1>my-component</h1>
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
