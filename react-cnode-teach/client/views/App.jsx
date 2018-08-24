import React from 'react'
import Routes from '../config/router'
import AppBar from './layout/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    // todo
  }

  render() {
    return [
      <AppBar key="app-bar" />,
      <Routes key="routes" />,
    ]
  }
}
