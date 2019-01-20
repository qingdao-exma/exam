<template>
  <div>
    <header-com :searchable="false"></header-com>
    <div :style="{'backgroundImage':'url('+logboxbg+')'}" class="loginbox">
        <div class="logbox" :style="{'backgroundImage':'url('+logbg+')'}">
        	<p class="logtt"><span>登录</span></p>
            <div style=" margin: 20px auto 0; width:280px;" v-if="!loginStatus">
                <el-form label-position="right" label-width="80px" :model="loginForm" :rules="loginRule" ref="loginRef">
                    <el-form-item label="用户名" prop="userName">
                        <el-input :maxlength="18" v-model="loginForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" style="margin-bottom:5px !important;" prop="captcha">
                        <el-row>
                            <el-col :span="15">
                                <el-input v-model="loginForm.captcha" :maxlength="5"  @keyup.enter.native="onSubmit"></el-input>
                            </el-col>
                            <el-col :span="9">
                                <img :src="captcha" @click="getCaptcha" width="70" height="36" style="vertical-align:middle;margin-left:5px;" class="avatar">
                            </el-col>     
                        </el-row>    
                    </el-form-item>
                    <!-- <el-form-item class="clearfix check-form">
                       <el-checkbox v-model="rememberMe" style="float: left;">记住密码</el-checkbox>
                   </el-form-item> -->   
                </el-form>
                <div class="login-btn" @click="onSubmit">登&nbsp;&nbsp;录</div>
            </div>

            <div v-if="loginStatus" style="padding:20px; text-align:center; line-height:2;">
                {{ userName }}<br>
                青岛石化港口作业公司<br>
                <a href="" style="color:rgb(0, 62, 125)">退出</a><br>
                您有考试即将开始
            </div>
        </div>
    </div>

    <el-row style="margin-top:20px; margin-bottom:20px;">
    <el-col :span="16">
    <title-com title="通知公告"><a href="" slot="more">更多</a></title-com>
    <ul class="noticelist">
      <li class="clearfix" :style="{'backgroundImage':'url('+dot+')'}"><a href="">通知公告通知公告通知公告通知公告通知公告</a><span>2018-02-06</span></li>
      <li class="clearfix" :style="{'backgroundImage':'url('+dot+')'}"><a href="">通知公告通知公告通知公告通知公告通知公告</a><span>2018-02-06</span></li>
      <li class="clearfix" :style="{'backgroundImage':'url('+dot+')'}"><a href="">通知公告通知公告通知公告通知公告通知公告</a><span>2018-02-06</span></li>
      <li class="clearfix" :style="{'backgroundImage':'url('+dot+')'}"><a href="">通知公告通知公告通知公告通知公告通知公告</a><span>2018-02-06</span></li>
      <li class="clearfix" :style="{'backgroundImage':'url('+dot+')'}"><a href="">通知公告通知公告通知公告通知公告通知公告</a><span>2018-02-06</span></li>
       <li class="clearfix" :style="{'backgroundImage':'url('+dot+')'}"><a href="">通知公告通知公告通知公告通知公告通知公告</a><span>2018-02-06</span></li>
      <li class="clearfix" :style="{'backgroundImage':'url('+dot+')'}"><a href="">通知公告通知公告通知公告通知公告通知公告</a><span>2018-02-06</span></li>
    </ul>
    </el-col>
    <el-col :span="1">&nbsp;</el-col>
    <el-col :span="7">
    <title-com title="考试报名"></title-com>
    <div class="tools">
                    <table><tr>
                            <td>
                                <a title="危险货物储存作业考核" href="">
                                <img :src="icon1" alt="">
                                <div>危险货物储存<br>作业考核</div>
                                </a>
                            </td>
                            <td>
                                <a title="散装危化品储存作业考核" href="">
                                <img :src="icon2" alt="">
                                <div>散装危化品储存<br>作业考核</div>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a title="散装液体危化品装卸作业考核"  href="">
                                <img :src="icon3" alt="自考成绩">
                                <div>散装液体危化品<br>装卸作业考核</div>
                                </a>
	                            </td>
                            <td>
                                <a title="散装固体危化品装卸作业考核"  href="">
                                    <img :src="icon4" alt="">
                                    <div>散装固体危化品<br>装卸作业考核</div>
                                </a>
                            </td>
                        </tr></table>
                </div>
    </el-col>
    </el-row>

    <footer-com></footer-com>
  </div>
</template>
<script>
import HeaderCom from '@c/HeaderCom'
import FooterCom from '@c/FooterCom'
import TitleCom from '@c/TitleCom'
import { APIS } from '@a/js/config.js'
import myCookie from '@a/js/cookie.js'
export default {
  name: 'Index',
  components:{
    HeaderCom,
    FooterCom,
    TitleCom
  },
  data () {
    return {
      logboxbg: require('@a/images/loginbg.jpg'),
      logbg: require('@a/images/logbg.png'),
      dot: require('@a/images/point.png'),
      icon1: require('@a/images/ckbm.jpg'),
      icon2: require('@a/images/ksap.jpg'),
      icon3: require('@a/images/zkbm.jpg'),
      icon4: require('@a/images/zkcj.jpg'),
      loginForm: {
        userName: '',
        password: '',  
        captcha: ''
      },
      loginRule:{
        userName:[{
            required: true,
            message: '请输入用户名',
            trigger: 'blur' 
        }],
        password:[{
            required: true,
            message: '请输入密码',
            trigger: 'blur' 
        }],
        captcha:[{
            required: true,
            message: '请输入验证码',
            trigger: 'blur' 
        }]
      },
      captcha: APIS.captcha,
      userName: myCookie.get('userName'),
      loginStatus: myCookie.get('ACCESS_TOKEN')
    }
  },
  mounted () {
  },
  methods: {
    onSubmit () {
      this.$refs.loginRef.validate((valid) => {
          if (valid) {
            this.$axios({
                method: 'post',
                url: APIS.login,
                params: this.loginForm
            }).then(res => {
                if(res.data.code == 0){
                   myCookie.set('ACCESS_TOKEN', res.data.ACCESS_TOKEN)
                   myCookie.set('userName', this.loginForm.userName)
                   this.loginStatus = true
                }else{
                    this.$message.error(res.data.msg)
                    this.getCaptcha()
                }
            })
          }
        })
    },
    getCaptcha () {
      this.captcha = APIS.captcha + '?' + new Date().getTime()
    }
  }
}
</script>
<style scoped>
.loginbox{ height:360px; position:relative; background-position:-100px 0;background-repeat:no-repeat;}
.logbox {
    width: 318px;
    height:321px;
    position:absolute;
    right:20px;
    top:18px;
}

.cn-name {
    color: #fff;
    font-size: 28px;
    padding: 100px 0 0 395px;
}
.logtt{
  height:36px;
  padding-top:4px;
  padding-left:20px;
  line-height:30px;
}
.logtt span{
  font-size:14px;
  color:#fff;
  border-bottom:3px #008dff solid;
}

.login-btn {
    width: 84%;
    margin-left:8%;
    margin-top:20px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #006cd4;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}
.noticelist{
  list-type:none;
  padding:10px;
}
.noticelist li{
  line-height: 24px;
  margin-bottom: 5px;
  background-position:0 center;
  padding-left: 10px;
  font-size: 14px;
  background-repeat:no-repeat;
}
.noticelist li a{ float:left; color:#4C4C4C}
.noticelist li a:hover{
  color:rgb(0, 62, 125);
}
.noticelist li span{ float:right;color:#4C4C4C}
.tools{ padding-top:10px;}
.tools table {
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    width: 100%;
}
.tools table tr td {
    width: 50%;
    height: 100px;
    vertical-align: middle;
    text-align: center;
}
.tools table tr td a:hover{
   color:rgb(0, 62, 125);
}
</style>
