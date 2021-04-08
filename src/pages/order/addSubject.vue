<template>
  <div class="subjectForm">
    <div class="personalWrap" v-if="form.type === 1">
      <div class="inputItem">
        <div class="des"><span>*</span>姓名</div>
        <input type="text" v-model="form.name" :maxlength="20" placeholder-class="placeholder" placeholder="请输入真实姓名" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>身份证号</div>
        <input type="text" v-model="form.idNo" :maxlength="18" placeholder-class="placeholder" placeholder="请输入真实身份证号" />
      </div>
      <button type="button" @click="saveForm" :class="['submitBtn', !form.name.length||!form.idNo.length ? 'btnDisabled' : '']">保存主体信息</button>
    </div>
    <div class="companyWrap" v-if="form.type === 2">
      <div class="inputItem" style="position: relative;">
        <div class="des"><span>*</span>公司名称</div>
        <input type="text"
        v-model="form.name"
        :maxlength="60"
        @blur="searchCompany"
        @click="handleChangeCompany"
        @input="handleChangeCompany"
        placeholder-class="placeholder"
        placeholder="请输入精确公司名称" />
        <div class="bankWrap" v-if="companyListStatus && companyList.length">
          <div class="bankItem" v-for="(item, index) in companyList" :key="index" @click="selectCompany(item)">
            {{item}}
          </div>
        </div>
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>统一社会信用代码</div>
        <input type="text" v-model="form.idNo" :maxlength="18" placeholder-class="placeholder" placeholder="请输入公司统一社会信用代码" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>法人姓名</div>
        <input type="text" v-model="form.faren" :maxlength="20" placeholder-class="placeholder" placeholder="请输入真实法人姓名" />
      </div>
      <div class="inputItem">
        <div class="des"><span>*</span>法人身份证号</div>
        <input type="text" v-model="form.farenIdNo" :maxlength="18" placeholder-class="placeholder" placeholder="请输入真实法人身份证号" />
      </div>
      <button type="button" @click="saveForm" :class="['submitBtn', !form.name.length||!form.idNo.length||!form.faren.length||!form.farenIdNo ? 'btnDisabled' : '']">保存主体信息</button>
    </div>
    <real-dia :showState="realNameDiaState" @close="realNameDiaState = false" >
      <div class="dia">
        <img src="../../assets/img/order/dia.png" />
        <h2>根据公证处要求，在完成转让公证前，须先<i>实名认证</i></h2>
        <div class="realNameBtn" @click="goRealName">立即认证</div>
      </div>
    </real-dia>
    <u-message/>
  </div>
</template>

<script>
import RealDia from 'components/realnameDialog';
const form = { type: 1, name: '', idNo: '', faren: '', farenIdNo: '' };
import { Validator, strategys } from 'utils/valid';
import { _debounce } from 'utils/public';
export default {
  data () {
    return {
      form: Object.assign({}, form),
      realNameDiaState: false,
      companyListStatus: false,
      companyList: []
    }
  },
  components: {
    RealDia
  },
  onLoad () {
    this.form = Object.assign({}, form);
    this.realNameDiaState = false;
    this.init()
  },
  onUnload () {
    this.form = Object.assign({}, form);
    this.realNameDiaState = false;
    Object.assign(this, this.$options.data());
    console.log(form)
  },
  methods: {
    selectCompany (item) {
      this.form.name = item;
      this.searchCompany();
      this.companyListStatus = false;
    },
    handleChangeCompany: _debounce(async function () {
      console.log('searchCompany', this.form.name)
      if (!this.form.name) {
        this.companyList = [];
      }
      if (this.form.name.length < 4) {
        return;
      }
      this.companyList = [];
      this.companyListStatus = true;
      let data = await this.API.subject.companyFilter({keyword: this.form.name});
      this.companyList = data;
    }, 500, false),
    async searchCompany () {
      console.log('this.form', this.form)
      setTimeout(() => {
        this.companyListStatus = false;
      }, 800)
      if (this.form.name.length > 2 && this.form.type === 2) {
        let data = await this.API.subject.companyDetail({content: this.form.name});
        this.form.idNo = data.creditcode ? data.creditcode : '';
        this.form.faren = data.frname ? data.frname : '';
        this.form.farenIdNo = data.farenIdNo ? data.farenIdNo : '';
      }
    },
    validaFunc () {
      var validator = new Validator();
      // 添加验证规则
      if (this.form.type === 1) {
        validator.addArr(this.form.name, [
          { strategy: 'isNotEmpty', errorMsg: '请输入您的真实姓名' },
          { strategy: 'minLength:2', errorMsg: '姓名最少两位' }
        ]);
        validator.addArr(this.form.idNo, [
          { strategy: 'isNotEmpty', errorMsg: '请输入您的真实身份证号' },
          { strategy: 'idCardFormat', errorMsg: '身份证格式不正确' }
        ]);
      } else {
        validator.addArr(this.form.name, [
          { strategy: 'isNotEmpty', errorMsg: '请输入企业名称' },
          { strategy: 'minLength:2', errorMsg: '您输入的企业名称格式不正确' }
        ]);
        validator.addArr(this.form.idNo, [
          { strategy: 'isNotEmpty', errorMsg: '请输入公司统一社会信用代码' },
          { strategy: 'companyCodeFormat', errorMsg: '统一社会信用代码格式不正确' }
        ]);
        validator.addArr(this.form.faren, [
          { strategy: 'isNotEmpty', errorMsg: '请输入法人姓名' },
          { strategy: 'minLength:2', errorMsg: '法人姓名最少两位' }
        ]);
        validator.addArr(this.form.farenIdNo, [
          { strategy: 'isNotEmpty', errorMsg: '请输入真实法人身份证号' },
          { strategy: 'idCardFormat', errorMsg: '身份证格式不正确' }
        ]);
      }
      var errorMsg = validator.start();
      return errorMsg;
    },
    saveForm:_debounce(async function(){
      // 规则验证
      var errorMsg = this.validaFunc();
      if(errorMsg){
          this.tips(errorMsg);
          return false;
      }
      let data = await this.API.subject.createSubject(this.form);
      let price = this.$route.query.price ? this.$route.query.price : '360.00';
      if (this.form.type == 2) {
        this.$storage.set('subjectObj', { type: this.form.type, id: data.id })
        // this.$router.push({path: `/pages/order/submitOrder`, query: {type: this.form.type, id: data.id, price}})
      } else {
        // this.$router.push({path: '/pages/order/submitOrder', query: {price}})
      }
      this.$router.go(-1);
    }, 2000, true),
    init () {
      if(this.$route.query.type){
        this.form.type = Number(this.$route.query.type);
      }
      console.log(this.form.type)
    }
  }
}
</script>

<style lang="scss">
.subjectForm{background: #fff;padding: 40px 60px 21px;height: 100%;
  .inputItem{border-bottom: 1px solid #eee;margin-bottom: 39px;
    .des{font-size: 30px;line-height: 42px;
      span{color: #F64744;line-height: 42px;}
    }
    input{margin: 20px 0;line-height: 42px;height: 42px;min-height: 42px;font-size: 30px;}
    .placeholder{color: #999;}    
    .trademarkType{margin-top: 30px;text-align: center;
      .trademarkItem{display: inline-block;width: 54px;height: 80px;margin: 0 18px 20px 0;border: 1px solid #ddd;line-height: 78px;
        color: #666;font-size: 30px;
        &:nth-child(9n+9){margin-right: 0;}
      }
      .checkedTrademark{border-color: #F64744; color: #F64744;}
      >p{font-size: 24px;color: #999;text-align: left;line-height: 33px;}
    }    
  }
  .bankWrap{position: absolute;top: 114px;left: 0;z-index: 100;background: #fff;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);width: 100%;
  padding: 10px 30px;height: 340px;overflow-y: auto;border-radius: 4px;transition: all .2s;
    .bankItem{line-height: 70px;color: #909090;font-size: 26px;}
  }
  .submitBtn{width: 630px;margin: 0 auto;height: 90px;line-height: 90px;background:linear-gradient(90deg,rgba(246,71,68,1) 0%,rgba(246,111,68,1) 100%);border-radius:50px;text-align: center;color: #fff;font-size: 30px;margin-top: 21px;padding: 0;border: none;}
  .btnDisabled{opacity: 0.5;}
}
</style>
