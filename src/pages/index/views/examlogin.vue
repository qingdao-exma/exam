<template>
  <div>
  <top-com></top-com>  
  <header-com></header-com>  
  <menu-com :list="menuData" :active="0"></menu-com> 

   <div class="mainbox">
        <h6 style="text-align:center; font-size:24px;">{{ examDetail.examName }}</h6>
        <p style="text-align:center; font-size:14px;">考试时间：{{ examDetail.eaxmBeginTime }}   考试时长：{{ examDetail.examDuration }}分钟</p>
       <p style="text-align:center; font-size:20px; color:red;">倒记时：{{ examDetail.examDuration }}</p>
       
       <div class="loginbox">
        <el-row :gutter="24">
        <el-col :span="12">
        <div style="padding:40px 0 0 60px; line-height:1.8;">
        说明：<br>
        1、港口危货经营单位主要安全管理人员考核通过理论知识考核的形式进行，采用闭卷方式。<br>
        2、每套试题分为判断题、单项选择题两种类型，共100题，其中，判断题和单项选择题各50题。试题内容比例为港口危险货物管理相关法律法规知识题占50%、港口危险货物安全管理知识题占50%。<br>
        3、考核时间为90分钟，满分100分，每题1分，70分及以上合格。
        </div>
        </el-col>
        <el-col :span="2">
        <p style="margin:20px 0; border-right:#ddd 1px solid; height:310px;"></p>
        </el-col>
         <el-col :span="10">
            <div style=" margin: 60px auto 0; width:280px;">
                <el-form label-position="right" label-width="80px" :model="loginForm" :rules="loginRule" ref="loginRef">
                    <el-form-item label="身份证号" prop="idCard">
                        <el-input :maxlength="18" v-model="loginForm.idCard"></el-input>
                    </el-form-item>
                    <el-form-item label="考场密码" prop="examPassword">
                        <el-input v-model="loginForm.examPassword" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <div class="login-btn" style="background: #666;" @click="onReset">重&nbsp;&nbsp;置</div>
                <div class="login-btn" @click="onSubmit">登&nbsp;&nbsp;录</div>
            </div>
         </el-col>
        </el-row>
       </div>

   </div> 
  <footer-com></footer-com>
   
  </div>
</template>

<script>
import TopCom from '@c/TopCom'
import HeaderCom from '@c/HeaderCom'
import MenuCom from '@c/MenuCom'
import FooterCom from '@c/FooterCom'
import TitleCom from '@c/TitleCom'
import cookie from '@a/js/cookie.js'
import { APIS } from '@a/js/config.js'
export default {
  name: 'Examlogin',
  components:{
    TopCom,
    HeaderCom,
    MenuCom,
    FooterCom,
    TitleCom
  },
  data () {
    return {
      menuData: [
        {
          name: '考试报名',
          path: '/baoming'
        },
        {
          name: '模拟考试',
          path: '/kaoshi'
        },
        {
          name: '成绩查询',
          path: '/chaxun'
        }
      ],
      examDetail: JSON.parse(cookie.get('examDetail')),
      loginForm: {
        idCard: '',
        examPassword: ''
      },
      loginRule:{
        idCard:[{
            required: true,
            message: '请输入身份证号',
            trigger: 'blur' 
        }],
        examPassword:[{
            required: true,
            message: '请输入密码',
            trigger: 'blur' 
        }]
      }
    }
  },  
  created () {
  },
  methods: {
     onReset () {
         this.loginForm={
            idCard: '',
            examPassword: ''
         }
     },
     onSubmit () {
         this.$refs.loginRef.validate((valid) => {
          if (valid) {
            this.$axios({
                method: 'post',
                url: APIS.validateUser,
                data: this.loginForm
            }).then(res => {
                if(res.data.code == 0){
                }else{
                    this.$message.error(res.data.msg)
                }
            })
          }
        })
     }
  }
}
</script>
<style scoped>
.mainbox{
    margin-top:20px;
    padding-bottom:20px;
}
.loginbox{
    border:1px solid #ddd;
    height:350px;
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
    width: 30%;
    margin-left:40px;
    margin-top:20px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #006cd4;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    display:inline-block;
}
</style>
