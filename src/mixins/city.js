const userUrl = CONFIG.userUrl
const addressUrl = userUrl + '/api/areas'
export const city = {
  data () {
    return {
      provinceData:[],//主体省数据
      cityData:[],//市数据
      areaData:[]//区数据
    }
  },
  methods: {
		// 初始化省份
		initProvince () {
			this.$http.get(addressUrl+'?pId=0').then((resp) =>{
				resp = resp.data;
				if(resp.elements){
          this.provinceData = resp.elements;
				}else {
					console.error(resp.msg);
				}
			})
			.catch((error) => {
				console.error(error);
			});
    },
		//更改省
		changeProvince(formName, provinceCode, prevfix){
			this[formName].areaId = '';
			this[formName].cityId = '';
			this._triggerChange(provinceCode,  (prevfix ? prevfix : '') + 'cityData');
    },
		//更改市
		changeCity(formName, cityCode, prevfix){
			this[formName].areaId = '';
			this._triggerChange(cityCode, (prevfix ? prevfix : '') + 'areaData');
    },
		// 省份切换渲染城市 城市切换渲染区
		_triggerChange (code, dataName, callback){
			var self = this;
			self[dataName] = [];
			if(!code){
				return;
			}
			this.$http.get(addressUrl+'?pId='+ code)
			.then(function(resp){
				resp = resp.data;
				if(resp.elements){
					self[dataName] = resp.elements;
					callback && callback();
				}else {
					console.error(resp.msg);
				}
			})
			.catch((error) => {
				console.log(error);
			});
    },
    //获取选中的省市区对应的中文名称
		getSelectName (code, dataName){
			var self = this;
			var data = self[dataName];
			var ret = '';
			data.some((item, i) => {
				if (item.area_id == code) {
					ret = item.name;
					return true;
				}
			});
			return ret;
		},
		//地址拼接area_info
		getAreaInfo(data, prevfix){
			var area_id = data.area_id || data.areaId;
			var province_id = data.province_id || data.provinceId;
			var city_id = data.city_id || data.cityId;
			return [this.getSelectName(province_id, 'provinceData'), this.getSelectName(city_id, (prevfix ? prevfix : '') + 'cityData'), this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData')].join(' ');
		},
  }
}

