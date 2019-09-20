<style scoped>
.ivu-btn {
  padding: 0;
}
.picLlist {
  height: 70px;
  width: 600px;
  margin-top: 5px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
p {
  margin-top: 20px;
}
.root {
  min-height: 58px;
  position: relative;
  padding-left: 63px;
}
.uploadButton {
  height: 60px;
  width: 60px;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px dotted #e8eaec;
}
.customerBtn {
  padding: 4px 8px;
}
</style>

<template>
  <div class="root">
    <div>
      <slot name="button" />
      <Button class="customerBtn" v-if="customerBtn" :id="uploadButton" icon="ios-cloud-upload-outline">{{btnTxt}}</Button>
      <Button v-else :id="uploadButton" class="uploadButton" :class="buttonClasses">
        <Icon :type="icon" color="black" size="20"></Icon>
      </Button>
			<qrcodeImage :code="qrcode"  v-show="isPhone" style="display: inline-block;" @showUploadImg="showUploadImg" ></qrcodeImage>
      <div
        class="demo-upload-list"
        v-if="picLists.length>0&&showDefault"
        v-for="(item,index) in picLists"
        :key="index"
      >
        <img :src="item.picPath">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click="handleView(item.picPath)"></Icon>
          <Icon type="ios-trash-outline" @click="handleRemove(item,index)"></Icon>
        </div>
      </div>
    </div>
    <Modal title="View Image" v-model="visible">
      <img :src="viewPath" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import ss from "../../../../static/js/simple-ajax-uploader.js";
import qrcodeImage from "./qrcodeImage";
const prefixCls = "civu-upload-";
import Cookies from "js-cookie";
export default {
	components:{
		qrcodeImage
	},
  props: {
    cusClass: {
      type: Array,
      default: function() {
        return [];
      }
    },
    url: {
      type: String,
      required: true
    },
    icon:{
      type:String,
      default:'ios-camera'
    },
    maxSize: {
      type: Number,
      default: 10240 //默认10M
    },
    allowExt: {
      type: Array,
      default: function() {
        return ["jpg", "jpeg", "png"];
      }
    },
    inputName: {
      type: String,
      default: "file"
    },
    customHeaders: {
      type: Object,
      default: function() {
        return {};
      }
    },
    completedTipLabel: {
      type: String,
      default: ""
    },
    defaultList: {
      type: Array
    },
    uploadButton: {
      type: String
    },
    maxUploads: {
      type: [String, Number]
    },
    customerBtn: {
      type: Boolean,
      default: false,
    },
		showDefault:{
			type: Boolean,
			default: true
		},
    btnTxt: {
      type: String,
      default: '上传图片',
    },
		code:{
			type: [String, Number]
		},
		isPhone:{
			type: Boolean
		}
  },
  data() {
    return {
      className: "",
      uploadText: "",
      visible: false,
      viewPath: ""
    };
  },
  mounted() {
    let vm = this;
    let header = vm.httpHeader();
    let uploader = new ss.SimpleUpload({
      customHeaders: header, //自定义 HTTP request headers
      customProgressHeaders: header, //自定义 HTTP request headers
      maxSize: this.maxSize, //文件最大上传大小，以KB为单位
      maxUploads: 1, //允许上传文件个数
      button: this.uploadButton, // 绑定的按钮 ID
      url: this.url, // 请求地址
      responseType: "json", // 返回类型，可参数化
      name: this.inputName, // 上传参数名，可参数化
      allowedExtensions: this.allowExt, // 允许的后缀
      onSubmit: function(filename, extension, uploadBtn, fileSize) {
        // 上传开始的回调
        vm.uploadText = ""; // 此处可自行修改，表述当前文件正在上传即可
        if (vm.picLists.length >= Number(vm.maxUploads)) {
          vm.$Message.error("最多上传" + vm.maxUploads + "张！");
          return;
        } else {
          vm.$Spin.show();
          vm.$emit("on-submit", filename, extension, uploadBtn, fileSize); // 监听 on-submit 事件，参数为文件名（带后缀）
        }
      },
      /**
       * Function to be called when an upload is manually aborted by clicking on an element that was passed to
       */
      onAbort: function(filename, uploadBtn, fileSize) {
        vm.uploadText = "";
        vm.$Spin.hide();
        vm.$emit("on-abort", filename); // 监听 on-abort 事件，参数为文件名（带后缀）
      },
      /**
       * Function to be called if the file size exceeds the limit which is set in the maxSize option, if it is set.
       */
      onSizeError: function(filename, fileSize) {
        vm.uploadText = "";
        vm.$Spin.hide();
        vm.$emit("on-size-error", filename, fileSize); // 监听 on-size-error 事件，参数为文件名（带后缀）
      },
      /**
       * Function to be called if the extension of a file is not permitted in the allowedExtensions option, if it is set.
       */
      onExtError: function(filename, extension) {
        vm.uploadText = "";
        vm.$Spin.hide();
        let error=vm.allowExt.join(',');
        vm.$Message.error('请上传'+error+'结尾的文件类型');
        vm.$emit("on-ext-error", filename, extension); // 监听 on-ext-error 事件，参数为文件名（带后缀）
      },
      onComplete: function(filename, response) {
        if (vm.picLists.length >= Number(vm.maxUploads)) {
          return;
        }
        // 上传完成的回调
        vm.$Spin.hide();
        if (!response) {
          vm.$emit("on-uncomplete"); // 监听 on-uncomplete 事件，表示发送成功了，但是 response 未正确返回（通常情况不用理会）。
          return false; // responese 异常的回调
        } else {
          vm.uploadText =
            vm.completedTipLabel == ""
              ? filename
              : vm.completedTipLabel + ":" + filename; // 此处可自行修改，表述当前上传完成即可
          vm.$emit("on-complete", response, filename); // 监听 on-complete 事件，参数为 response
        }
      },
      onError: function(filename, errorType) {
        // 发送失败的回调
        vm.uploadText = "";
        vm.$Spin.hide();
        vm.$Message.error("上传失败！");
        vm.$emit("on-error", filename, errorType); // 监听 on-error 事件，参数为文件名和错误类型
      }
    });
  },
  methods: {
    httpHeader() {
      let accessToken = Cookies.get("token");
      accessToken = accessToken ? accessToken : "";
      let header = {};
      if (accessToken != "") {
        header.Authorization = accessToken;
      }
      return header;
    },
    handleRemove(item,index) {
      this.$emit("on-remove", item,index);
    },
    handleView(path) {
      this.visible = true;
      this.viewPath = path;
    },
    showUploadImg(){
      this.$emit("showUploadImg");
    }
  },
  computed: {
    /**
     * 结合入参，生成按钮Class
     */
    buttonClasses() {
      let classes = [];
      classes.push(prefixCls + "button");
      for (let i = 0; i < this.cusClass.length; i++) {
        classes.push(prefixCls + this.cusClass[i]);
      }
      return classes;
    },
    qrcode(){
      return this.code;
    },
		picLists(){
			return this.defaultList;
		}
  }
};
</script>
