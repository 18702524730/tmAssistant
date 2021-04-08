//大陆个体
const sujectRules = {
  //任意字段不为空
  checkEmpty(value, msg) {
    if (!value) {
      this.tips(msg);
      return false;
    }
    return true;
  },
  //中文姓名验证
  checkName(value, prev) {
    let reg = /^[\u4e00-\u9fa5]{2,20}$/;
    if (!value) {
      this.tips(`请填写${prev ? prev : '申请人'}姓名`);
      return false;
    }
    if (!reg.test(value)) {
      this.tips(`${prev ? prev : '申请人'}姓名为2-20个汉字`);
      return false;
    }
    return true;
  },
	//大陆个体身份证验证
	checkIdCard(value) {
		let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (!value) {
      this.tips('请填写身份证号码');
      return false;
		}
    if (!reg.test(value)) {
      this.tips('身份证格式错误');
      return false;
    }
    return true;
	},
	//大陆个体手机号码\固定电话验证
	checkPhone(value, prev) {
		let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
    if (!value) {
      this.tips(`请填写${prev ? prev : '申请人'}联系电话`);
      return false;
    }
		if (!reg.test(value)) {
			this.tips('请填写正确的手机号码，固话前请加区号和-');
      return false;
		}
    return true;
	},
	//大陆个体邮箱验证
	checkEmail(value) {
		let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!value) {
			this.tips('申请人邮箱不能为空');
      return false;
		}
		if (value.length > 30) {
			this.tips('邮箱不能超过30个字符');
      return false;
		}
		if (!emailReg.test(value)) {
			this.tips('邮箱格式错误');
      return false;
		}
    return true;
	},

	//统一邮编验证
	checkZipCode(value) {
		let zipCodeReg = /^\d{6}$/;
		if (!value) {
			this.tips('请填写邮政编码');
      return false;
		}
		if (!zipCodeReg.test(value)) {
			this.tips('邮政编码仅限6位数字');
      return false;
		}
    return true;
	},
	//大陆企业营业执照
  checkCompanyNumber(value) {
    let reg = /(^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$)|([0-9A-Za-z]{15})/;
    if (!value) {
      this.tips('请填写统一社会信用代码');
      return false;
    }
    if (!reg.test(value)) {
      this.tips('统一社会信用代码为数字或大小写英文');
      return false;
    }
    return true;
  },
  //国外手机号码\固定电话验证
	checkForeignPhone(value) {
		let reg = /^[0-9]*[\+\-]?[0-9]+$/;
		if (!value) {
      this.tips('请填写联系电话');
      return false;
		}
		if (!reg.test(value)) {
      this.tips('请填写正确的联系电话，固话前请加区号和');
      return false;
		}
    return true;
	},
}

export default sujectRules
