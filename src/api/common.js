import http from '@/plugins/flyio/request'
import interfaces from './interfaces'
const { cartUrl, wxUrl, userUrl, indexUrl } = CONFIG;

export default {

  // 上传图片到云盘，获得url
  async uploadImg (type) {
    const uploadUrl = `${indexUrl}/file/upload.htm`;
    let res = await WXP.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: type ? [type] : ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
    })
    let data = await WXP.uploadFile({
      url: uploadUrl,
      header: interfaces.createAuthHeader(),
      filePath: res.tempFilePaths[0],
      name: 'fileData',
    })
    let respData = JSON.parse(data.data);
    return respData.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
  },

  // 获取省市区数据
  async getAreaData () {
    const url = cartUrl + '/mainConfirmation/areas.htm';
    const data = await http.post(url, {}, {}, {
      isLoading: false
    });
    return data.elements;
  },

  // 获取国家数据
  async getCountryData () {
    const url = userUrl + '/api/country';
    const data = await http.get(url, {}, {}, {
      isLoading: false
    });
    return data;
  },
}
