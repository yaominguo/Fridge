<template>
<Card dis-hover>
  <div class="wrapper">
    <Card
      class="box"
      v-for="item in list"
      :key="item.name"
    >
      <div class="inner" @click="routeTo(item.to)">
        <img :src="item.pic">
        <span>{{item.name}}</span>
      </div>
    </Card>
  </div>
</Card>
</template>
<script>
import investor from '@/assets/images/人.png';
import classification from '@/assets/images/分类.png';
import region from '@/assets/images/地域.png';
import community from '@/assets/images/小区.png';
import houseStyle from '@/assets/images/户型.png';
import house from '@/assets/images/房屋.png';
import property from '@/assets/images/版权.png';
export default {
  name: 'BasicInformation',
  data() {
    return {
      list: [
        {
          name: '区域管理',
          to: 'area-management',
          pic: region,
        },
        {
          name: '小区管理',
          to: 'community-management',
          pic: community,
        },
        {
          name: '出资人管理',
          to: 'investor-management',
          pic: investor,
        },
        {
          name: '取得方式管理',
          to: 'method-management',
          pic: property,
        },
        {
          name: '房屋结构管理',
          to: 'construction-management',
          pic: house,
        },
        {
          name: '房型管理',
          to: 'house-style',
          pic: houseStyle,
        },
        {
          name: '资产用途及分类',
          to: 'class-management',
          pic: classification,
        },
      ]
    };
  },
  methods: {
    routeTo(name) {
      this.$router.push({
        name,
      });
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 82%;
  padding: 10px 0;
  margin: 0 auto;
}
.wrapper > .box {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(51,145,255,0.35);
  margin: 20px;
  cursor: pointer;
  width: 180px;
  height: 180px;
}
.wrapper > .box .inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}
.wrapper .inner span {
  text-align: center;
}
</style>
