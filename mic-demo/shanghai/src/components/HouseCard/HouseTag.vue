<template>
  <div class="house-info-tags">
    <div class="house-info-tag" :style="{backgroundColor: this.getTagIcon.color}">
      <img class="tag-icon" :src="getTagIcon.icon" alt="icon" />
      <p class="tag-info" :style="{color: this.getTagIcon.color}">
        {{this.getDays}}
      </p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    type: {
      // 0-空置 1-欠房租 2-欠水电煤 3-录入 null不显示
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
  },
  computed: {
    getTagIcon() {
      switch (this.type) {
        case '0':
          return {
            icon:require('@/assets/icons/1.2.png'),
            color: '#00c860',
            };
          break;
        case '1':
          return {
            icon: require('@/assets/icons/3.2.png'),
            color: '#ff5958',
          };
          break;
        case '2':
          return {
            icon: require('@/assets/icons/3.2.png'),
            color: '#ff5958',
          };
          break;
        case '3':
          return {
            icon: require('@/assets/icons/2.2.png'),
            color: '#2089e8',
          };
          break;
        case '77':
          return {
            icon: require('@/assets/icons/6.2.png'),
            color: '#3dcdff',
          };
          break;
        case '88':
          return {
            icon: require('@/assets/icons/8.2.png'),
            color: '#ff9d27',
          };
          break;
        case '99':
          return {
            icon: require('@/assets/icons/7.2.png'),
            color: '#c26cf0',
          };
          break;  
        default:
          return null;
          break;
      }
    },
    getDays() {

      if(Number(this.day) <0){
        return `${-this.day}天`;
      }else if(Number(this.day) >= 99){
        return `${this.day}+`;
      }else{
        return `${this.day}天`;
      }
      //return Number(this.day) >= 99 ? `${this.day}+` : `${this.day}天`;
    }
  },
};
</script>


<style scoped>
.house-info-tags {
  padding-left: 8px;
}
.house-info-tag {
  width: 32px;
  /* height: 40px; */
  /* line-height: 20px; */
  /* background: #00c860; */
  font-size: 12px;
  text-align: center;
  display: inline-block;
  -margin-right: 8px;
  border-radius: 4px;
  vertical-align: middle;
}
/* .house-info-tag-detail {
  background: #fff;
  color: #f00;
  height: 20px;
  line-height: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
} */
.tag-icon {
  display: inline-block;
  vertical-align: middle;
}
.tag-info {
  background: #fff;
  /* color: #00c860; */
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-weight: bold;
}
</style>
