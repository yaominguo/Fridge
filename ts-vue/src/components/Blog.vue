<template>
  <div class="blogpost">
    <h2 @click="handleClick">{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <p class="meta">Written by {{post.author}} on {{date}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface Post {
  title: string;
  body: string;
  author: string;
  datePosted: Date;
}
@Component
export default class Blog extends Vue {
  @Prop() private post!: Post;

  get date() {
    const { datePosted } = this.post;
    return `${datePosted.getDate()}/${datePosted.getMonth()}/${datePosted.getFullYear()}`;
  }

  private handleClick():void {
    this.$router.push({
      name: 'about',
    });
  }
}
</script>

<style lang="stylus" scoped>
h2
  text-decoration underline;
p.meta
  font-style italic;
</style>
