<!--  -->
<template>
	<div class="qrcode">
		<div>
			<p @click="qrcodeAppear" v-show="isReplace">微信上传<br /><span class="productQrCode">生成二维码</span></p>
			<Button @click="showImg" class="button" type="primary" v-show="!isReplace" ghost>同步图片 </Button>
		</div>
		<vue-qr class="qr" :text="config.value" :size="59" :margin="0" v-show="!isReplace">
		</vue-qr>
	</div>
</template>

<script>
	import VueQr from "vue-qr";
	export default {
		components: {
			VueQr
		},
		props: ["code"],
		data() {
			return {
				isReplace: true,
				url: "/static/file/codeUpload.html?_ENV=windowUrl&code=",
				config: {
					value: "" //显示的值、跳转的地址
				},
				windowUrl: ''
			};
		},
		computed: {},
		//事件（钩子）回调函数：
		//组件创建之后，数据已经完成初始化，但是DOM还未生成
		created() {},
		//数据装载DOM上后，各种数据已经就位，将数据渲染到DOM上，DOM已经完成
		mounted() {
			let url = String(window.location.href);
			url = url.split('/');
			this.windowUrl = url[0] + '//' + url[2];
			// this.windowUrl='https://zhongbang.omniview.pro';
			this.config.value = this.windowUrl + this.url.replace('windowUrl', this.windowUrl) + this.code;
		},
		watch: {
			code() {
				this.config.value = this.windowUrl + this.url.replace('windowUrl', this.windowUrl) + this.code;
				this.isReplace = true;
			}
		},
		methods: {
			qrcodeAppear() {
				this.isReplace = false;
			},
			showImg() {
				this.$emit("showUploadImg");
			}
		}
	};
</script>
<style scoped>
	.qrcode {
		/* width: 150px; */
		height: 60px;
		border: 1px dotted #e8eaec;
		overflow: hidden;
		background: #f7f7f7;
		border-radius: 5px;
	}

	.qrcode div {
		float: left;
		/* width: 65px; */
		height: 60px;
		padding: 0 5px;
	}

	.qrcode div:hover {
		cursor: pointer;
	}

	.qrcode div p {
		height: 20px;
		line-height: 20px;
		text-align: center;
		padding-top: 10px;
		display: inline-block;
	}

	.qrcode div:nth-child(1) {
		/* width: 80px; */
		text-align: center;
	}

	.qrcode div:nth-child(3) {
		margin-left: 13px;
	}

	.qrcode div .button {
		margin-top: 13px;
	}

	.productQrCode {
		color: #2d8cf0;
	}
</style>
