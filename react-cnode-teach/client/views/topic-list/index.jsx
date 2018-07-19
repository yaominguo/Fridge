import React from 'react'
import { observer, inject } from 'mobx-react'
import pt from 'prop-types'
import { AppState } from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  changeName = (e) => {
    this.props.appState.changeName(e.target.value)
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>
          {this.props.appState.msg}
        </span>
      </div>
    )
  }
}

TopicList.propTypes = {
  // 验证appState是AppState类型，并且是必须的参数
  appState: pt.instanceOf(AppState).isRequired,
}
