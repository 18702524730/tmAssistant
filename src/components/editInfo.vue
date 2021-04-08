<template>
<div class="cardWarp">
  <div class="editCard">
    <div class="inputItem">
      <input type="text" :maxlength="length" v-model="des" >
      <div class="textLen">{{des.length}}/{{length}}</div>
    </div>
   <p>温馨提示：{{tips}}</p>
 </div>
 <button type="primary" :disabled="btnState" :class="{'disabled': btnState}" @click="handleSave">保存</button>
</div>

</template>

<script>
export default {
  data() {
    return {
      tips: '',
      length: 10,
      des: '',
      btnState: false
    }
  },
  components: {},
  onLoad () {
    console.log(333)
    wx.setNavigationBarTitle({
      title: this.$route.query.title || '修改信息'
    })
    this.tips = `${this.$route.query.title}最多${this.$route.query.length}字`
    this.length = this.$route.query.length;
    this.des = this.$route.query.des;
    this.type = this.$route.query.type || '';
  },
  mounted () {
    console.log(this.$route.query)
  },
  methods: {
    handleClearInput () {
      this.des = ''
    },
    handleSave () {
      let msg = true
      if (type == 'phone') {
        if (!/^1[3-9][0-9]{9}$/.test(this.des)) {
          console.log('手机号格式不正确')
        }
      }
      console.log(233)
    }
  },
  watch: {
    des (val) {
      val ? this.btnState = false : this.btnState = true
    }
  }
}
</script>

<style lang="scss">
page{background: #f8f8f8;}
.cardWarp{margin: 20px 0 0;
  button{
    position: fixed;
    padding: 0;
    bottom: 0;
    width: 750px;
    border-radius: 0;
    display:block;
    font-size: 32px;
    background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    line-height: 98px;
  }
  .disabled {color: #f10;}
}
.editCard{margin-bottom: 40px;border-radius: 10px;
  .inputItem{display: flex;background: #fff;padding: 0 20px;margin-bottom: 20px;
    input{height: 90px;line-height: 90px;flex-grow: 1;font-size: 30px;}
    .clearIcon{padding: 24px 0 0 20px}
    .textLen{line-height: 90px;color: #bbb;font-size: 28px;}
  }
  
  
  p{height: 37px;line-height: 37px;color: #999;font-size: 26px;padding-left: 20px;}
}
</style>
