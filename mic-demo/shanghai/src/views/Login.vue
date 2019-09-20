<template>
  <div id="login-container" :style="bgStyle">
    <img class="logo" src="@/assets/images/logo.png" alt="logo">
    <Card class="login-box" dis-hover :bordered="false">
      <Tabs @on-click="changeTab" v-model="tabName" :animated="false">
        <TabPane label="登录" name="login">
          <Form class="login-form" ref="loginForm" :rules="rules" :model="loginInfo">
            <FormItem prop="name">
              <Input v-model="loginInfo.name" placeholder="请输入手机号码" />
            </FormItem>
            <FormItem prop="pwd">
              <Input @keyup.native.enter="login" v-model="loginInfo.pwd" type="password" placeholder="请输入密码" />
            </FormItem>
            <div class="pwd-operate">
              <Checkbox v-model="loginInfo.isRemember">记住密码</Checkbox>
              <Button @click="forgetModal=true" type="text" style="color: #2589f3;">忘记密码?</Button>
            </div>
            <FormItem class="btn-wrapper">
              <Button type="primary" @click="login">登录</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="房东入驻" name="owner">
          <Form class="login-form" ref="signForm" :rules="rules" :model="signInfo">
            <FormItem prop="name">
              <Input v-model="signInfo.name" placeholder="请输入手机号码" />
            </FormItem>
            <FormItem prop="message">
              <Input v-model="signInfo.message" placeholder="请输入短信验证码">
                <Button style="height: 100%;" slot="append" :disabled="disableBtn" @click="getCode(signInfo.name)">{{btnTxt}}</Button>
              </Input>
            </FormItem>
            <FormItem prop="pwd">
              <Input v-model="signInfo.pwd" type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem prop="confirm">
              <Input v-model="signInfo.confirm" type="password" placeholder="请再次输入密码" />
            </FormItem>
            <FormItem class="btn-wrapper">
              <Button type="primary" @click="signIn">注册</Button>
            </FormItem>
          </Form>
        </TabPane>
        <!-- <TabPane label="租客注册" name="tenant">
          <Form class="login-form" ref="signForm" :rules="rules" :model="signInfo">
            <FormItem prop="name">
              <Input v-model="signInfo.name" placeholder="请输入手机号码" />
            </FormItem>
            <FormItem prop="pwd">
              <Input v-model="signInfo.pwd" type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem prop="confirm">
              <Input v-model="signInfo.confirm" type="password" placeholder="请再次输入密码" />
            </FormItem>
            <FormItem prop="message">
              <Input v-model="signInfo.message" placeholder="请输入短信验证码" />
            </FormItem>
            <FormItem class="btn-wrapper">
              <Button type="primary" @click="signIn">注册</Button>
            </FormItem>
          </Form>
        </TabPane> -->
      </Tabs>
      <Modal
        title="忘记密码"
        v-model="forgetModal"
        width=300
        @on-cancel="closeForgetModal"
      >
        <Form v-if="forgetModal" class="login-form" ref="forgetForm" :rules="rules" :model="forgetInfo">
          <FormItem prop="name">
            <Input v-model="forgetInfo.name" placeholder="请输入手机号码" />
          </FormItem>
          <FormItem prop="message">
            <Input v-model="forgetInfo.message" placeholder="请输入短信验证码">
              <Button style="height: 100%;" slot="append" :disabled="disableBtn" @click="getCode(forgetInfo.name)">{{btnTxt}}</Button>
            </Input>
          </FormItem>
          <FormItem prop="pwd">
            <Input v-model="forgetInfo.pwd" type="password" placeholder="请输入新密码" />
          </FormItem>
          <FormItem prop="confirm">
            <Input v-model="forgetInfo.confirm" type="password" placeholder="请再次输入密码" />
          </FormItem>
        </Form>
        <div slot="footer" class="btn-wrapper">
          <Button type="primary" @click="handleSubmit">提交</Button>
        </div>
      </Modal>
      <Loader :msg="loadingMsg"/>
    </Card>
  </div>
</template>

<script>
import bgImg from '@/assets/images/login-bg.png';
import Loader from '@/components/Loader/Loader';
// import {permission} from '@/components/Helper/CommonMethod/mixins.js';

export default {
  name: 'Login',
  // mixins: [permission],
  components: {
    Loader,
  },
  data() {
     const confirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== (this.forgetModal ? this.forgetInfo.pwd : this.signInfo.pwd)) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!this.$com.checkPhone(value)) {
        callback(new Error('手机号码有误'));
      } else {
        callback();
      }
    };
    return {
      tabName: 'login',
      forgetModal: false,
      bgStyle: {'background-image': 'url(' + bgImg +')'},
      loginInfo: {
        name: '',
        pwd: '',
        isRemember: false,
      },
      signInfo: {
        name: '',
        pwd: '',
        confirm: '',
        message: '',
        type: '',
      },
      forgetInfo: {
        name: '',
        pwd: '',
        confirm: '',
        message: '',
      },
      rules: {
        name: [
          {
            validator: checkPhone,
            trigger: 'blur',
          },
        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        confirm: [
          {
            validator: confirmPassword,
            trigger: 'blur',
          },
        ],
        message: [
          {
            required: true,
            message: '请输入短信验证码',
            trigger: 'blur',
          },
        ],
      },
      btnTxt: '获取验证码',
      disableBtn: false,
      timer: null,
    };
  },
  created() {
    this.checkUserInfo();
  },
  methods: {
    getCode(val) {
      if(!this.$com.checkPhone(val)) {
        this.$Message.error('请填写正确的手机号码');
        return;
      }
      this.$ajax.get(
        this,
        this.$api.GET_PHONE_CODE.replace('{type}', this.forgetModal ? 'back' : 'register').replace('{phone}', val),
        null,
        (res) => {
          this.disableBtn = true;
          let num = 60;
          const interval = () => {
            this.timer = setInterval(()=> {
              if(num <= 0) {
                this.clearTimer();
                return;
              }
              this.btnTxt = (num-=1) + 's';
            },1000);
          }
          interval();
        },
      )
    },
    clearTimer() {
      clearInterval(this.timer);
      this.btnTxt = '获取验证码';
      this.disableBtn = false;
    },
    closeForgetModal() {
      this.clearTimer();
      this.forgetInfo = {};
    },
    login() {
      this.$refs.loginForm.validate(valid => {
        if(!valid) return;
        const { name, pwd, isRemember } = this.loginInfo;
        const params = {
          grant_type: 'password',
          client_id: 'house',
          client_secret: 'house',
          username: name,
          password: pwd,
        };
        this.$ajax.login(
          this,
          this.$api.GET_TOKEN,
          params,
          (res) => {
            const userInfo = JSON.stringify(this.loginInfo);
            localStorage.setItem('isFirstLoad', '1');
            this.$cookie.set('userInfo', userInfo);
            this.$cookie.set("token",res.access_token);
            this.$cookie.set("refresh_token",res.refresh_token);
            this.$cookie.remove('curTopMenuName');
            const NavbarList = JSON.stringify([{name: "资产首页", path: "/asset-home"}]);
            this.$cookie.set('NavbarList', NavbarList);
            // this.getInfo();
            this.$router.push({
              name: 'Portal',
            });
          },
        );
      })
    },
    signIn() {
      this.$refs.signForm.validate(valid => {
        if(!valid) return;
        const { name, pwd, confirm, message, type } = this.signInfo;
        let signType = '';
        if(type == 'tenant') {
          signType = '0';
        } else if (type == 'owner') {
          signType =  '1';
        }
        const params = {
          username: name,
          pwd: pwd,
          code: message,
          type: signType,
        };
        this.$ajax.login(
          this,
          this.$api.SIGN_IN,
          params,
          (res) => {
            this.$Message.success('注册成功，请登陆');
            this.tabName = 'login';
          },
        );
      });
    },
    handleSubmit() {
      this.$refs.forgetForm.validate(valid => {
        if(!valid) return;
        const params = {
          username: this.forgetInfo.name,
          code: this.forgetInfo.message,
          newPwd: this.forgetInfo.pwd,
          loginRole: '1',
        };
        this.$ajax.post(
          this,
          this.$api.POST_FORGET_PWD,
          params,
        ).then(() => {
          this.$Message.success('申请成功！');
          this.forgetModal = false;
        }).catch(() => {
          this.forgetModal = false;
        })
      })
    },
    checkUserInfo() {
      let userInfo = this.$cookie.get('userInfo');
      if (!userInfo) {
        return;
      }
      userInfo = JSON.parse(userInfo);
      if (userInfo.isRemember === true) {
        this.loginInfo = userInfo;
      }
    },
    changeTab(tab) {
      this.signInfo =  {
        name: '',
        pwd: '',
        confirm: '',
        message: '',
        type: '',
      };
      this.signInfo.type = tab;
      this.clearTimer();
    },
  },
  computed: {
    loadingMsg() {
      return this.tabName === 'login' ? '登录中...' : '加载中...';
    },
  },
};
</script>

<style scoped>
#login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 280px;
  background: #ffffff;
  border-radius: 5px;
}
.login-box input {
  margin-top: 20px;
}
.login-box .ivu-form-item-content {
  line-height: 0;
}
.btn-wrapper {
  text-align: center;
  margin-bottom: 0;
}
.btn-wrapper button {
  width: 100%;
}
.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 30px;
  /* border: 2px solid #fff;
  border-radius: 50%; */
  padding: 5px;
}
.type-wrapper {
  font-size: 12px;
  color: #c9c9c9;
  margin-bottom: 10px;
}
.type-wrapper span {
  cursor: pointer;
}
.type-wrapper span:hover {
  color: #0076FF;
}
.type-wrapper span.active {
  color: #0076FF;
}
.pwd-operate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1px;
  margin-bottom: 10px;
}
</style>
