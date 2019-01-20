<template>
<div class="com-title clearfix">
    <b :class="color">{{title}}</b><span style="float:right;"><slot name="more"></slot></span>
</div>
</template>

<script>
export default {
  name: 'TitleCom',
  props: {
    title: {
      type: String,
      required: true  
    },
    color:{
      type: String,
      default: 'blue'  
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.com-title{
    border-bottom:1px solid #ccc;
    height:28px;
    padding-bottom:5px;
    font-size:16px;
}
.com-title b{
 float:left;
 padding-left:12px;
}
.blue{
  border-left:4px solid #409EFF;
}
.purple{
  border-left:4px solid #6633cc;  
}
</style>
