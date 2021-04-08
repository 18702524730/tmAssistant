import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl } = CONFIG;

export default {

  // 创建订单
  async UploadOrderBsFile(params) {
    const url = `${rootUrl}/orderBs/UploadOrderBsFile?${qs.stringify(params)}`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  // 创建订单
  async createOrderBs(params) {
    const url = `${rootUrl}/orderBs/createOrderBs`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },
  async selectOrderBs (params) {
    const url = `${rootUrl}/orderBs/selectOrderBs?${qs.stringify(params)}`;
    let data = await http.get(url, null, {}, {
      isLoading: false
    });
    return data;
  },
  // 待签约（已提交材料再重新申办）
  async startNotary(orderSn) {
    const url = `${rootUrl}/orderBs/startNotary`;
    let data = await http.post(url, qs.stringify({orderSn}), {}, {
      isLoading: false
    });
    return data;
  },
  // 补充材料提交 fileUrls: List
  async uploadAnnex(orderSn, fileUrls) {
    const url = `${rootUrl}/orderBs/uploadAnnex`;
    let data = await http.post(url, {orderSn, fileUrls}, {}, {
      isLoading: false
    });
    return data;
  },
}
