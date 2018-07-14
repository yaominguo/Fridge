import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

const root = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>, 
  root
)

if(module.hot){
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>, 
      root
    )
  })
}