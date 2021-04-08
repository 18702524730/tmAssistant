import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
   /**
   * 模糊搜索企业列表
   */
  async companyFilter (parmas) {
    const url = `${rootUrl}/zcc/companyFilter`;
    return await http.get(url, parmas);
  },
  /**
   * 查询企业列表
   */
  async queryCompanyList (parmas) {
    const url = `${rootUrl}/zcc/queryCompanyList`;
    return await http.get(url, parmas);
  },
  /**
   * 查询企业详情
   */
  async companyDetail (parmas) {
    const url = `${rootUrl}/zcc/companyDetail`;
    return await http.get(url, parmas);
  },
  /**
   * 查询专利列表
   */
  async patentList (parmas) {
    const url = `${rootUrl}/zcc/patentList`;
    return await http.get(url, parmas);
  },
  /**
   * 查询专利详情
   */
  async patentDetail (parmas) {
    const url = `${rootUrl}/zcc/patentDetail`;
    return await http.post(url, parmas);
  },
  /**
   * 查询商标列表
   */
  async tmList (parmas) {
    const url = `${rootUrl}/zcc/tmList`;
    return await http.get(url, parmas);
  },
  /**
   * 查询商标详情
   */
  async tmDetail (parmas) {
    const url = `${rootUrl}/zcc/tmDetail`;
    return await http.get(url, parmas);
  },
  /**
   * 查询作品著作权列表
   */
  async copyrightList (parmas) {
    const url = `${rootUrl}/zcc/copyrightList`;
    return await http.get(url, parmas);
  },
  /**
   * 查询软件著作权列表
   */
  async softwareList (parmas) {
    const url = `${rootUrl}/zcc/softwareList`;
    return await http.get(url, parmas);
  },
  /**
   * 查询论文列表
   */
  async paperList (parmas) {
    const url = `${rootUrl}/zcc/paperList`;
    return await http.get(url, parmas);
  },
  /**
   * 查询项目列表
   */
  async projectList (parmas) {
    const url = `${rootUrl}/zcc/projectList`;
    return await http.get(url, parmas);
  },
  /**
   * 搜索历史
   */
  async searchHistory (parmas) {
    const url = `${rootUrl}/zcc/searchHistory`;
    return await http.get(url, parmas);
  },
  /**
   * 清空搜索历史
   */
  async removeHistory (parmas) {
    const url = `${rootUrl}/zcc/removeHistory`;
    return await http.post(url, parmas);
  },
  /**
   * 查询官文
   */
  async findNoticeByRegno (parmas) {
    const url = `${rootUrl}/zcc/findNoticeByRegno`;
    return await http.get(url, parmas);
  },
   // 商标局01
  async InfoidBycodeOne (info) {
    const url = `${rootUrl}/zcc/sbgg/tmann/annInfoView/selectInfoidBycode.html`;
    const data = await http.get(url,info);
    return data;
  },
  // 商标局图片同步
  async InfoidBycodeImage (info) {
    const url = `${rootUrl}/zcc/noticeListController/addNoticeImage`;
    const data = await http.post(url,info);
    return data;
  },
  // 预览
  async imageView (info) {
    const url = `${rootUrl}/zcc/sbgg/tmann/annInfoView/imageView.html`;
    const data = await http.get(url,info);
    return data;
  }

}
