<template>
  <div>
  <top-com></top-com>  
  <header-com></header-com>  
  <menu-com :list="menuData" :active="0"></menu-com> 

   <div class="mainbox clearfix">
      <div class="exambox">
   		<h2 class="examtit">{{examInfo.examName}}-{{examInfo.examNo}}</h2>
   		<h5 class="clearfix"><span style="float: left;">课程：  {{course.courseName}}<em>({{examInfo.eaxmBeginTime}}~{{examInfo.examEndTime}})</em></span>  <span style="float: right;">卷面总分：{{paper.totalScore}}&nbsp;&nbsp;&nbsp;&nbsp;考试时长： {{examInfo.examDuration}}分钟</span></h5>
   		<div class="question-area" v-show="showQuestion">
   		<p class="questype">选择题</p>
		<div class="question-list" v-for="(item,index) in questionList">
			<p v-show="index==curIndex" class="questt"><span>{{index+1}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.questionAsk}}</p>
			 <!-- 单选或判断 -->
	   		<el-radio-group  v-show="index==curIndex && item.questionType !=='2'" v-model="curAnswerId">
	   			<ul class="answerlist">
		   		<li v-for="option in item.options"><el-radio :label="option.id">{{option.questionOptions}}.{{option.optionsContent}}</el-radio></li> 
				</ul>
	   		</el-radio-group>
	   		<!-- 多选 -->
	   		<el-checkbox-group  v-show="index==curIndex && item.questionType =='2'" v-model="curAnswerId">
	   			<ul class="answerlist">
		   		<li v-for="option in item.options"><el-checkbox :label="option.id">{{option.questionOptions}}.{{option.optionsContent}}</el-checkbox></li> 
				</ul>
	   		</el-checkbox-group>
		</div>  

   		
   		<div class="btnsbox" v-show="showQuestion">
	   		<el-button type="primary" icon="arrow-left" @click="clickPrev">上一题</el-button>
  			<el-button type="primary"  @click="clickNext">{{clickText}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
   		</div>
   		</div>
		<!-- 考试结果 --> 
		<div class="result-area" v-show="!showQuestion">
			<div>
				考试成绩:{{examScore}}
			</div>
			<div>
				{{examResult}}
			</div>
		</div>
   	</div>
   	<div class="quesbox">
   			<div class="cardstt"><span class="icon-ques" :style="{'background':'url('+iconques+') no-repeat 5px center #389fc3'}">答题卡</span><span class="icon-time" :style="{'background':'url('+icontime+')  no-repeat 5px center #f3f3f3'}">{{countdownStr}}</span></div>
   			<div class="cardsbox">
   			<div class="cards-typett">单选题<span>(共{{questionNum}}题)</span></div>
   			<ul class="clearfix cards-quesitem">
   				<li v-for="i in questionNum" :class="{active:i==curIndex+1,allready:i<=anwserIds.length}" @click="clickQuestion(i)">{{i}}</li>
   			</ul>
   			</div>
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
      iconques: require('@a/images/icon_ques.png'),
      icontime: require('@a/images/icon_time.png'),
      showQuestion:true,
       answer:'',
        //考题
        questionList:[],
        //考试id
        examId:'',
        //当前题目序号
        curIndex:0,
        //当前答案
        curAnswerId:[],
        //所选答案集合
        anwserIds:[],
        showQuestion:true,
        examScore:'',
        examResult:'',
        questionNum:1,
        examEndTime:'',
        //倒计时
        countdownStr:'',
        dialogVisible:false,
        examInfo:{
            examName:'按时打算',
            examNo:'1513513',  
            eaxmBeginTime:'2018-02-20',
            examEndTime:'2018-02-20',
            examDuration:'120'
        },
        course:{
            courseName:'按时打算',  
        },
        paper:{
            totalScore:'100'  
        }
    }
  },
  computed:{
    curQuestionId:function() {
        return this.questionList[this.curIndex].id
    },
    curQuestionType:function() {
        console.log(this.questionList);
        return this.questionList[this.curIndex].questionType
    },
    clickText:function() {
        return this.curIndex==this.questionList.length-1?'提交':'下一题';
    }
  },
  created () {
  },
  methods: {
    clickPrev () {},
    clickQuestion () {},
    onSubmit () {
         
    }
  }
}
</script>
<style scoped>
.mainbox{
    margin-top:20px;
    padding-bottom:20px;
}
.exambox{float:left;border:1px solid #e4e4e4; padding: 0 20px; width:900px; }
.exambox h3{ font-size: 20px; padding: 20px 0;}
.exambox h5{ font-size: 18px;}
.exambox h5 em{ color: #999; font-size: 14px;}
.quesbox{ width:274px; float:right; border:1px solid #e4e4e4; height:500px; }
.examtit{ font-size:24px; text-align:center; padding:30px 0;}

.cardstt{  height:45px; line-height:45px; font-size:16px;}
.cardstt .icon-ques{ float:left;width:136px;height:45px;color:#fff; padding-left:30px;}
.cardstt .icon-time{ float:left;width:136px;height:45px; color:#ff004e;padding-left:30px;}
.answerbox{ padding:10px;}
label{ font-weight:normal;} 
.answerlist{ font-size: 14px; padding-left: 25px; display:block;}
.answerlist li{ margin-top: 3px; height:32px; line-height:32px; padding-left:5px;}
.answerlist li:hover{ background:#e4e4e4;}
    
.questype{font-size: 16px; height: 40px; line-height: 40px; padding-left: 15px; border-bottom: 3px #efefef solid; background: #f7f7f7; margin: 20px 0;}
.questt{font-size: 16px; position:relative; margin-bottom: 10px; border-bottom:1px solid #e4e4e4;padding-bottom:10px;}
.questt span{width: 25px;height: 25px;line-height: 25px; text-align: center; display: block; background: #5d9cec; border-radius: 50%; color: #fff; position: absolute; top: 0; left:0px;}
.el-radio-group,.el-radio{ display: block;}

.btnsbox{ padding:30px 0; text-align:center;}
.btnsbox button{margin:0 20px;}
.cardsbox{ padding:0 14px 20px;}
.cards-typett{ border-bottom:1px solid #e4e4e4; height:40px; line-height:40px; font-size: 14px; padding-left:10px; }
.cards-typett span{ color: #999; font-size: 12px; padding-left:6px;}
.cards-quesitem li{ float:left; display: block; width: 30px; height: 30px; line-height: 30px; text-align: center;cursor: pointer; border: #e4e4e4 1px solid; margin-right: 4px; margin-top: 4px;}
.cards-quesitem li.active {
    background:#eb4747 !important;
    color:#fff;
}
.cards-quesitem li.allready {
    background:#20a0ff;
    color:#fff;
}
.result-area {
    min-height:200px;
    padding-top:100px;
    text-align:center;
}
.result-area div {
    font-size:20px;
    margin:10px 0;
}
</style>
