import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps } from './testData'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}
export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'Guo', columnId: 1 }
    },
    createPost(state, post) {
      state.posts.push(post)
    }
  },
  getters: {
    getColumnById: state => (id: number) =>
      state.columns.find(column => column.id === id),
    getPostsById: state => (cid: number) =>
      state.posts.filter(post => post.columnId === cid)
  }
})
export default store
