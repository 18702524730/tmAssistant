import http from '@/plugins/flyio/request'
const { cartUrl, indexUrl } = CONFIG;

export default {
  /**
   * 根据推单id查询详情
   */
  async getInfo(id) {
    const url = `${cartUrl}/asistant/asistantList.htm`;
    return await http.get(url, {asistantOrderCustomerId : id});
  },
  /**
   * 首页信息列表-详情
   */
  async contentAttribute(parmas) {
    const url = `${indexUrl}/cms/api/directive/contentAttribute`;
    return await http.get(url, parmas);
  },
  /**
   * 首页-查询轮播资讯信息
   */
  async contentList(parmas) {
    const url = `${indexUrl}/cms/api/directive/contentList`;
    return await http.get(url, parmas, {}, {
      isLoading: false
    });
  }
}
