import http from '@/plugins/flyio/request'
import qs from 'qs'
const { indexUrl } = CONFIG

export default {
  /**
   * 首页数据 https://testwww.ipsebe.com/partner/homepage.htm
   */
  async indexData () {
    const url = `${indexUrl}/partner/homepage.htm`
    return await http.get(url, {}, {}, {
      isLoading: false
    })
  },
  /**
   * 公告详情
   */
  async noticeDetail (params) {
    const url = `${indexUrl}/partner/homepage/${params.id}.htm`
    return await http.get(url, {}, {}, {
      isLoading: false
    })
  },
  /**
   * 公告详情
   */
  async indexList (params) {
    const url = `${indexUrl}/partner/homepage/category.htm`
    return await http.get(url, params, {}, {
      isLoading: false
    })
  }
}
