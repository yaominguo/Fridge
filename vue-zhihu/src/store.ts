import { createStore, Commit } from 'vuex'
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
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt: string
  column: string
}
export interface GlobalDataProps {
  loading: false
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const fetchAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'Guo', columnId: 1 }
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val
    },
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'Guo', columnId: 1 }
    },
    createPost(state, post) {
      state.posts.push(post)
    },
    fetchColumns(state, data) {
      state.columns = data.data.list
    },
    fetchColumn(state, data) {
      state.columns = [data.data]
    },
    fetchPosts(state, data) {
      state.posts = data.data.list
    }
  },
  actions: {
    fetchColumns({ commit }) {
      fetchAndCommit('/mock/api/columns', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      fetchAndCommit(`/mock/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      fetchAndCommit(`/mock/api/columns/${cid}/posts`, 'fetchPosts', commit)
    }
  },
  getters: {
    getColumnById: state => (id: string) =>
      state.columns.find(column => column._id === id),
    getPostsById: state => (cid: string) =>
      state.posts.filter(post => post.column === cid)
  }
})
export default store
