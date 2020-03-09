<template>
  <div ref="relationGraph"/>
</template>

<script>
import RelationGraph from './relation-graph.js'
export default {
  name: 'RelationGraph',
  props: {
    data: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      graph: null,
    }
  },
  mounted() {
    this.$nextTick(this.init)
  },
  methods: {
    init() {
      if (this.graph) {
        this.graph.selectAll('*').remove()
      }
      this.graph = new RelationGraph(this.$refs.relationGraph, this.data, this.config)
    }
  },
  watch: {
    data(cur, past) {
      if (!cur || cur === past) return
      this.init(cur)
    }
  },
}
</script>

<style>
.relation-tooltip {
  position: fixed;
  padding: 0.5rem 1rem;
  background-color: rgba(0,0,0,0.5);
  border-radius: 0.5rem;
  color: #fff;
  backdrop-filter: blur(0.5rem);
  -webkit-backdrop-filter: blur(0.5rem);
}
</style>
