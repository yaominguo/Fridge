import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('@/views/main')
const ChinaMap = () => import('@/views/china')
const GDProduction = () => import('@/views/guangdong/gd-production')
const GDTrade = () => import('@/views/guangdong/gd-trade')
const GDDisease = () => import('@/views/guangdong/gd-disease')
const GDFish = () => import('@/views/guangdong/gd-fish')
const GDIndustry = () => import('@/views/guangdong/gd-industry')
const MapTest = () => import('@/views/map-test')
const Map3D = () => import('@/views/3d-map')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/map',
      name: 'map',
      component: ChinaMap
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
      path: '/map2',
      name: 'map2',
      component: MapTest
    },
    {
      path: '/map3d',
      name: 'map3d',
      component: Map3D
    },
  ]
})
