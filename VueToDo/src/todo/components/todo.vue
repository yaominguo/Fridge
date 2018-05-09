<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs value="1">
        <tab label="tab1" index="1"></tab>
        <tab index="2">
          <span slot="label" style="color: red">tab2</span>
        </tab>
        <tab label="tab3" index="3"></tab>
      </tabs>
    </div>
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
    <todo-bar
    :filter="filter"
    :todos="todos"
    @toggle="toggleFilter"
    @clear="clearAllCompleted"
    />
  </section>
</template>

<script>
import TodoItem from './item'
import TodoBar from './bar'
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
      this.$notify({content: '添加了一条待办事项'})
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      this.$notify({content: '删除待办事项成功'})
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      const hasCompleted = this.todos.some(todo => { return todo.completed })
      if (hasCompleted) {
        this.todos = this.todos.filter(todo => !todo.completed)
        this.$notify({content: '清除成功'})
      } else {
        this.$notify({content: '没有已完成的待办事项'})
      }
    }
  },
  components: {
    TodoItem,
    TodoBar
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
    .tab-container
      background-color #fff
      padding 0 15px
</style>
