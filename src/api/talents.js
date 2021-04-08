import http from '@/plugins/flyio/request'
const { itechUrl } = CONFIG;

export default {
  /**
   * 模糊搜索领域
   */
  async suggestField (keyword) {
    const url = `${itechUrl}/api/h5/suggestField`;
    return await http.get(url, {keyword: keyword}, {}, {
      isLoading: false
    });
  },
  /**
   * 模糊搜索姓名
   */
  async suggestExpertName (keyword) {
    const url = `${itechUrl}/api/h5/suggestExpertName`;
    return await http.get(url, {keyword: keyword}, {}, {
      isLoading: false
    });
  },
  /**
   * 模糊搜索单位
   */
  async suggestUnit (keyword) {
    const url = `${itechUrl}/api/h5/suggestUnit`;
    return await http.get(url, {keyword: keyword}, {}, {
      isLoading: false
    });
  },
  /**
   * 领域找人
   */
  async searchByField (parmas) {
    const url = `${itechUrl}/api/h5/searchByField`;
    return await http.post(url, parmas, {}, {
      isLoading: false
    });
  },
  /**
   * 姓名找人
   */
  async searchExpertByName (parmas) {
    const url = `${itechUrl}/api/h5/searchExpertByName`;
    return await http.post(url, parmas, {}, {
      isLoading: false
    });
  },
  /**
   * 单位找人
   */
  async searchUnit (parmas) {
    const url = `${itechUrl}/api/h5/searchUnit`;
    return await http.post(url, parmas, {}, {
      isLoading: false
    });
  },
  /**
   * 查询单位详情
   */
  async searchByUnit (parmas) {
    const url = `${itechUrl}/api/h5/searchByUnit`;
    return await http.post(url, parmas, {}, {
      isLoading: false
    });
  },
  /**
   * 查询人才详情
   */
  async getExpertInfo (parmas) {
    const url = `${itechUrl}/api/h5/getExpertInfo`;
    return await http.get(url, parmas, {}, {
      isLoading: false
    });
  },
  /**
   * 语义搜索
   */
  async recommendSearch (parmas) {
    const url = `${itechUrl}/api/h5/recommendSearch`;
    return await http.post(url, parmas, {}, {
      isLoading: false
    });
  }
}
