<template>
    <div class="form-group">
      <div class="control-form">
        <div class="upload-imgs">
          {{imgs.length}}
          <li v-if="imgs.length==0 ? true : false">
            <input type="file" class="upload" @change="addImg" :ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <a class="add">
              <!-- <i class="iconfont icon-plus"></i><p>点击上传</p>
               -->
               <Icon type="ios-camera" class="btn-icon" />
            </a>
          </li>
          <li v-if="imgs.length>0 ? true : false" v-for='(value, key) in imgs' :key="key">
            <p class="img"><img :src="value.src"><a class="close">
              <Icon type="ios-eye-outline" class="showIcon" @click="handleView(value)"></Icon>
              <Icon type="ios-trash-outline" class="deleteIcon" @click="delImg(key)"></Icon>
              </a></p>
          </li>
        </div>
      </div>
      <Modal title="View Image" v-model="visible">
        <img :src="viewPath" style="width: 100%">
      </Modal>
    </div>
</template>
<script>
  export default {
    props:['imgs','inputer'],
    data() {
      return {
        formData:new FormData(),
        // imgLen:1,
        // imgs:[],
        setFile:{},
        visible:false,
        viewPath:null,
        newUrl:""
      }
    },
    methods: {
      addImg(event){
        let inputDOM = this.$refs[this.inputer];
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        // let oldLen=this.imgLen;
        // let len=this.fil.length+oldLen;
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 1*1024*1024) {
            alert('请选择1M以内的图片！');
            return false
          }
          this.setFile={};
          // this.imgLen++;
          this.$set(this.setFile,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
          let file=this.fil[0];
          let vm=this;
           if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    // 图片base64化
                    vm.newUrl = this.result;
                    vm.$emit("on-complete",vm.setFile,this.result);
                };
            }
        }
      },
      delImg(key){
        this.$emit('delImg')
      },
      handleView(item){
        this.viewPath=item.src;
        this.visible=true;
      }
    }
  }
</script>
<style scoped>
.upload-imgs{margin: 10px 0 30px 0;overflow: hidden;font-size: 0;}
.upload-imgs li{cursor: pointer; position: relative;width: 70px;height: 70px;font-size: 14px;display: inline-block;margin-right: 25px; text-align: center;vertical-align: middle;}
.upload-imgs .add{display: block;
    color: #ffffff;height: 60px;width:60px;padding: 8px 0;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    font-size: 20px;
    color:#000;
}
.upload-imgs .add .iconfont{padding: 10px 0;font-size: 40px;}
.upload-imgs li:hover .add{background-color: $them-color;}
.upload-imgs li .upload{position: absolute;top: 0;bottom: 0;left: 0;right: 0;width: 118px;height: 118px;}
.upload-imgs .img{position: relative;width: 60px;height: 60px;line-height: 60px;}
.upload-imgs .img img{vertical-align: middle;width: 60px;height:60px}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;width:60px;height:60px;right: 0px;top: 0px;line-height: 1;font-size: 22px;color: #fff;font-weight: bold; background-color: #000;opacity: 0.6;}
.upload{opacity:0}
.deleteIcon{    
      position: relative;
      top: 20px;
      left: 4px;
    }
.showIcon{
  position: relative;
  top: 20px;
  left: 2px;
}
</style>
