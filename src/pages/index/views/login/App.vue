<template>
  <div class="login-container">
      <form class="login-form" >
        <h3 class="title">API网关</h3>
        <div class="text-field has-icon full-width" :class="{'focus-state':username.focus,'no-empty':username.value != '','error':username.error}">
          <i class="text-field-icon icon fa fa-user"></i>
          <div class="text-field-content">
            <div class="text-field-hint">
              用户名
            </div>
            <input class="text-field-input" v-model="username.value" @focus="username.focus=true" @blur="checkUserName('blur')" @change="checkUserName" />
            <div>
              <hr class="text-field-line">
              <hr class="text-field-focus-line" :class="{'focus':username.focus,'error':username.error}">
            </div>
            <div class="text-field-help" v-show="username.error">{{username.errorMsg}}</div>
          </div>
        </div>
        <div class="text-field has-icon full-width" :class="{'focus-state':password.focus,'no-empty':password.value != '','error':password.error}">
          <i class="text-field-icon icon fa fa-lock"></i>
          <div class="text-field-content">
            <div class="text-field-hint" v-show="password.value == ''">
              密码
            </div>
            <input class="text-field-input" :type="showPwd ? 'text':'password'" v-model="password.value" @focus="password.focus=true" @blur="checkPassword('blur')" @change="checkPassword" @keydown.enter="doLogin" />
            <a href="javascript:void(0);" class="iconeye" @click="showPwd=!showPwd"></a>
            <div>
              <hr class="text-field-line">
              <hr class="text-field-focus-line" :class="{'focus':password.focus,'error':password.error}">
            </div>
            <div class="text-field-help" v-show="password.error">{{password.errorMsg}}</div>
          </div>
        </div>
        <button class="lf-raised-button login-button lf-raised-button-primary lf-raised-button-inverse" type="button" style="outline: none; -webkit-appearance: none;" :class="{'disabled':username.error || password.error ,'hover':btnhover}" @mouseover="btnhover=true" @mouseout="btnhover=false" @click="doLogin">
          <div class="lf-raised-button-wrapper">
            <span class="lf-raised-button-label">登录</span>
          </div>
        </button>
        <div class="form-footer"><a href="//www.feingto.com" class="link">返回首页</a></div>
      </form>
      <div style="z-index: 1; height: 37px;">
        <div style="z-index: 1; bottom: 0px; width: 100%; height: 37px; position: fixed;">
         <!-- <div class="footerWrapper">
            <span>© 2018 Lfeiyun.com 版权所有</span>
            <span class="footer-beian">
            <a href="http://www.miitbeian.gov.cn/" target="_blank">鄂ICP备18001724号</a>
            </span>
          </div>-->
        </div>
      </div>
     </div> 
</template>

<script>
import { APIS } from "@a/js/config.js";
import Auth from "@a/js/myAuth.js";
import $ajax from "@a/js/ajaxService.js";
export default {
  name: "App",
  data() {
    return {
      username: {
        value: "",
        focus: false,
        empty: true,
        error: false,
        errorMsg: ""
      },
      password: {
        value: "",
        focus: false,
        empty: true,
        error: false,
        errorMsg: ""
      },
      showPwd: false,
      btnhover: false,
    };
  },
  watch: {
    _username() {
      this.checkUserName();
    },
    _password() {
      this.checkPassword();
    }
  },
  computed: {
    _username() {
      return this.username.value;
    },
    _password() {
      return this.password.value;
    }
  },
  methods: {
    checkUserName(type) {
      if (type && type === "blur") {
        this.username.focus = false
      }
      if (this.username.value === "") {
        this.username.empty = true
        this.username.error = true
        this.username.errorMsg = "请输入用户名"
        return;
      }
      /*
      let namereg = /^[ A-Za-z0-9]{4,16}$/;
      if (!namereg.test(this.username.value)) {
        this.username.empty = false
        this.username.error = true
        this.username.errorMsg = "用户名 格式无效."
        return;
      }*/
      this.username.empty = false
      this.username.error = false
      this.username.errorMsg = ""
    },
    checkPassword(type) {
      if (type && type === "blur") {
        this.password.focus = false
      }
      if (this.password.value === "") {
        this.password.empty = true
        this.password.error = true
        this.password.errorMsg = "请输入密码"
        return;
      }
      if (this.password.value.length < 6) {
        this.password.empty = false
        this.password.error = true
        this.password.errorMsg = "密码 必须至少有 6 字符."
        return;
      }
      if (this.password.value.length > 20) {
        this.password.empty = false
        this.password.error = true
        this.password.errorMsg = "密码 不能大于20字符."
        return
      }
      this.password.empty = false
      this.password.error = false
      this.password.errorMsg = ""
    },
    doLogin() {
      if (this.username.error || this.password.error) {
        return;
      }
      $ajax({
        url: APIS.login,
        type: "post",
        params: {
          // identifier: this.username.value,
          username: this.username.value,
          password: this.password.value,
          appKey: "gateway",
          appSecret: "gateway123456"
        }
      }).then(data => {
        if (data.success === false) {
          this.$message({
            type: "error",
            message: data.message
          });
        } else {
          this.$message({
            type: "success",
            message: "登录成功"
          });
          Auth.setToken(JSON.stringify(data))
          Auth.setUser(this.username.value)
          Auth.setLoginStatus()
          this.$router.push({path: '/api/list'})
        }
      })
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.note{
  width: 100%;
  height:100%;
}
.imgNote{
  width: 100%;
  height: 100%;
}
.login-container {
  width: 100%;
  height: 100%;
  height: 100vh;
  position: relative;
  z-index: 999;
  background: radial-gradient(farthest-side at top right, #153350, #8da5bd, #4c7196);
}
.login-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 22.8em;
  margin: 7.5em auto;
  padding: 2.1875em 2.1875em 0.9375em 2.1875em;
  overflow: hidden;
  background-color:rgba(255,255,255,0.2);
  border-radius: 5px;
}
.login-form .title {
  color: #fff;
  margin: 0 auto 2.5em auto;
  text-align: center;
  font-weight: bold;
}
.text-field {
  font-size: 16px;
  width: 256px;
  min-height: 48px;
  display: inline-block;
  position: relative;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 8px;
}
.text-field.has-icon {
  padding-left: 56px;
}
.text-field.full-width {
  width: 100%;
}
.icon.fa {
  font-size: 24px;
}
.text-field-icon {
  position: absolute;
  left: 16px;
  top: 12px;
}
.focus-state .text-field-icon {
  color: #4c5c96;
}
.focus-state.error .text-field-icon {
  color: #dd4b39;
}
.text-field-content {
  display: block;
  height: 100%;
  padding-bottom: 12px;
  padding-top: 4px;
}
.text-field-hint {
  position: absolute;
  opacity: 1;
  transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  color: #c0c4cc;
  line-height: 34px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: text;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}
.text-field.no-empty .text-field-hint {
  opacity: 0;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #fafafa inset !important;
}
.text-field-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  border-radius: 0;
  box-shadow: none;
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 32px;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  color: rgba(0, 0, 0, 0.87);
  font-family: inherit;
  position: relative;
}
.iconeye {
  position: absolute;
  right: 0px;
  top: 8px;
  width: 34px;
  height: 22px;
  outline: none;
}
.text-field-line {
  margin: 0;
  height: 1px;
  border: none;
  background-color: #e6e6e6;
  left: 56px;
  right: 0;
  position: absolute;
}
.text-field-focus-line {
  height: 2px;
  border: none;
  background-color: #4c5c96;
  position: absolute;
  left: 56px;
  right: 0;
  margin: -1px 0 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  transition: -webkit-transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
    -webkit-transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}
.text-field-focus-line.error {
  background-color: #dd4b39;
}
.text-field-focus-line.error,
.text-field-focus-line.focus {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
.text-field-help {
  position: absolute;
  margin-top: 6px;
  font-size: 12px;
  line-height: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  left: 0;
  right: 0;
}
.text-field.error .text-field-help {
  color: #dd4b39;
}
.text-field.has-icon .text-field-help {
  left: 56px;
}
.login-container .login-form .login-button {
  margin-top: 10px;
  left: 16px;
  width: calc(100% - 16px);
}
.lf-raised-button.lf-raised-button-inverse {
  color: #fff;
}
.lf-raised-button-primary.disabled {
  background-color: #a6aecb;
}
.lf-raised-button {
  display: inline-block;
  overflow: hidden;
  position: relative;
  border-radius: 2px;
  height: 36px;
  line-height: 36px;
  min-width: 88px;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  text-decoration: none;
  text-transform: uppercase;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  color: #606266;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
}
.lf-raised-button-wrapper {
  border-radius: 2px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.lf-raised-button.disabled.hover .lf-raised-button-wrapper,
.lf-raised-button.disabled:active .lf-raised-button-wrapper,
.lf-raised-button.disabled:hover .lf-raised-button-wrapper {
  background-color: transparent;
}
.lf-raised-button.disabled {
  color: rgba(96, 98, 102, 0.3);
  cursor: not-allowed;
  background-color: #e6e6e6;
  box-shadow: none;
}
.lf-raised-button-primary {
  background-color: #4c5c96;
}
.lf-raised-button-primary.disabled {
  background-color: #a6aecb;
  color: #fff;
}
.lf-raised-button:active {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.156863),
    0 3px 10px rgba(0, 0, 0, 0.227451);
}
.lf-raised-button.lf-raised-button-inverse.hover .lf-raised-button-wrapper {
  background-color: hsla(0, 0%, 100%, 0.3);
}
.form-footer {
  color: #fff;
  margin-top: 1.25em;
  text-align: center;
}
.form-footer .link {
  font-size: 0.8em;
}
.footerWrapper {
  font-size: 0.8em;
  background-color: #fff;
  color: #606266;
  bottom: 0;
  width: 100%;
  line-height: 37px;
  text-align: center;
  vertical-align: middle;
}
.footer-beian {
  color: #4888c9;
  margin-left: 10px;
}
</style>
