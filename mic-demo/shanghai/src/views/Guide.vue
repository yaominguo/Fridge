<template>
  <div v-if="isFirstLoad" class="bg">
    <div v-if="index == 0" class="top-left">
      <img :src="require('@/assets/images/top-left.jpg')" />
      <p>此处为导航栏</p>
      <!-- <p>此处为主业务功能菜单，点击后进入功能模块细化功能</p> -->
    </div>
    <div v-else-if="index == 1" class="left">
      <img :src="require('@/assets/images/left.jpg')" />
      <!-- <p>次级业务功能菜单，根据主业务功能变化</p> -->
      <p>业务功能菜单</p>
    </div>
    <div v-else-if="index == 2" class="top-right">
      <img :src="require('@/assets/images/top-right.jpg')" />
      <!-- <p>点击用户名旁边的下拉按钮，可获取系统配置菜单。进而完成使用前的基础数据设置，如：分店、员工、房型、收款模式等</p> -->
      <p>点击用户名旁边的下拉按钮，可配置个人信息</p>
    </div>
    <div v-else-if="index == 3" class="top-center" :style="'right:' + right +'px'">
      <img :src="require('@/assets/images/top-center.jpg')" />
      <p>点击快速入口可快速完成合同及房源录入</p>
    </div>
    <div v-else-if="index == 4" class="main">
      <p>主工作区域，所有的表单功能操作都在主工作区域完成</p>
    </div>
    <img @click="handleClick" class="btn" :src="btnUrl" />
  </div>
</template>

<script>
import know from '@/assets/images/know.jpg';
import start from '@/assets/images/start.jpg';
export default {
  name: 'Guide',
  data() {
    return {
      btnUrl: know,
      index: 0,
      isFirstLoad: false,
      right: 100,
    }
  },
  mounted() {
    const btn = document.getElementById('fastBtn');
    this.right = Number(btn.offsetParent.offsetWidth)/2 + 25;
    window.onresize = () => {
      this.right = Number(btn.offsetParent.offsetWidth)/2 + 25;
    }
    this.isFirstLoad = localStorage.getItem('isFirstLoad') == '1';
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    handleClick() {
      this.index += 1;
      if (this.index == 4) {
        this.btnUrl = start;
      } else if (this.index >= 5) {
        localStorage.removeItem('isFirstLoad');
        this.isFirstLoad = false;
        return;
      }
    },
  },
}
</script>

<style>
.bg {
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
.bg > div {
  position: absolute;
  border: 2px dashed #fff;
  border-radius: 4px;
}
.bg > div > img {
  position: absolute;
}
.bg > div > p {
  position: absolute;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.bg > .btn {
  display: inline-block;
  width: 250px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 25%;
  cursor: pointer;
}
.top-left {
  top: 0;
  left: 100px;
  width: 50%;
  height: 66px;
}
.top-left > img {
  left: 100%;
  top: 50px;
  width: 60px;
}
.top-left > p {
  top: 210%;
  left: 100%;
  width: 100%;
}
.left {
  top: 66px;
  left: 0;
  width: 78px;
  height: 90%;
}
.left > img {
  left: 100%;
  width: 80px;
  top: 30%;
}
.left > p {
  top: 40%;
  left: 140%;
  width: 500%;
}
.top-right {
  top: 0;
  right: 20px;
  width: 15%;
  height: 66px;
}
.top-right > img {
  right: 80%;
  top: 105%;
  width: 70px;
}
.top-right > p {
  top: 210%;
  right: 20%;
  width: 200%;
}
.top-center {
  top: 0;
  /* right: 16.5%; */
  width: 66px;
  height: 66px;
}
.top-center > img {
  right: 50%;
  top: 105%;
  width: 30px;
}
.top-center > p {
  top: 220%;
  right: -50%;
  width: 270%;
}
.main {
  top: 66px;
  left: 78px;
  right: 0;
  bottom: 0;
}
.main > p {
  top: 30%;
  width: 100%;
  text-align: center;
}
</style>
