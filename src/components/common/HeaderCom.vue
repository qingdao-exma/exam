<template>
<div class="header-top">
  <div class="logodiv">
  <a style="float:left;"><img :src="logo" height="90">
  <b style="font-size:24px; vertical-align:middle; color:#003e7d; padding-left:16px;">青岛港口危化品安全知识考核系统</b></a>
  </div>
  <div class="search" v-show="searchable">
      <form>
          <input type="submit" value="" class="submit" :style="{'backgroundImage':'url('+submitbg+')'}">
          <input type="text" name="q" onblur="if(value=='')value='请输入关键字'" onmouseover="this.focus()" onfocus="if(value=='请输入关键字')value='';this.select();" value="请输入关键字" class="text" style="color:#666">
      </form>
  </div>
  <div style="float:right; padding-top:10px;" v-show="!searchable">
    <ul style="width:400px; ">
    <li style="float:left; text-align:center; margin-right:15px; line-height:1;">
    <a href=""><p style="height:70px"><img :src="icon1"></p>学习资源</a>
    </li>
    <li style="float:left; text-align:center; margin-right:15px; line-height:1;">
    <a href="/#/baoming"><p style="height:70px"><img :src="icon2"></p>安全考核</a>
    </li>
    <li style="float:left; text-align:center; line-height:1;">
    <a href=""><p style="height:70px"><img :src="icon3"></p>个人信息</a>
    </li>
    <li style="clear:both;"></li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'HeaderCom',
  data () {
    return {
      logo: require('@a/images/main_logo.png'),
      submitbg: require('@a/images/submit.jpg'),
      icon1: require('@a/images/u10006.png'),
      icon2: require('@a/images/u10015.png'),
      icon3: require('@a/images/u10013.png')
    }
  },
  props: {
    searchable:{
      type:Boolean,
      default: true
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.header-top {
    height: 120px;
    margin: 0 auto;
    position: relative;
}
.logodiv {
    float: left;
    margin-top: 15px;
}
.search {
    position: absolute;
    right: 0;
    top: 50px
}

.text {
    width: 228px;
    height: 26px;
    line-height: 26px;
    border: 1px solid #999;
    border-bottom-color: #E5E5E5;
    border-right-color: #E5E5E5;
    float: right;
    padding: 0 5px;
    /*background:#F9F9F9;*/
    font-family: "微软雅黑";
}

.submit {
    background-position:left top;
    height: 28px;
    width: 33px;
    cursor: pointer;
    border: none;
    float: right
}
</style>
