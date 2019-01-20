<template>
  <div>
  <top-com></top-com>  
  <header-com></header-com>  
  <menu-com :list="menuData" :active="0"></menu-com> 

   <div class="mainbox">
     <div class="place">当前位置：   安全考核  》 考试报名</div>

        <div style="padding-top:30px;" v-show="unlistData.length > 0">
        <title-com title="报名中的考试"></title-com>
        <div class="baoming-box clearfix" v-for="(item, i) in unlistData" :key="i">
            <img :src="bmpic" width="200" height="150" style="float:left;">
            <div class="note">
                <p>{{item.examName}}（期号{{item.examNo}}）</p>
                <p>考试时间：{{ item.eaxmBeginTime }}</p>
                <p>科目：{{ item.courses.map(item=>item.courseName).join(',') }}</p>
                <p>报名时间：{{item.easmApplyTime}} 至 {{item.examEndTime}}</p>
            </div>
            <a class="btn btn-primary" style=" position:absolute; right:20px; bottom:20px;" @click="showBM(item)">报名</a>
        </div>
        </div>

        <div style="padding-top:30px;" v-show="listData.length > 0">
            <title-com title="已报名的考试" color="purple"></title-com>
            <div class="baoming-box clearfix" v-for="(item, i) in listData" :key="i">
                <img :src="bmpic" width="200" height="150" style="float:left;">
                <div class="note">
                    <p>{{item.examName}}（期号{{item.examNo}}）</p>
                    <p>考试时间：{{ item.eaxmBeginTime }}</p>
                    <p>科目：{{ item.courses.map(item=>item.courseName).join(',') }}</p>
                    <p>报名时间：{{item.easmApplyTime}} 至 {{item.examEndTime}}</p>
                </div>
                <a class="btn btn-primary" style=" position:absolute; right:20px; bottom:20px;">模拟测试</a>
                <a class="btn btn-primary" @click="goExam(item)" style=" position:absolute; right:120px; bottom:20px;">考试</a>
            </div>
        </div>


   </div> 
  <footer-com></footer-com>
    <el-dialog title="考试报名" :visible.sync="dialogVisible">
         <el-form :model="secExamRegistration" :rules="rules" ref="ruleForm" label-width="160px">
               <el-row>
            <el-col :span="12">
                 <el-form-item label="考试期号">
                 	<el-input disabled v-model="secExamRegistration.examNo"></el-input>
                 </el-form-item>
            </el-col>
            <el-col :span="12">
                 <el-form-item label="报名科目" prop="courseId">
                  <el-select  v-model="secExamRegistration.courseId">
            				<el-option v-for="(item,i) in secExamRegistration.courses" :label="item.courseName" :key="i" :value="item.id"></el-option>
           			 </el-select>
                 </el-form-item>
            </el-col>  
             <el-col :span="24">
                 <el-form-item label="考试名称">
                  <el-input disabled v-model="secExamRegistration.examName"></el-input>
                 </el-form-item>
            </el-col>  
             </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="姓名" prop="realname">
                <el-input v-model="examUser.realname" disabled class="widthinput" placeholder="姓名" :maxlength="32"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="性别" prop="sex">
                <el-select v-model="examUser.sex" disabled class="widthinput" placeholder="性别">
                    <el-option v-for="(item,i) in sexList" :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="身份证号码" prop="idCard">
                <el-input v-model="examUser.idCard" disabled class="widthinput" placeholder="身份证号码" :maxlength="32"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="examUser.mobile" disabled class="widthinput" placeholder="手机号码" :maxlength="32"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
             <el-form-item label="所在单位" prop="organizationId">
                <el-select v-model="examUser.organizationId" disabled class="widthinput" placeholder="所在单位" :maxlength="32">
                    <el-option v-for="(item,i) in registration_dict" :label="item.enterName" :value="item.id" :key="i"></el-option> 
                </el-select>
            </el-form-item>
            </el-col>
              <el-col :span="12">
            <el-form-item label="现任职务" prop="position">
                <el-input v-model="examUser.position" disabled class="widthinput" placeholder="现任职务" :maxlength="32"></el-input>
            </el-form-item>
        </el-col>
  <el-col :span="12">
            <el-form-item label="备注" prop="remark">
                <el-input v-model="examUser.remark" :rows="3" type="textarea" disabled  class="widthinput" placeholder="备注" :maxlength="250"></el-input>
            </el-form-item>
        </el-col> 				
            </el-row>
             
    </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddData">确 定</el-button>
        </div>
    </el-dialog>

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
  name: 'Baoming',
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
      bmpic:require('@a/images/pic.jpg'),
      dialogVisible:false,
      unlistData:[],
      listData:[],
      secExamRegistration:{
        examNo:'',
        courseId: '',
        courses: [],  
        examName: ''
      },
      rules:{
        courseId:[{
            required: true,
            message: '请选择科目',
            trigger: 'change' 
        }]  
      },
      registration_dict: [],
      sexList: [],
      examUser: {}
    }
  },  
  created () {
    this.getList()
    this.$axios({
        url: APIS.registration_dict,
        method: 'post'
    }).then(res => {
        if (res.data.code === 0) {
            this.registration_dict = res.data.enterList
            this.sexList = res.data.dic_sex_list
            this.examUser = res.data.examUser
        } else {
            this.$message.error(res.data.msg)
        }
    })
  },
  methods: {
      getList () {
          this.$axios({
              url: APIS.list_registration,
              method: 'post'
          }).then(res => {
              if (res.data.code === 0) {
                this.unlistData = res.data.exams.filter(item => item.registrationStatus === 'UNREGISTERED')
                this.listData = res.data.exams.filter(item => item.registrationStatus === 'REGISTERED')
              } else {
                this.$message.error(res.data.msg)
              }
          })
      },
      showBM (item) {
        this.secExamRegistration = Object.assign(this.secExamRegistration, item)
        this.dialogVisible = true
      },
      handleAddData(){
       // this.secExamRegistration.status = this.secExamRegistration.id == null || this.secExamRegistration.id == '' ?'INIT':'SUBMIT'
       this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var obj =  {
                exam:{
                    id: this.secExamRegistration.id
                },
                courseId: this.secExamRegistration.courseId,
                remark: this.secExamRegistration.remark
            }
            this.$axios({
                url: APIS.registration_save,
                method: 'post',
                data: obj
            }).then(res => {
                if (res.data.code === 0) {
                    this.getList()
                    this.dialogVisible = false
                    this.$message.success('报名成功')
                }
            })
          }
        })
      },
      goExam (item) {
        cookie.set('examDetail', JSON.stringify({
            id:item.id,
            examName:item.examName,
            eaxmBeginTime:item.eaxmBeginTime,
            examEndTime:item.examEndTime,
            examDuration:item.examDuration
        }))  
        this.$router.push({
          name:'examlogin'
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
.place{
    font-size:14px;
    text-align:left !important;
}
.baoming-box{
    position:relative;
    border-bottom:1px dashed #4C4C4C; 
    padding:20px 0;
}
.baoming-box .note{
    float:left;
    padding-top:20px;
    padding-left:20px;
    width:800px;
}
</style>
