<template>
  <div id="login-container" :style="bgStyle">
    <img class="logo" src="@/assets/images/logo.png" alt="logo">
    <a-card class="login-box">
      <h3 style="color: #40a9ff;">登录</h3>
      <a-form :form="form">
        <a-form-item>
          <a-input placeholder="用户名">
            <a-icon
              slot="prefix"
              type="user"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input type="password" placeholder="密码">
            <a-icon
              slot="prefix"
              type="lock"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button @click="login" type="primary" block html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
      <Loader msg="登录中..."/>
    </a-card>
  </div>
</template>

<script>
import bgImg from '@/assets/images/login-bg.png'
import Loader from '@/components/Loader/loader'
import {permission} from '@/util/mixins'

export default {
  name: 'Login',
  mixins: [permission],
  components: {
    Loader,
  },
  data() {
    return {
      tabName: 'login',
      form: this.$form.createForm(this),
      bgStyle: {'background-image': 'url(' + bgImg +')'},
      loginInfo: {},
    }
  },
  created() {
  },
  methods: {
    login() {
      this.$ajax.get({
        url: '/static/user-info.json',
      }).then(res => {
        this.getInfo()
        this.$cookie.set('token', res.token)
        this.$cookie.set('userName', res.name)
        this.$router.push({
          name: 'home',
        })
      })
    },
  },
}
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
