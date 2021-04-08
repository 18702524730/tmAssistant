import Vue from 'vue'
const state = {
  options: {
    visible: false,
    content: '',  //内容
    duration: 3,  //显示秒数
    type: 'default', // default || success || warning || error
  }
}

const mutations = {
  SHOW_MESSAGE: (state, options) => {
    console.log(options);
    state.options = options;
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
