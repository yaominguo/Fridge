import Vue from 'vue'
import Router from 'vue-router'

const GDHome = () => import('@/views/guangdong/gd-home') // 广东 - 首页
const GDEnterprise = () => import('@/views/guangdong/gd-enterprise') // 广东 - 企业专题
const GDProduction = () => import('@/views/guangdong/gd-production') // 广东 - 生产专题
const GDTrade = () => import('@/views/guangdong/gd-trade') // 广东 - 交易专题
const GDDisease = () => import('@/views/guangdong/gd-disease') // 广东 - 疫病专题
const GDFish = () => import('@/views/guangdong/gd-fish') // 广发 - 罗非鱼专题
const GDIndustry = () => import('@/views/guangdong/gd-industry') // 广东 - 产业分析专题
const GDSpecial = () => import('@/views/guangdong/gd-special') // 广东 - 特色种苗专题
const GDFlow = () => import('@/views/guangdong/gd-flow') // 广东 - 操作流程

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: GDHome
    },
    {
      path: '/production',
      name: 'production',
      component: GDProduction
    },
    {
      path: '/trade',
      name: 'trade',
      component: GDTrade
    },
    {
      path: '/disease',
      name: 'disease',
      component: GDDisease
    },
    {
      path: '/fish',
      name: 'fish',
      component: GDFish
    },
    {
      path: '/industry',
      name: 'industry',
      component: GDIndustry
    },
    {
      path: '/special',
      name: 'special',
      component: GDSpecial
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: GDEnterprise
    },
    {
      path: '/flow',
      name: 'flow',
      component: GDFlow
    },
  ]
})
