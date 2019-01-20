<template>
  <div  style="background: #353535; padding:20px 30px;">
        <div class="fcopy">
          <p> 青岛港口危化品安全知识考核系统</p>
          <p>CopyRight@2018 青岛市港航管理局 版权所有</p>
          <p>青岛安捷电子技术支持&nbsp;&nbsp;&nbsp;&nbsp;鲁ICP备05012314号</p>
        </div>			   
        <div class="phonebox" :style="{'backgroundImage':'url('+ phoneIcon +')'}">
        <p>联系电话：400-0126-176</p>
        <p>联系地址：青岛市运输管理局</p>
        </div>
        <div style="clear:both"></div>
  </div>
</template>
<script>
export default {
  name: 'HeaderCom',
  data () {
    return {
      phoneIcon: require('@a/images/u10003.png')
    }
  }
}

</script>
<style scoped>
.foot{}
.fcopy{ padding-left:30px; font-size:16px; width:500px; padding-top:10px; color:#fff; text-align:left; float:left;}
	.fr{ float:right;}
	.phonebox{ background-position:right center;background-repeat:no-repeat; height:90px; padding-top:10px; float:right; color:#fff; font-size:16px; padding-right:120px;}
</style>
