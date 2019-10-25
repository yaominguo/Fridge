<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Blog v-for="blog in blogs" :key="blog.title" :post="blog"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Blog, { Post } from '@/components/Blog.vue';

@Component({
  components: {
    Blog,
  },
})
export default class Home extends Vue {
  private blogs: Post[] = [
    {
      title: 'First title',
      body: 'First body',
      author: 'Guo',
      datePosted: new Date('2019-10-01'),
    },
    {
      title: 'Second title',
      body: 'Second body',
      author: 'Guo',
      datePosted: new Date('2019-10-02'),
    },
    {
      title: 'Third title',
      body: 'Third body',
      author: 'Guo',
      datePosted: new Date('2019-10-03'),
    },
  ]
}
</script>
