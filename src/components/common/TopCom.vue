<template>
<div class="com-top clearfix">
   <span style="float:left; padding-left:15px;">你好，{{userName}},欢迎来到危化品安全知识考核系统</span>
    <a href="" style="float:right; margin:0 20px;">退出</a>
   <div class="top-link"><a href="">学习资源</a><a href="">安全考核</a><a href="">个人信息</a></div>
</div>
</template>
<script>
import cookie from '@a/js/cookie.js'
export default {
  name: 'TopCom',
  data () {
    return {
      userName: cookie.get('userName')
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.com-top{
  height: 33px;
  line-height: 33px;
  background-color: #F7F9FA;
  margin: 0 auto;
  border-bottom: 1px solid #DCDCDC;
}
.top-link{
   float:right; 
   width:300px; 
   text-align:right;
}
.top-link a{
    margin:0 15px;
}
.com-top a:hover{
    color:rgb(0, 62, 125);
}
</style>
