import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppState from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
    }
  }

  changeTab = (e, index) => {
    this.setState({
      tabIndex: index,
    })
  }
  /* eslint-disable */
  listItemClick = () => {
  }
  /* eslint-enable */
  render() {
    const { tabIndex } = this.state
    const topic = {
      title: 'This is title',
      name: 'guo',
      reply_count: 20,
      visit_count: 30,
      create_date: '2017-01-01',
      tab: 'Share',
    }
    return (
      <Container>
        <Helmet>
          <title>
            This is topic list
          </title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
      </Container>
    )
  }
}

TopicList.propTypes = {
  // 验证appState是AppState类型，并且是必须的参数
  appState: PropTypes.instanceOf(AppState).isRequired,
}
