import Flyio from './interceptors'
import API from '@/api'
import Config from './config'
// 异常情况的错误处理
const errorFunction = (reqConfig, err) => {
  // 如果有异常需要提示
  if (!reqConfig.errorAction && reqConfig.isErrorDefaultTip) {
    setTimeout(() => {
      Config.resError.tipShow(err)
    }, 0)
  }
  throw (err)
}

let promises = [] // 接收接口请求的promise数组
let loadingTimer = [] // loading的定时器

const goLogin = async (requestUrl) => {
  let url = '/pages/login/login';
  let isLogin = (await API.interfaces.reLogin()).isLogin
  console.log('isLogin', isLogin, this)
  /*if (!isLogin) {
    if (requestUrl.indexOf('subject/subjectList') != -1) {
      return;
    }
    wx.redirectTo({
      url: url
    })
  }*/
  return new Promise(function(resolve, reject){
    if (isLogin) {
      resolve({isLogin})
    } else {
      reject({isLogin})
    }
  })
}

// 接口请求封装函数
const rMethod = (url = '', data = {}, flyConfig = {}, defaultTipConfig = {}) => {
  let flyio = Flyio.request(url, data, {
    ...Config.flyConfig,
    ...flyConfig
  })
  let tipConfig = {
    ...Config.reqConfig,
    ...defaultTipConfig
  }

  // 开启loading
  clearTimeout(loadingTimer) // 多个接口时需要清除上一个loading
  loadingTimer = setTimeout(() => {
    tipConfig.isLoading && Config.loading.loadingShow()
  }, Config.loading.limitTime)

  // loading关闭时，默认直接打开状态栏loading
  !tipConfig.isLoading && wx.showNavigationBarLoading()

  // 计算当前的promise是否全部加载完成
  promises.push(flyio.catch(e => {}))
  Promise.all(promises).then(data => {
    if (data.length !== promises.length) return
    promises = [] // 所有请求完后清除promise数组
    clearTimeout(loadingTimer) // 当请求在xxxms内完成则直接清除loading计时器
  }).catch(() => {
    promises = [] // 请求异常完后清除promise数组
    clearTimeout(loadingTimer) // 请求异常则直接清除loading计时器
  })

  return flyio.then(res => {
    console.log('flyio_res:', res)
    tipConfig.isLoading && Config.loading.loadingHide() // 当promise全部加载完成则隐藏loading
    !tipConfig.isLoading && wx.hideNavigationBarLoading()
    if (res.code && res.code == '0800001') {
      goLogin();
    }
    return res
    // 成功返回
    /*if (res[Config.resSuccess.key] === Config.resSuccess.value) {
      tipConfig.isLoading && Config.loading.loadingHide() // 当promise全部加载完成则隐藏loading
      return res
    } else {
      errorFunction(tipConfig, res)
    }*/
  }).catch(err => {
    tipConfig.isLoading && Config.loading.loadingHide()
    !tipConfig.isLoading && wx.hideNavigationBarLoading()
    if (err && err.response.data.status === 401) {
      console.log('tipConfig', err.request.url)
      throw goLogin(err.request.url);
      // return throw err;
    }
    errorFunction(tipConfig, err)
  })
}

export default {
  //通用自定义
  request: rMethod,

  get(url, data, flyConfig = {}, tipConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'get'
    }, tipConfig);
  },

  // flyConfig中method默认为post
  post: rMethod,

  put(url, data, flyConfig = {}, tipConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'put'
    }, tipConfig);
  },

  delete(url, data, flyConfig = {}, tipConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'delete'
    }, tipConfig);
  },
}
