<template>
  <Card class="ov-panel" dis-hover>
    <div slot="title">
      <Icon v-if="icon != ''" class="ov-panel-icon" size="14" :type="icon" />
      <span class="ov-panel-title">{{ title }}</span>
    </div>
    <div v-if="more != ''" slot="extra">
      <span class="ov-panel-more">{{ more }}</span>
    </div>
    <template v-if="type == 'list'">
      <ul class="ov-panel-list">
        <li v-for="(info,index) in list" :key="index">
          {{ info.text }}
        </li>
      </ul>
    </template>
    <template v-if="type == 'gallery'">
      <div v-for="(info,index) in list" :key="index" class="ov-panel-gallery"></div>
    </template>
  </Card>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      tyoe: String,
      default: '',
    },
    more: {
      type: String,
      default: '更多',
    },
    moreLink: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'list',
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.ov-panel {
  margin-bottom: 24px;
  text-align: left;
  border-radius: 0;
}
.ov-panel-icon {
  vertical-align: middle;
  margin-right: 8px;
}
.ov-panel-title {
  vertical-align: middle;
  font-weight: bold;
}
.ov-panel-list {
  margin: 0 12px;
}
.ov-panel-list li {
  list-style-type: none;
  height: 32px;
  line-height: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ov-panel-gallery {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #efefef;
  background: #f9f9f9;
  margin: 8px 8px 0 8px;
}
.ov-panel-more {
  font-size: 12px;
}
</style>

