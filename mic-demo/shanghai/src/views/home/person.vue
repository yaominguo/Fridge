<template>
	<Card dis-hover>
		<Card dis-hover>
			<p slot="title">个人信息</p>
			<Row>
				<Col span="12">
				<div class="content">
					<p><span>姓名</span> <span>{{userInfo.name}}</span></p>
					<p><span>用户ID</span><span>{{userInfo.username}}</span></p>
					<p><span>联系电话</span><span>{{userInfo.phone}}</span><Button @click="showMobileModal('phone')">修改联系电话</Button></p>
					<p><span>证件号码</span><span v-if="userInfo&&userInfo.storeInfo&&userInfo.storeInfo.certNo">{{userInfo.storeInfo.certNo || ''}}</span>
						<!-- <Button @click="showMobileModal('id')">修改或新增证件号码</Button> -->
					</p>
					<p><span>银行账号</span><span v-if="userInfo&&userInfo.storeInfo&&userInfo.storeInfo.bankNo">{{userInfo.storeInfo.bankNo || ''}}</span>
						<!-- <Button @click="showMobileModal('bankId')">修改或新增银行账号</Button> -->
					</p>
				</div>
				</Col>
				<Col span="12">
				<div class="inner">
					<img class="avatar" v-if="avatarImg.path" :src="avatarImg.path" alt="Avatar" />
					<Icon v-else type="ios-contact" size="100" color="#999" />
					<Row type="flex" align="middle" justify="center">
						<Col span="24">
						<ImgUploader :url="$api.IMG_UPLOAD_URL" :maxUploads="1000" :defaultList="defaultList" @on-complete="uploadComplete"
						 :isPhone="true" :showDefault="false" :uploadButton="'person'" :code="figure" @showUploadImg="startRunFun">
						</ImgUploader>
						</Col>
					</Row>
				</div>
				</Col>
				</div>
				</div>
				</Col>
			</Row>
		</Card>
		<Card dis-hover style="margin-top: 16px;">
			<p slot="title">账户安全</p>
			<div class="content">
				<p><span>登录密码</span><span>********</span><Button @click="showPwdModal">修改密码</Button></p>
				<p><span>支付密码</span><span>请前往手机App端进行修改</span></p>
			</div>
		</Card>
		<!-- 修改联系电话 -->
		<Modal v-model="mobileModal" title="修改联系电话" :width="400" :footer-hide="true">
			<Form v-if="mobileModal&&editType=='phone'" ref="mobileModal" :rules="rules" :label-width="90" label-position="right"
			 :model="phoneData">
				<FormItem label="新联系方式" prop="phone">
					<Input v-model="phoneData.phone" placeholder="请输入新手机号" />
				</FormItem>
				<FormItem label="短信验证码" prop="pin">
					<Input v-model="phoneData.pin" style="width: 60%;" placeholder="请填写短信验证码" />
					<Button style="width: 38%;" v-if="showQrcode" @click="sendQrCode">获取验证码</Button>
					<Button style="width: 38%;" v-else>{{timeOutSeconds}}s后重新获取</Button>
				</FormItem>
				<div style="textAlign: right;">
					<Button @click="changePhone" type="primary">确定</Button>
				</div>
			</Form>
			<!-- 	<Form v-if="mobileModal&&editType=='id'" ref="mobileModal" :rules="rules" :label-width="90" label-position="right"
			 :model="phoneData">
				<FormItem label="新联系方式" prop="phone">
					<Input v-model="phoneData.phone" placeholder="请输入新手机号" />
				</FormItem>
				<FormItem label="短信验证码" prop="pin">
					<Input v-model="phoneData.pin" style="width: 60%;" placeholder="请填写短信验证码" />
					<Button style="width: 38%;" v-if="showQrcode" @click="sendQrCode">获取验证码</Button>
					<Button style="width: 38%;" v-else>{{timeOutSeconds}}s后重新获取</Button>
				</FormItem>
				<div style="textAlign: right;">
					<Button @click="changePhone" type="primary">确定</Button>
				</div>
			</Form> -->
			<!-- <Form v-if="mobileModal&&editType=='bankId'" ref="mobileModal" :rules="rules" :label-width="90" label-position="right"
			 :model="phoneData">
				<FormItem label="新联系方式" prop="phone">
					<Input v-model="phoneData.phone" placeholder="请输入新手机号" />
				</FormItem>
				<FormItem label="短信验证码" prop="pin">
					<Input v-model="phoneData.pin" style="width: 60%;" placeholder="请填写短信验证码" />
					<Button style="width: 38%;" v-if="showQrcode" @click="sendQrCode">获取验证码</Button>
					<Button style="width: 38%;" v-else>{{timeOutSeconds}}s后重新获取</Button>
				</FormItem>
				<div style="textAlign: right;">
					<Button @click="changePhone" type="primary">确定</Button>
				</div>
			</Form> -->
		</Modal>
		<!-- 修改登录密码 -->
		<Modal v-model="pwdModal" title="修改登录密码" :width="400" :footer-hide="true">
			<Form v-if="pwdModal" ref="pwdModal" :rules="rules" :model="pwdData" :label-width="90" label-position="right">
				<FormItem label="原密码" prop="old">
					<Input v-model="pwdData.old" type="password" placeholder="请输入原密码" />
				</FormItem>
				<FormItem label="新密码" prop="newPwd">
					<Input v-model="pwdData.newPwd" type="password" placeholder="请输入新密码" />
				</FormItem>
				<FormItem label="确认密码" prop="renewPwd">
					<Input v-model="pwdData.renewPwd" type="password" placeholder="请再次输入密码" />
				</FormItem>
				<FormItem label="短信验证码" prop="pin">
					<Input v-model="pwdData.pin" style="width: 60%;" placeholder="请填写短信验证码" />
					<Button style="width: 38%;" v-if="showQrcodePassword" @click="sendQrCodeGet">获取验证码</Button>
					<Button style="width: 38%;" v-else>{{timeOutSeconds_changePassword}}s后重新获取</Button>
				</FormItem>
				<div style="textAlign: right;">
					<Button @click="changePwd" type="primary">确定</Button>
				</div>
			</Form>
		</Modal>
	</Card>
</template>

<script>
	import ImgUploader from "@/components/Helper/Form/image-upload";
	import {
		setTimeout,
		setInterval,
		clearInterval
	} from "timers";

	export default {
		name: "PersonInfo",
		components: {
			ImgUploader
		},
		data() {
			const checkPhone = (rule, value, callback) => {
				if (value != undefined && value != '') {
					if (!this.$com.checkPhone(value)) {
						callback(new Error("手机号码不合法"));
						this.phoneIsCurrent = false;
					} else {
						this.phoneIsCurrent = true;
						callback();
					}
				} else {
					callback(new Error("手机号码不能为空"));
					this.phoneIsCurrent = false;
				}

			};
			const checkPwd = (rule, value, callback) => {
				if (value != undefined && value != '') {
					if (value && value != this.loginData.pwd) {
						callback(new Error("密码有误"));
					} else {
						callback();
					}
				} else {
					callback(new Error("原密码不能为空"));
				}

			};
			const checkPassword = (rule, value, callback) => {
				if (value === "" || value === undefined) {
					callback(new Error("请输入密码"));
				} else if (this.pwdData.renewPwd != undefined && this.pwdData.renewPwd != "" && value !== this.pwdData.renewPwd) {
					this.$refs.formCustom.validateField('renewPwd');
				} else {
					callback();
				}
			};
			const confirmPassword = (rule, value, callback) => {
				if (value === "" || value === undefined) {
					callback(new Error("请再次输入密码"));
				} else if (this.pwdData.newPwd != undefined && this.pwdData.newPwd != "" && value !== this.pwdData.newPwd) {
					callback(new Error("两次密码输入不一致"));
				} else {
					callback();
				}
			};
			return {
				mobileModal: false,
				pwdModal: false,
				avatarImg: {},
				userInfo: {},
				phoneData: {},
				pwdData: {},
				defaultList: [],
				editType: "",
				phoneIsCurrent: false,
				rules: {
					phone: [{
						required: true,
						validator: checkPhone,
						trigger: 'change'
					}],
					pin: [{
						required: true,
						message: "请输入短信验证码",
						trigger: 'blur'
					}],
					old: [{
						required: true,
						validator: checkPwd,
						trigger: 'blur'
					}],
					newPwd: [{
						required: true,
						validator: checkPassword,
						trigger: 'blur'
					}],
					renewPwd: [{
						required: true,
						validator: confirmPassword
					}]
				},
				showQrcode: true,
				timeOutSeconds: 59,
				showQrcodePassword: true,
				timeOutSeconds_changePassword: 59,
				figure: ''

			};
		},
		mounted() {
			this.getInfo();
			this.getCode();
		},
		methods: {
			getCode() {
				this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
					this.figure = res.data.content.code;
				});
			},
			getInfo() {
				this.$ajax.get(this, this.$api.GET_USER_INFO, {}, res => {
					this.userInfo = res.data.content;
					let url = this.$api.BASEURL;
					if (url.indexOf(":") >= 0) {
						url = url.split(":")[0] + ":" + url.split(":")[1];
					}
					this.avatarImg.path = res.data.content.profilePicture;
					this.$store.dispatch("setUserInfo", res.data.content);
				});
			},
			startRunFun() {
				let count = "";
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.figure), {},
					res => {
						let count = res.data.content.length;
						if (count > 0) {
							let data = res.data.content;
							this.saveAvatar(data[Number(count - 1)].id);
						}
					});
			},
			uploadComplete(response, filename) {
				let data = response.data.content;
				this.defaultList.push({
					picId: data.id,
					picPath: data.path,
					type: "room"
				});
				this.saveAvatar(response.data.content.id);
			},
			saveAvatar(query) {
				this.$ajax.put(
					this,
					this.$api.PUT_AVATAR + query, {
						fileId: this.avatarImg.id
					},
					res => {
						this.$Message.success("头像上传成功");
						this.getInfo();
					}
				);
			},
			showMobileModal(query) {
				this.phoneData = {};
				this.mobileModal = true;
				this.editType = query;
			},
			showPwdModal() {
				this.pwdData = {};
				this.pwdModal = true;
			},
			changePhone() {
				this.$refs['mobileModal'].validate(valid => {
					if (!valid) return;
					this.$ajax.put(this, this.$api.PUT_USER_INFO, this.phoneData, res => {
						this.mobileModal = false;
						this.$Message.success("修改成功");
						this.getInfo();
					});
				});
			},
			changePwd() {
				this.$refs['pwdModal'].validate(valid => {
					if (!valid) return;
					this.$ajax.put(this, this.$api.PUT_PWD, this.pwdData, res => {
						this.pwdModal = false;
						this.$Message.success("修改成功, 请重新登录");
						this.$router.push({
							name: "Login"
						});
					});
				});
			},
			sendQrCode() {
				if (this.phoneData.phone != "" && this.phoneData.phone != undefined && this.phoneIsCurrent == true) {
					this.$ajax.get(this, this.$api.GET_PHONE_CODE.replace("{type}", "phone").replace("{phone}", this.phoneData.phone),
						null, res => {});
					this.showQrcode = false;
					let changePhoneTimer = setInterval(() => {
						if (this.timeOutSeconds > 0) {
							this.timeOutSeconds -= 1;
						} else {
							this.showQrcode = true;
							this.timeOutSeconds = 59;
							clearInterval(changePhoneTimer);
						}
					}, 1000);
				} else {
					this.$Message.error("请先填写合法的手机号！");
				}
			},
			sendQrCodeGet() {
				this.$ajax.get(this, this.$api.GET_PHONE_CODE.replace("{type}", "pwd").replace("{phone}", this.userInfo.phone),
					null, res => {});
				this.showQrcodePassword = false;
				let changePasswordTimer = setInterval(() => {
					if (this.timeOutSeconds_changePassword > 0) {
						this.timeOutSeconds_changePassword -= 1;
					} else {
						this.showQrcodePassword = true;
						this.timeOutSeconds_changePassword = 59;
						clearInterval(changePasswordTimer);
					}
				}, 1000);
			}
		},
		computed: {
			user() {
				let userInfo = this.$cookie.get("userInfo");
				if (!userInfo) return {};
				return JSON.parse(userInfo);
			},
			canInputTxt() {
				return this.$com.checkPhone(this.phoneData.phone);
			},
			canGetMsg() {
				const {
					old,
					newPwd,
					renewPwd
				} = this.pwdData;
				return (
					old &&
					newPwd &&
					renewPwd &&
					old == this.loginData.pwd &&
					newPwd == renewPwd
				);
			},
			loginData() {
				const data = this.$cookie.get("userInfo");
				if (data) {
					return JSON.parse(data);
				}
				return {};
			}
		}
	};
</script>

<style scoped>
	.content>p {
		display: flex;
		align-items: center;
		line-height: 40px;
	}

	.content>p>span {
		margin-right: 20px;
	}

	.content>p>span:first-child {
		display: inline-block;
		width: 100px;
		text-align: right;
		color: #999;
		font-weight: bold;
	}

	.inner {
		display: flex;
		margin-top: 50px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.upload {
		padding-left: 0 !important;
		display: inline-block;
	}

	.avatar {
		width: 100px;
		height: 100px;
		margin-bottom: 10px;
		border-radius: 50%;
	}
</style>
