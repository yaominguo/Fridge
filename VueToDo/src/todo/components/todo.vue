<template>
  <section class="real-app">
    <input
    type="text"
    class="add-input"
    autofocus="autofocus"
    placeholder="What do you want to do ?"
    @keyup.enter="addTodo"
    >
    <todo-item
    v-for="todo in filteredTodos"
    :todo="todo"
    :key="todo.id"
    @del="deleteTodo"
    />
    <todo-tabs
    :filter="filter"
    :todos="todos"
    @toggle="toggleFilter"
    @clear="clearAllCompleted"
    />
  </section>
</template>

<script>
import TodoItem from './item'
import TodoTabs from './tabs'
let id = 0
export default {
  name: 'Todo',
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      } else {
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  components: {
    TodoItem,
    TodoTabs
  }
}
</script>

<style lang="stylus" scoped>
  .real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
    .add-input
      position relative
      margin 0
      width 100%
      font-size 24px
      font-family inherit
      font-weight inherit
      line-height 1.4em
      border none
      outline none
      color inherit
      box-sizing border-box
      padding 16px 16px 16px 36px
      box-shadow inset 0 -2px 1px rgba(0,0,0,0.03)
</style>
