import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl } = CONFIG;

export default {
  // 订单数量统计接口
  async getResult() {
    const url = `${rootUrl}/order/selectOrderCount`;
    let d = await http.get(url, {}, {}, {
      isLoading: false
    });
    return d;
  },
  // 删除企业
  async deleteCompany(id, companyName) {
    const url = `${rootUrl}/delCompany`;
    let d = await http.post(url, {id, companyName}, {}, {
      isLoading: false
    })
    return d;
  },
  // 提交入库
  async inlib(companyName, code) {
    const url = `${rootUrl}/inlib`;
    let d = await http.post(url, {companyName, code}, {}, {
      isLoading: false,
      isErrorDefaultTip: false
    });
    return d
  },
  // 地址列表
  async selectAddressList() {
    const url = `${rootUrl}/address/selectAddressList`;
    let d = await http.get(url, {}, {}, {
      isLoading: false,
    });
    return d
  },
  // 添加/编辑收件地址
  async createAddress(param) {
    const url = `${rootUrl}/address/createAddress`;
    let d = await http.post(url, param, {}, {
      isLoading: false,
    });
    return d
  },
  // 删除收件地址
  async deleteAddress(id) {
    const url = `${rootUrl}/address/deleteAddress`;
    let d = await http.get(url, {id}, {}, {
      isLoading: false,
    });
    return d
  },
  // 添加订单的邮寄地址
  async createOrderAddress(orderSn, addressId) {
    const url = `${rootUrl}/address/createOrderAddress`;
    let d = await http.post(url, {orderSn, addressId}, {}, {
      isLoading: false,
    });
    return d
  },
}
