import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl } = CONFIG;

export default {

  // 创建订单
  async createOrder(params) {
    const url = `${rootUrl}/order/createOrder?${qs.stringify(params)}`;
    let data = await http.post(url, params, {}, {
      isLoading: true
    });
    return data;
  },

  // 查询商品价格
  async selectOrderAmount () {
    return await http.get(`${rootUrl}/order/selectOrderAmount`, null, null, {isLoading: false})
  },

  // 订单列表
  async queryOrderList(params) {
    const url = `${rootUrl}/order/queryOrderList`;
    let data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data;
  },

  // 订单详情
  async selectOrderDetail(orderSn) {
    const url = `${rootUrl}/order/selectOrderDetail`;
    let data = await http.get(url, {orderSn}, {}, {
      isLoading: false
    });
    return data;
  },

  // 取消订单
  async cancleOrder(orderSn) {
    const url = `${rootUrl}/order/cancleOrder`;
    let data = await http.get(url, {orderSn}, {}, {
      isLoading: false
    });
    return data;
  },

  // 退款
  async wxRefund(params) {
    const url = `${rootUrl}/order/wxRefund`;
    let data = await http.post(url, qs.stringify(params), {}, {
      isLoading: false
    });
    return data;
  },
}
