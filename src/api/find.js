import http from '@/plugins/flyio/request'
import qs from 'qs'
const { itechUrl } = CONFIG;

export default {
  // 首页专家列表
  async getTopExpert(params = {}) {
    const url = `${itechUrl}/api/h5/getTopExpert`;
    let d = await http.post(url, params);
    return d.data;
  },
  // 首页成果转化
  async getTopCaseList(params = {}) {
    const url = `${itechUrl}/api/h5/getTopCaseList`;
    let d = await http.post(url, params, {}, {
      isLoading: false
    });
    return d.data;
  },
  // 首页成果详情
  async getContentDetail(contentId) {
    const url = `${itechUrl}/api/news/getContentDetail`;
    let d = await http.post(url, {contentId});
    return d.data;
  },
  // 成果详情中相关栏目
  async getHotContentList(channelId) {
    const url = `${itechUrl}/api/news/getHotContentList`;
    let d = await http.post(url, {channelId});
    return d.data;
  },
  // 按人才姓名查找
  async searchExpertByName(params) {
    const url = `${itechUrl}/api/h5/searchExpertByName`;
    let d = await http.post(url, params);
    return d.data;
  },
  // 综合查找
  async search(params) {
    const url = `${itechUrl}/api/h5`;
    let d = await http.post(url, params, {}, {
      isLoading: false
    });
    return d.response;
  },
  // 综合查找-搜索建议
  async searchKeyword(keyword) {
    const url = `${itechUrl}/api/h5/suggest`;
    let d = await http.get(url, {keyword}, {}, {
      isLoading: false
    });
    return d.data.keyword;
  },
  // 专利详情接口
  async patentDetail(id) {
    const url = `${itechUrl}/api/patent/mobile/getInfo`;
    let d = await http.get(url, {id, token: 1});
    return d.data;
  },
  // 相关专利
  async getSimilarPatents(patentId) {
    const url = `${itechUrl}/api/patent/mobile/getSimilarPatents`;
    let d = await http.get(url, {patentId, token: 1});
    return d.data;
  },
  // 专利法律状态
  async getPatentLegalStatus(applicationNo) {
    const url = `${itechUrl}/api/patent/mobile/getPatentLegalStatus`;
    let d = await http.post(url, qs.stringify({applicationNo, token: 1}));
    return d.data;
  },
  // 论文详情接口
  async paperDetail(id) {
    const url = `${itechUrl}/api/paper/mobile/getInfo`;
    let d = await http.get(url, {id, token: 1});
    return d.data;
  },
  // 相关论文
  async getSimilarPapers(paperId) {
    const url = `${itechUrl}/api/paper/mobile/getSimilarPapers`;
    let d = await http.get(url, {paperId, token: 1});
    return d.data;
  },
  // 项目详情接口
  async projectDetail(id) {
    const url = `${itechUrl}/api/project/mobile/getInfo`;
    let d = await http.get(url, {id, token: 1});
    return d.data;
  },
  // 相关项目
  async getSimilarProjects(projectId) {
    const url = `${itechUrl}/api/project/mobile/getSimilarProjects`;
    let d = await http.get(url, {projectId, token: 1});
    return d.data;
  },
  // 专家列表
  async getImportSchoolExpertList(parmas, noLoading) {
    const url = `${itechUrl}/api/h5/getImportSchoolExpertList`;
    let d = await http.post(url, parmas, {}, {
      isLoading: !noLoading
    });
    return d.data;
  },
  // 模糊搜索专家
  async suggestImportSchoolExpert(keyword) {
    const url = `${itechUrl}/api/h5/suggestImportSchoolExpert`;
    let d = await http.get(url, {keyword: keyword});
    return d.data;
  },
}
