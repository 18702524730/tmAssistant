// 验证规则策略对象
const strategys = {
  // 为空
  isNotEmpty: function (value, errorMsg) {
    if (value === '' || value === undefined) {
      return errorMsg;
    }
  },
  // 最小长度
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  // 手机号验证
  mobileFormat: function (value, errorMsg) {
    let reg = /^1[3-9]\d{9}$/;
    if (!reg.test(value)) {
      return errorMsg;
    }
  },
  // 身份证 
  idCardFormat: function (value, errorMsg) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(value)) {
      return errorMsg;
    }
  },
  // 统一信用代码 
  companyCodeFormat: function (value, errorMsg) {
    let reg = /(^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$)|([0-9A-Za-z]{15})/;
    if (!reg.test(value)) {
      return errorMsg;
    }
  },
  // 商标注册号验证
  trademarkFormat: function (value, errorMsg) {
    let reg = /^[a-zA-Z0-9]{4,12}$/;
    if (!reg.test(value)) {
      return errorMsg;
    }
  }
}

// 环境类
class Validator {
  constructor () {
    this.cache = [] // 保存校验规则
  }
  addArr (value, rules) {
    var self = this;
    for (let i = 0, rule; rule = rules[i++];) {
      (function(rule){
        let { errorMsg, strategy: r } = rule;
        let str = r.split(':');
        self.cache.push(() => {
          let strate = str.shift();
          str.unshift(value);
          str.push(errorMsg);
          return strategys[strate].apply(value, str);
        })
      })(rule)
    }
  }
  add (value, rule, errorMsg) {
    var str = rule.split(':');
    this.cache.push(() => {
      let strategy = str.shift();
      str.unshift(value);
      str.push(errorMsg);
      return strategys[strategy].apply(value, str)
    })
  }
  start () {
    for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      var msg = validatorFunc();
      if (msg) {
        return msg;
      }
    }
  }
}

export { Validator, strategys }
