import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl } = CONFIG;
export default {
  // 添加主体
  async createSubject(params) {
    const url = `${rootUrl}/subject/createSubject`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  // 删除主体
  async deleteSubject(params) {
    const url = `${rootUrl}/subject/deleteSubject?id=${params.id}`;
    let data = await http.delete(url, params, {}, {
      isLoading: false
    });
    return data;
  },
  // 主体列表 subjectList
  async subjectList(params) {
    const url = `${rootUrl}/subject/subjectList`;
    let data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data;
  },
  // 主体列表 subjectList
  async companyFilter(params) {
    const url = `${rootUrl}/subject/companyFilter`;
    let data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data;
  },
  // 根据企业名称获取企业信息
  async companyDetail(params) {
    const url = `${rootUrl}/subject/companyDetail`;
    let data = await http.get(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  // 更具注册号查询商标信息
  async getTradeMarkInfo(params) {
    const url = `${rootUrl}/subject/getTradeMarkInfo?regNo=${params.regNo}`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
}