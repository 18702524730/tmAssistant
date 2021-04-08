import http from '@/plugins/flyio/request'
const { itechUrl } = CONFIG;

export default {
  /**
   * 登录
   */
  async login (parmas) {
    const url = `${itechUrl}/api/h5/suggestField`;
    return await http.post(url, parmas);
  },

}
