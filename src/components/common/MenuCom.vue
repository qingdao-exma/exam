<template>
 <div class="n_nav xz">
    <dl style="padding-left:0">
        <dd v-for="(item, i) in list" :key="i"><a :href="item.path" target="_blank" :class="{'active':active==i}">{{item.name}}</a></dd>
    </dl>
</div>
</template>

<script>
export default {
  name: 'MenuCom',
  props: {
    list: {
      type: Array,
      required: true  
    },
    active: {
      type: Number
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
.n_nav {
    height: 46px;
    background-color: #E7E8EB;
    border-bottom: solid 3px #003E7D;
    font-weight: bold;
}
.n_nav dl {
    float: left;
    line-height: 46px;
    padding: 0 0 0 20px;
}
.n_nav dl dd {
    float: left;
    padding: 0 0 0 96px;
}
.xz dl dd {
    padding: 0px 0px 0px 70px;
    line-height: 46px;
}
.n_nav dl dd a {
    float: left;
    color: #003e7d;
    font-size:14px;
    letter-spacing: 1px;
}
.n_nav dl dd a.active{
  color: #ff7f00;
}
.n_nav dl dd a:hover {
    color: #ff7f00;
    text-decoration: none
}
</style>
