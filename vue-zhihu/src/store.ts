import { createStore } from 'vuex'
import axios from 'axios'
interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}
interface ImageProps {
  _id?: string
  url?: string
  createAt?: string
}
export interface ColumnProps {
  _id?: string
  title: string
  avatar?: ImageProps
  description: string
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
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'Guo', columnId: 1 }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'Guo', columnId: 1 }
    },
    createPost(state, post) {
      state.posts.push(post)
    },
    fetchColumns(state, data) {
      state.columns = data.data.list
    }
  },
  actions: {
    fetchColumns({ commit }) {
      axios.get('/mock/api/columns').then(res => {
        commit('fetchColumns', res.data)
      })
    }
  },
  getters: {
    getColumnById: state => (id: string) =>
      state.columns.find(column => column._id === id),
    getPostsById: state => (cid: number) =>
      state.posts.filter(post => post.columnId === cid)
  }
})
export default store
