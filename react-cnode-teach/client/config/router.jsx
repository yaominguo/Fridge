import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact />, // 设置了exact是路由必须绝对等于'/'才展示此组件
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={TopicDetail} />,
]
