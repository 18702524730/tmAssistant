import Vue from 'vue'
const state = {
  blackWhitePicUrl: '', //商标图样
  standby1: '', // 主体文件
  standby2_1: '',
  standby2_2: '',
  standby2_3: '',
  proxyUrl: '', // 委托书
  contractUrl1: '', // 合同书
  contractUrl2: '',
}

const mutations = {
  UPDATEIMGURL: (state, data) => {
    state[data.valueName] = data.url;
  },
}

const actions = {
  updateImgUrl ({commit}, data) {
    commit('UPDATEIMGURL', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
