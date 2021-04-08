<template>
  <div class="addressForm">
    <div class="addressWrap">
      <div class="inputItem" style="position: relative;">
        <div class="des"><span>*</span>姓名</div>
        <input type="text" v-model="form.addresseeName" :maxlength="20" placeholder-class="placeholder" placeholder="请输入收件人姓名" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>手机号</div>
        <input type="text" v-model="form.addresseePhone" :maxlength="11" placeholder-class="placeholder" placeholder="请输入收件人手机号" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>区域</div>
        <picker
          mode="region"
          @change="areaChange"
          :value="region">
          <div class="row-between picker_in" v-if="areaText=='请选择省/市/区'">
            <label>请选择省/市/区</label>
            <i class="icon iconfont icon-jiantou"></i>
          </div>
          <div class="row-between picker_in" v-if="areaText!='请选择省/市/区'">
            <label class="area">{{areaText}}</label>
            <i class="icon iconfont icon-jiantou"></i>
          </div>
        </picker>
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>详细地址</div>
        <input type="text" v-model="form.addresseeAdd" :maxlength="60" placeholder-class="placeholder" placeholder="请输入收件人详细地址" />
      </div>
      <button type="button" @click="saveForm" :class="['submitBtn', !form.addresseeName.length||!form.addresseePhone||areaText==='请选择省/市/区'||!form.addresseeAdd ? 'btnDisabled' : '']">保存地址</button>
      <div v-if="form.id" class="del" @click="del">删除该地址</div>
    </div>
    <u-message/>
  </div>
</template>

<script>
  const form = { id: 0, addresseeName: '', addresseePhone: '', addresseeCity: '', addresseeAdd: '' };
  import { Validator, strategys } from 'utils/valid';
  import { _debounce } from 'utils/public';
  const areaText = '请选择省/市/区';
  export default {
    data () {
      return {
        form: Object.assign({}, form),
        addressListStatus: false,
        addressList: [],
        areaText: areaText, // 省市区选中文字
        region: ['', '', ''], // 省市区选中数据
      }
    },
    onLoad () {
      this.init()
    },
    onUnload () {
      console.log(form)
      this.form = Object.assign({}, form);
      this.areaText = areaText;
    },
    methods: {
      // 省市区切换
      areaChange(e) {
        this.region = e.mp.detail.value;
        this.areaText = this.region.join('');
        this.form.addresseeCity = this.region.join(' ');
      },
      validaFunc () {
        var validator = new Validator();
        // 添加验证规则
        validator.addArr(this.form.addresseeName, [
          { strategy: 'isNotEmpty', errorMsg: '请输入收件人姓名' },
          { strategy: 'minLength:2', errorMsg: '收件人姓名最少两位' }
        ]);
        validator.addArr(this.form.addresseePhone, [
          { strategy: 'isNotEmpty', errorMsg: '请输入收件人手机号' },
          { strategy: 'mobileFormat', errorMsg: '您输入的手机号格式不正确' }
        ]);
        validator.addArr(this.form.addresseeCity, [
          { strategy: 'isNotEmpty', errorMsg: '请选择省/市/区' },
        ]);
        validator.addArr(this.form.addresseeAdd, [
          { strategy: 'isNotEmpty', errorMsg: '请输入收件人详细地址' },
        ]);
        var errorMsg = validator.start();
        return errorMsg;
      },
      del:_debounce(async function(){
        await this.API.my.deleteAddress(this.form.id);
        this.$router.go(-1);
      }, 800, true),
      saveForm:_debounce(async function(){
        // 规则验证
        var errorMsg = this.validaFunc();
        if(errorMsg){
          this.tips(errorMsg);
          return false;
        }
        await this.API.my.createAddress(this.form);
        this.$router.go(-1);
      }, 800, true),
      init () {
        let query = this.$route.query
        let id = Number(query.id);
        this.form.id = id
        let title = id && id !== 0 ? '修改地址' : '新增地址'
        wx.setNavigationBarTitle({
          title
        })
        if (id) {
          this.region = query.addresseeCity.split(' ');
          this.areaText = this.region.join('');
          this.form.addresseeName = query.addresseeName;
          this.form.addresseePhone = query.addresseePhone;
          this.form.addresseeCity = query.addresseeCity;
          this.form.addresseeAdd = query.addresseeAdd;
        }
        console.log(query)
      }
    }
  }
</script>

<style lang="scss">
.addressForm{
  background: #fff;padding: 40px 60px 21px;height: 100%;
  .inputItem{border-bottom: 1px solid #eee;margin-bottom: 39px;
    .des{font-size: 30px;line-height: 42px;
      span{color: #F64744;line-height: 42px;}
    }
    input{padding: 20px 0;line-height: 42px;height: 82px;min-height: 42px;font-size: 30px;}
    .placeholder{color: #999;}    

    .picker_in{
      padding-top: 20px;padding-bottom: 20px;
      label{height:42px;line-height: 42px;font-size:30px;color: #999;}
      .area{color: #333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
      i{color: #ddd;font-size: 22px;height:42px;line-height: 42px;}
    }
  }
  .submitBtn{width: 630px;margin: 0 auto;height: 90px;line-height: 90px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);border-radius:50px;text-align: center;color: #fff;font-size: 30px;margin-top: 21px;padding: 0;border: none;}
  .btnDisabled{opacity: 0.5;}
  .del{height:42px;line-height: 42px;font-size:30px;margin-top: 30px;color: #999;text-align: center;}
}
</style>
