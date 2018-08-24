import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppState from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { TopicStore } from '../../store/store';

@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
)) @observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
    }
  }

  componentDidMount() {
    // 获取数据
    this.props.topicStore.fetchTopics()
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
    const { topicStore } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    // const topic = {
    //   title: 'This is title',
    //   name: 'guo',
    //   reply_count: 20,
    //   visit_count: 30,
    //   create_date: '2017-01-01',
    //   tab: 'Share',
    // }
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
        <List>
          {
            topicList.map(topic => (
              <TopicListItem onClick={this.listItemClick} topic={topic} key={topic.id} />
            ))
          }
        </List>
        {
          syncingTopics
            ? (
              <div>
                <CircularProgress color="primary" size={100} />
              </div>
            )
            : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  // 验证appState是AppState类型，并且是必须的参数
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}
