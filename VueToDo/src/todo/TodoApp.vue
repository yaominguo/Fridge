<template>
  <div id="app">
    <div id="cover"></div>
    <todo-header></todo-header>
    <todo></todo>
  </div>
</template>

<script>
import TodoHeader from './components/header'
import Todo from './components/todo'
export default {
  name: 'TodoApp',
  components: {
    TodoHeader,
    Todo
  }
}
</script>

<style lang="stylus" scoped>
  #app
    position relative
    left 0
    right 0
    bottom 0
    top 0
    #cover
      position fixed
      left 0
      right 0
      bottom 0
      top 0
      background-color #000
      opacity .1
      z-index -1
</style>
