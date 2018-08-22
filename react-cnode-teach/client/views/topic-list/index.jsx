import React from 'react'
import { observer, inject } from 'mobx-react'
import pt from 'prop-types'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'
import Container from '../layout/container'

@inject('appState') @observer
export default class TopicList extends React.Component {
  changeName = (e) => {
    this.props.appState.changeName(e.target.value)
  }

  asyncBootstrap = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 0)
    })
  )

  render() {
    return (
      <Container>
        <Helmet>
          <title>
            This is topic list
          </title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Button raised="true" color="primary">
          This is a button
        </Button>
        <input type="text" onChange={this.changeName} />
        <span>
          {this.props.appState.msg}
        </span>
      </Container>
    )
  }
}

TopicList.propTypes = {
  // 验证appState是AppState类型，并且是必须的参数
  appState: pt.instanceOf(AppState).isRequired,
}
