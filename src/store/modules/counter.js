import Vue from 'vue'
const state = {
  count: 0,
  options: {
    visible: false,
    content: '',  //内容
    duration: 3,  //显示秒数
    type: 'default', // default || success || warning || error
  }
}

const mutations = {
  INCREMENT: (state) => {
    const obj = state
    obj.count += 1;
  },
  DECREMENT: (state) => {
    const obj = state
    obj.count -= 1
  },
  showMessage: (state, options) => {
    state.options = options;
  }
}

const actions = {
  increment ({commit}) {
    commit('INCREMENT')
  },
  decrement ({commit}) {
    commit('DECREMENT')
  },
  getProvince ({commit}, params = {}) {
    return Vue.iBox.http('globalUrl.getProvince', params)({method: 'get'})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
