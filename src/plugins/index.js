import http from '@/plugins/flyio/request'
import utils from '@/utils/utils'
import storage from '@/utils/storage'
import common from '@/utils/common'
import API from '@/api'
import Flyio from '@/plugins/flyio/interceptors'
export default {
  /**
   * 自定义方法
   * 组件内使用： this.$utils.validator
   * 全局使用：Vue.utils.validator
   */
  install (Vue) {
    const ret = {
      ...utils,
    }

    Vue.utils = utils;
    Vue.prototype.$utils = utils;
    Vue.prototype.$message = common.publicMethods.showMessage;  //展示顶部消息提示
    Vue.prototype.tips = (msg) => {
      Vue.prototype.$message({content: msg, type: 'error'});
    }

    Vue.http = http;
    Vue.prototype.$http = Flyio; // 兼容H5页面中 this.$http的写法，没有loading提示，不推荐使用
    Vue.prototype.API = API;

    Vue.prototype.miniAppType = API.interfaces.miniAppType;

    Vue.prototype.$storage = storage;
  }
}
