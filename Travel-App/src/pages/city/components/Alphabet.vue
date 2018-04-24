<template>
  <ul class="list">
    <li>A</li>
    <li>A</li>
    <li>A</li>
    <li>A</li>
    <li>A</li>
    <li>A</li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    position: absolute
    top: 6rem
    right: 0
    bottom: 0
    width: 1.5rem
    padding: 0
    margin: 0
    list-style: none
    display: flex
    flex-direction: column
    justify-content: center
    li
      color: $bgColor
      line-height: 1.5rem
      text-align: center
      font-size: 0.8rem
</style>
