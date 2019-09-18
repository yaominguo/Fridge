const Layout = () => import('@/components/Layout/main')
const Option1 = () => import('@/views/option1')
const Option2 = () => import('@/views/option2')
const Option3 = () => import('@/views/option3')
const Option4 = () => import('@/views/option4')
const Option5 = () => import('@/views/option5')
const Option6 = () => import('@/views/option6')
const Option7 = () => import('@/views/option7')
const Option8 = () => import('@/views/option8')
const Option9 = () => import('@/views/option9')

export default {
  '1': {
    path: '/navigation-one',
    name: 'navigation-one',
    meta: {
      title: '菜单一',
      icon: 'mail',
      subMenus: ['1-1'],
    },
    component: Layout,
  },
  '1-1': {
    path: '/navigation-one/option1',
    name: 'option1',
    meta: {
      title: '子菜单1',
    },
    component: Option1,
  },
  '2': {
    path: '/navigation-two',
    name: 'navigation-two',
    meta: {
      title: '菜单二',
      icon: 'calendar',
      subMenus: ['2-1', '2-2'],
    },
    component: Layout,
  },
  '2-1': {
    path: '/navigation-two/option2',
    name: 'option2',
    meta: {
      title: '子菜单2',
    },
    component: Option2,
  },
  '2-2': {
    path: '/navigation-two/option3',
    name: 'option3',
    meta: {
      title: '子菜单3',
    },
    component: Option3,
  },
  '3': {
    path: '/navigation-three',
    name: 'navigation-three',
    meta: {
      title: '菜单三',
      icon: 'appstore',
      subMenus: ['3-1', '3-2', '3-3'],
    },
    component: Layout,
  },
  '3-1': {
    path: '/navigation-three/option4',
    name: 'option4',
    meta: {
      title: '子菜单4',
    },
    component: Option4,
  },
  '3-2': {
    path: '/navigation-three/option5',
    name: 'option5',
    meta: {
      title: '子菜单5',
    },
    component: Option5,
  },
  '3-3': {
    path: '/navigation-three/option6',
    name: 'option6',
    meta: {
      title: '子菜单6',
    },
    component: Option6,
  },
  '4': {
    path: '/navigation-four',
    name: 'navigation-four',
    meta: {
      title: '菜单四',
      icon: 'setting',
      subMenus: ['4-1', '4-2', '4-3'],
    },
    component: Layout,
  },
  '4-1':{
    path: '/navigation-four/option7',
    name: 'option7',
    meta: {
      title: '子菜单7',
    },
    component: Option7,
  },
  '4-2': {
    path: '/navigation-four/option8',
    name: 'option8',
    meta: {
      title: '子菜单8',
    },
    component: Option8,
  },
  '4-3': {
    path: '/navigation-four/option9',
    name: 'option9',
    meta: {
      title: '子菜单9',
    },
    component: Option9,
  },
}
