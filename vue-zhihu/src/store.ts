import { createStore, Commit } from 'vuex'
import axios from 'axios'
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
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
export interface GlobalErrorProps {
  status: boolean
  message?: string
}
export interface GlobalDataProps {
  loading: false
  token: string
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  error: GlobalErrorProps
}

const fetchAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false },
    error: { status: false }
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    login(state, data) {
      const { token } = data.data
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem('token', token)
      state.token = token
    },
    fetchUser(state, data) {
      state.user = { isLogin: true, ...data.data }
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
    login({ commit }, payload) {
      return postAndCommit('/mock/api/user/login', 'login', commit, payload)
    },
    fetchUser({ commit }) {
      return fetchAndCommit('/mock/api/user/current', 'fetchUser', commit)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => dispatch('fetchUser'))
    },
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
