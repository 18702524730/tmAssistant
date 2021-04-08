<template>
 <div class="infoItem">
   <div class="itemName">{{name}}</div>
   <div class="itemDes" @click="toEdit">{{ des||des==null ? des : '未设置' }} </div>
   <i class="icon iconfont icon-jiantou"  @click="toEdit"></i>
   
 </div>
</template>

<script>
export default {
  props: {
    name: String,
    des: String,
    to: String,
    showTips: Boolean
  },
  data() {
    return {}
  },
  components: {},
  methods: {
    toEdit () {
      this.$router.push(this.to + '?title=' + this.name + '&des=' + this.des + '&showTips=' + this.showTips)
    }
  }
}
</script>

<style lang="scss">
.infoItem{display: flex;border-bottom:1px solid #eee;line-height: 88px;margin: 0 20px;
  .itemName{flex-basis: 200px;color: #333;font-size: 30px;}
  .itemDes{flex-grow: 1;text-align: right;color: #999; font-size: 30px;
    
  }
  .icon{font-size: 20px;color: #ddd;height: 88px;width: 28px;text-align: right;}
  .i-icon{transform: translateY(-3px);}
}
</style>
