import mock from './base'
const { cartUrl, indexUrl, rootUrl } = CONFIG;
const url = `${indexUrl}/cms/api/directive/contentList`;
//根据推单id查询详情
mock.onGet(url).reply(200, {
    "page": {
        "totalCount": 6,
        "pageSize": 10,
        "pageIndex": 1,
        "list": [
            {
                "id": 143,
                "title": "钱塘智慧城国际人才创业创新园555555555",
                "userId": 1,
                "checkUserId": 1,
                "categoryId": 31,
                "modelId": "acticle",
                "parentId": null,
                "copied": false,
                "author": "SEBE",
                "editor": "",
                "onlyUrl": false,
                "hasImages": false,
                "hasFiles": false,
                "hasStatic": false,
                "url": "https://testwww.ipsebe.com/cms/http://testwww.ipsebe.com/sp_platform.html?id=24",
                "description": "钱塘智慧城国际人才创业创新园555555555555",
                "tagIds": "",
                "cover": "upload/2018/08-08/14-18-580681-308155413.jpg",
                "childs": 0,
                "scores": 0,
                "comments": 0,
                "clicks": 0,
                "publishDate": 1539937578000,
                "createDate": 1539937578000,
                "status": 1,
                "disabled": false
            },
            {
                "id": 142,
                "title": "钱塘智慧城国际人才创业创新园4444444",
                "userId": 1,
                "checkUserId": 1,
                "categoryId": 31,
                "modelId": "acticle",
                "parentId": null,
                "copied": false,
                "author": "SEBE",
                "editor": "",
                "onlyUrl": false,
                "hasImages": false,
                "hasFiles": false,
                "hasStatic": false,
                "url": "https://testwww.ipsebe.com/cms/http://testwww.ipsebe.com/sp_platform.html?id=24",
                "description": "钱塘智慧城国际人才创业创新园4444444444444",
                "tagIds": "",
                "cover": "upload/2018/08-08/14-18-580681-308155413.jpg",
                "childs": 0,
                "scores": 0,
                "comments": 0,
                "clicks": 0,
                "publishDate": 1539937561000,
                "createDate": 1539937561000,
                "status": 1,
                "disabled": false
            },
            {
                "id": 141,
                "title": "钱塘智慧城国际人才创业创新园333333",
                "userId": 1,
                "checkUserId": 1,
                "categoryId": 31,
                "modelId": "acticle",
                "parentId": null,
                "copied": false,
                "author": "SEBE",
                "editor": "",
                "onlyUrl": false,
                "hasImages": false,
                "hasFiles": false,
                "hasStatic": false,
                "url": "https://testwww.ipsebe.com/cms/http://testwww.ipsebe.com/sp_platform.html?id=24",
                "description": "钱塘智慧城国际人才创业创新园33333",
                "tagIds": "",
                "cover": "upload/2018/08-08/15-38-390878-288651348.jpg",
                "childs": 0,
                "scores": 0,
                "comments": 0,
                "clicks": 0,
                "publishDate": 1539937546000,
                "createDate": 1539937546000,
                "status": 1,
                "disabled": false
            },
            {
                "id": 140,
                "title": "钱塘智慧城国际人才创业创新园22222",
                "userId": 1,
                "checkUserId": 1,
                "categoryId": 31,
                "modelId": "acticle",
                "parentId": null,
                "copied": false,
                "author": "SEBE",
                "editor": "",
                "onlyUrl": false,
                "hasImages": false,
                "hasFiles": false,
                "hasStatic": false,
                "url": "https://testwww.ipsebe.com/cms/http://testwww.ipsebe.com/sp_platform.html?id=24",
                "description": "钱塘智慧城国际人才创业创新园22222",
                "tagIds": "",
                "cover": "upload/2018/09-05/08-39-350761-481379282.jpg",
                "childs": 0,
                "scores": 0,
                "comments": 0,
                "clicks": 0,
                "publishDate": 1539937529000,
                "createDate": 1539937529000,
                "status": 1,
                "disabled": false
            },
            {
                "id": 139,
                "title": "钱塘智慧城国际人才创业创新园",
                "userId": 1,
                "checkUserId": 1,
                "categoryId": 31,
                "modelId": "acticle",
                "parentId": null,
                "copied": false,
                "author": "SEBE杭州钱塘智慧城",
                "editor": "",
                "onlyUrl": false,
                "hasImages": false,
                "hasFiles": false,
                "hasStatic": false,
                "url": "https://testwww.ipsebe.com/cms/http://testwww.ipsebe.com/sp_platform.html?id=24",
                "description": "钱塘智慧城国际人才创业创新园正式开业",
                "tagIds": "",
                "cover": "upload/2018/09-05/08-39-350761-481379282.jpg",
                "childs": 0,
                "scores": 0,
                "comments": 0,
                "clicks": 0,
                "publishDate": 1539929466000,
                "createDate": 1539929466000,
                "status": 1,
                "disabled": false
            },
            {
                "id": 137,
                "title": "科技局文章1111",
                "userId": 1,
                "checkUserId": 1,
                "categoryId": 31,
                "modelId": "acticle",
                "parentId": null,
                "copied": false,
                "author": "SEBE",
                "editor": "",
                "onlyUrl": false,
                "hasImages": false,
                "hasFiles": false,
                "hasStatic": false,
                "url": "https://testwww.ipsebe.com/cms/http://testwww.ipsebe.com/sp_platform.html?id=24",
                "description": "科技局文章科技局文章科技局文章",
                "tagIds": "",
                "cover": "upload/2018/09-05/08-39-350761-481379282.jpg",
                "childs": 0,
                "scores": 0,
                "comments": 0,
                "clicks": 0,
                "publishDate": 1539851102000,
                "createDate": 1539851102000,
                "status": 1,
                "disabled": false
            }
        ],
        "firstResult": 0,
        "totalPage": 1,
        "firstPage": true,
        "lastPage": true,
        "nextPage": 1,
        "prePage": 1
    }
});

//专家列表
mock.onPost('https://www.itech4u.cn/api/h5/getTopExpert').reply(200, {"meta":{"result":1,"success":true,"message":"ok"},"data":[{"importId":660,"expertId":"e5fe286c-c04f-424d-bd70-0499db8cd00f","name":"陈科明","photo":"http://oqwcurblm.bkt.clouddn.com/hdu_chenkeming.png","school":"杭州电子科技大学","college":"电子信息学院","title":"副教授","degree":"","ability":"数字集成电路设计、无线传感器网络和嵌入式系统","researchField":"流水线,成形滤波器,无线网络,高速发排卡,射频识别,直接制版机,共模反馈,超高频射频识别,读写器,发送器,低压差分信号,通用串行总线,无线组网,时钟提取,智能照明系统,可变轮询周期,媒体系统芯片,多处理器,吉比特无源光网络,虚连接,,","readNum":null,"shareNum":null,"favoriteNum":null,"isMark":"","introduction":"陈科明，杭州电子科技大学副教授，硕士生导师。2007年毕业于浙江大学，获博士学位，同年进入杭州电子科技大学工作至今，期间在欧洲访学，回国创办杭州轨物科技有限公司，进行科技成果产业化工作，获2017年中国创新挑战赛金点子奖。主要从事物联网技术、低功耗无线技术、人工智能等技术的研发。主持参与多项国家、省部级项目等，拥有专利20余项，多项科研成果已实现产业化。\r\n"},{"importId":829,"expertId":"5e162647-bb60-455d-bab5-33ec04e8b003","name":"张国平","photo":"http://person.zju.edu.cn/attachments/04/0512034211-103260329.jpg","school":"浙江大学","college":"农业与生物技术学院","title":"教授","degree":"","ability":"作物逆境分子生理、作物种质创新与育种、作物优质形成规律与调控","researchField":"基因型,重金属,蛋白质,麦绿素,耐热性,干物质,蛋白质含量,啤酒大麦,,","readNum":null,"shareNum":null,"favoriteNum":null,"isMark":"","introduction":"浙江余姚人，农学博士，教授，博士生导师，现任浙江大学新农村发展研究院常务副院长。1984年毕业于浙江农业大学农学系获硕士学位，1999年毕业于浙江大学环境与资源学院获博士学位。1985-1998年在浙江农业大学任教，1992年9月任副教授，1996年12月任教授，并分别于1993年和1995年起任副系主任和系主任。1998年至今在浙江大学农学系任教，先后任农业与生物技术学院副院长、常务副院长、农业生命环境学部主任，曾兼任国家大麦遗传学大会主席（2016-2016），目前任Journal of Agronomy and Crop Science, Plant Growth Regulation, Journal of Integrative Agriculture, Journal of Zhejiang University Science B等6本SCI收录杂志编以及作物学报，中国农业科学，麦类作物学报，科技通报等杂志编委。期间10余次赴日本、英国和澳大利亚等国从事学术进修、博士后和合作研究。"},{"importId":6710,"expertId":"4ba36550-6b73-41c5-96d1-3b2a9eaf4444","name":"董林玺","photo":"http://oqwcurblm.bkt.clouddn.com/hdu_donglingxi.jpg","school":"杭州电子科技大学","college":"电子信息学院","title":"教授","degree":"","ability":"电路与系统、微电子学与固体电子学","researchField":"MEMS,微机电系统,惯性传感器,电容式传感器,倾斜梳齿,Matlab,电容式加速度传感器,高精度微传感器,DC-DC升压,静电梳齿,ANSYS,热分析,条件接收,电池充电,BP神经网络,LabVIEW,横向间隙,惯性力,机械冲击,高性能系统总线,,","readNum":null,"shareNum":null,"favoriteNum":null,"isMark":"","introduction":"2004年6月浙江大学微电子学与固体电子学专业博士毕业，同年进入杭州电子科技大学工作，2005年至今历任副研究员、研究员、教授。2015年-2016年美国Berkeley Sensor and Actuator Center, University of California at Berkeley访问教授。董林玺教授是电路与系统、微电子学与固体电子学专业硕士生导师。主要从事嵌入式控制系统、物联网、电源管理芯片设计、RF MEMS、基于MEMS技术的微系统设计等方面的研究工作"},{"importId":7390,"expertId":"8a018097-6906-4bda-a44c-23ff6577eedb","name":"徐小良","photo":"http://oqwcurblm.bkt.clouddn.com/hdu_xuxiaoliang.jpg","school":"杭州电子科技大学","college":"计算机学院","title":"教授","degree":"","ability":"大数据、知识图谱、人工智能、类脑计算、自然语言处理、搜索引擎、移动互联网","researchField":"知识图谱,人工智能,类脑计算,大数据处理,推荐模型,信息检索,词向量,Spark,Hadoop,无线传感器网络,信息融合,项目管理系统,目标跟踪","readNum":null,"shareNum":null,"favoriteNum":null,"isMark":"","introduction":"徐小良：男，1976年4月生，浙江东阳人，博士，教授，硕士生导师，杭州电子科技大学软件所副所长，移动互联应用实验室主任，浙江省“151人才”，浙江省人工智能学会理事，中国计算机学会会员，杭州市移动互联网技术学会理事，浙江省科技厅评审专家、浙江省政法委和商务厅信息化专家委员会成员。主要研究领域为大数据与知识图谱、人工智能、类脑计算、自然语言处理、搜索引擎、移动互联网等，曾主持和参与了多项国家自然科学基金项目、国防预演项目、浙江省重大科技专项、产学研项目等，在国内外期刊及国际学术会议上发表论文40余篇，授权发明专利6项，获浙江省科技进步奖三等奖一项。与华为技术有限公司、浙江省科技信息研究院、杭州三汇数字信息有限公司、杭州迈可行通信股份有限公司等建立了良好的合作关系。目前，实验室主要承担国家自然科学基金项目“面向大数据近似查询应用的在线聚集融合机制与优化研究”、“基于神经拟态模型的并发数据流无监督在线异常检测技术”、浙江省重点研发项目“促进成果转化的科技大数据服务平台开发及应用”等。"}]});

//成果列表
mock.onPost('https://www.itech4u.cn/api/h5/getTopCaseList').reply(200, {"meta":{"result":1,"success":true,"message":"ok"},"data":[{"contentId":174,"title":"全电动注塑机技术对接成功","typeImg":"https://cms.itech4u.cn/jeecms/u/cms/www/201810/091455398mkv.png","description":"宁波斯曼尔电器有限公司是一家专业从事塑料机械辅助设备生产、销售的国家高新技术企业，公司生产各类粉碎机、干燥机、上料机、模温机、冷水机、除湿机、混色机、机械手、输送机等九大系列八十多种品种型号的塑机辅机产品。","channelId":95,"channelName":"成功案例","releaseDate":1539068142000,"views":64},{"contentId":173,"title":"多功能MEMS传感器技术对接成功","typeImg":"https://cms.itech4u.cn/jeecms/u/cms/www/201810/091451275sa7.png","description":"杭州晶华微电子有限公司欲做一款集成了压力、湿度和温度功能的MEMS传感器，该传感器可以用于测量高铁运行时的海拔高度，室外环境等，同时也可以广泛的用于无人机、室内导航仪等，有着很好的市场前景。董林玺教授一直致力于MEMS传感器、柔性传感器、射频微纳谐振器以及电源管理模拟集成电路设计等方面的研究工作","channelId":95,"channelName":"成功案例","releaseDate":1539067892000,"views":47},{"contentId":172,"title":"安吉办公椅底座焊缝抛光技术解决方案","typeImg":"https://cms.itech4u.cn/jeecms/u/cms/www/201809/17163028o9lh.png","description":"安吉嘉诚五金，是一家专业从事转椅五金配件生产的企业，企业成立于2010年，目前企业配各有冲床、钻床、电焊机、喷塑房、抛丸机等设务。安吉嘉诚五金目前的产品生产主要依靠工人手工操作，为实现自动化改造、提高效率、增强更大化效益，希望寻找有关办公椅底座焊缝抛光技术方面的专家对现有的技术进行改进。","channelId":95,"channelName":"成功案例","releaseDate":1537173344000,"views":77},{"contentId":171,"title":"再生铅湿法回收工艺、冶炼尾渣处理等技术对接成功案例","typeImg":"https://cms.itech4u.cn/jeecms/u/cms/www/201809/17161618o0mr.png","description":"浙江天能电源材料有限公司，是中国新能源动力电池行业的龙头企业。现已成为以电动车环保动力电池制造为主，集新能源汽车锂电池、汽车起动启停电池、风能太阳能储能电池的研发、生产、销售，以及废旧电池回收和循环利用、城市智能微电网建设、绿色智造产业园建设等为一体的大型实业集团。","channelId":95,"channelName":"成功案例","releaseDate":1537172872000,"views":53},{"contentId":170,"title":"智能灯带柔和调色技术对接成功案例","typeImg":"https://cms.itech4u.cn/jeecms/u/cms/www/201809/17154025psoh.png","description":"舟山乐讯智能科技有限公司，是一家从事智能照明研发、生产和销售的公司。公司生产的产品主要包括：无源无线光能开关、开关执行器、智能球泡灯以及智能灯带等。企业希望针对原有智能灯和智能灯带在调光、调色方面柔和性不足的问题，寻求技术突破。","channelId":95,"channelName":"成功案例","releaseDate":1537170434000,"views":42},{"contentId":169,"title":"RS485接口设备的SPC系统接入技术对接成功案例","typeImg":"https://cms.itech4u.cn/jeecms/u/cms/www/201809/17151750mnrf.png","description":"汉博士科技，专注汽车雨刮器研发、生产及销售，年销售量达5000万条，在中国大陆销售量排行榜中名列前茅。汽车雨刮器产品主要提供给德国大众、华晨汽车及全球280家售后服务企业。公司目前采用SPC软件进行生产线质量控制，随着生产线扩展需要不断接入新设备","channelId":95,"channelName":"成功案例","releaseDate":1537169103000,"views":33}]});

// 查询企业列表
mock.onGet(`${rootUrl}/zcc/queryCompanyList`).reply(200, {
  "totalElements": 10,
  "elements": [
      {
          "name": "杭州拾贝投资有限公司",
          "esdate": "2016-08-12",
          "regcap": "500.0",
          "faren": "周天雨"
      },
      {
          "name": "杭州丽音八音琴有限公司",
          "esdate": "2008-01-28",
          "regcap": "10.0",
          "faren": "汪明亮"
      },
      {
          "name": "杭州拾贝营销策划有限公司",
          "esdate": "2014-05-16",
          "regcap": "10.0",
          "faren": "王威"
      },
      {
          "name": "杭州拾贝保险经纪有限公司",
          "esdate": "2014-03-31",
          "regcap": "5000.0",
          "faren": "孔强"
      },
      {
          "name": "杭州拾贝电子商务有限公司",
          "esdate": "2017-06-27",
          "regcap": "50.0",
          "faren": "李健"
      },
      {
          "name": "杭州拾贝健康管理有限公司",
          "esdate": "2016-04-29",
          "regcap": "50.0",
          "faren": "孙彪"
      },
      {
          "name": "杭州拾贝知识产权服务有限公司",
          "esdate": "2015-10-26",
          "regcap": "638.5696",
          "faren": "章娜"
      },
      {
          "name": "杭州拾贝汇保生活服务有限公司",
          "esdate": "2017-01-18",
          "regcap": "1000.0",
          "faren": "王威"
      },
      {
          "name": "杭州拾贝知识产权服务有限公司第一分公司",
          "esdate": "2016-12-21",
          "regcap": "",
          "faren": "章娜"
      },
      {
          "name": "杭州拾贝知识产权服务有限公司第二分公司",
          "esdate": "2016-12-21",
          "regcap": "",
          "faren": "章娜"
      }
  ]
});

// 查询企业详情
mock.onGet(`${rootUrl}/zcc/companyDetail`).reply(200, {
  "companyinfo":{
    "faren":"张三",
    "esdate":"2013-02-19",
    "tel":"联系电话",
    "entstatus":"登记状态",
    "regcap":"635",
    "regcapcur":"注册资本单位",
    "reccap":"500",
    "enttype":"企业类型",
    "empnum":"员工人数",
    "creditcode":"统一社会信用代码",
    "regno":"工商注册号",
    "entnameeng":"英文名",
    "industryphyname":"所属行业",
    "opscope":"经营范围",
    "dom":"公司地址",
    "changedate":"变更日期",
    "regorg":"登记机关",
    "qualification":"已获得资质荣誉",
    "pageview":"浏览数量"
  }
});

// 查询专利列表
mock.onPost(`${rootUrl}/zcc/patentList`).reply(200, {
  "totalElements": 10,
    "elements": [
        {
            "title": "专利名称",
            "abs": "摘要",
            "applicantName": "申请（专利权）人",
            "patType": "专利类型",
            "appDate":"申请日",
            "title":"专利名称",
            "inventroName":"发明人",
            "applicantName":"申请人",
            "appDate":"申请日期",
            "pubNumber":"公开号",
            "pubDate":"公开日期",
            "patType":"专利类型",
            "address":"地址",
            "lprs":"最新法律状态",
            "abs":"摘要",
            "cl":"主权项"
        },
        {
            "title": "专利名称",
            "abs": "摘要",
            "applicantName": "申请（专利权）人",
            "patType": "专利类型",
            "appDate":"申请日"
        },
        {
            "title": "专利名称",
            "abs": "摘要",
            "applicantName": "申请（专利权）人",
            "patType": "专利类型",
            "appDate":"申请日"
        }
    ]
});

// 查询商标列表
mock.onGet(`${rootUrl}/zcc/tmList`).reply(200, {
  "totalElements": 10,
  "elements": [
      {
          "tmName": "商标名称",
          "tmImg": "http://images.cha-tm.cn/tmimages/45/2016/0x72005300790048004600460068003000.jpg",
          "intCls": 34,
          "appDate": "2027-09-13",
          "currentStatus":"已注册",
          "appDate": "2016-07-20",
          "applicantCn": "杭州拾贝知识产权服务有限公司",
          "intCls": 45,
          "regDate": "2017-09-14",
          "regNo": "20706694",
          "tmName": "标兴利易",
          "privateDate": "2027-09-13",
          "goods": "知识产权咨询,版权管理,知识产权许可,为法律咨询目的监控知识产权,诉讼服务,计算机软件许可(法律服务),域名注册(法律服务),替代性纠纷解决服务,法律文件准备服务,许可的法律管理",
          "goodsCode": "4506",
          "goodsList": [
              {
                  "goodsName": "知识产权咨询"
              },
              {
                  "goodsName": "版权管理"
              },
              {
                  "goodsName": "许可的法律管理"
              }
          ]
      },
      {
          "tmName": "商标名称",
          "tmImg": "http://images.cha-tm.cn/tmimages/45/2016/0x72005300790048004600460068003000.jpg",
          "intCls": 45,
          "appDate": "2027-09-13",
          "currentStatus":"已注册"
      },
      {
          "tmName": "商标名称",
          "tmImg": "http://images.cha-tm.cn/tmimages/45/2016/0x72005300790048004600460068003000.jpg",
          "intCls": 45,
          "appDate": "2027-09-13",
          "currentStatus":"已注册"
      }
  ]
});

// 查询软件著作权
mock.onPost(`${rootUrl}/zcc/softwareList`).reply(200, {
  "code": "200",
    "elements": [
        {
            "owner": "小米科技有限责任公司",
            "publishDate": "2016-06-20 00:00:00",
            "versionNo": "V1.0",
            "name": "小米移动网上营业厅软件（Android版）",
            "registerAperDate": "2016-11-15 00:00:00",
            "category": "30100-0000",
            "shortName": "",
            "registerNo": "2016SR330529"
        },
        {
            "owner": "小米科技有限责任公司",
            "publishDate": "2016-06-20 00:00:00",
            "versionNo": "V1.0",
            "name": "小米移动网上营业厅软件（iOS版）",
            "registerAperDate": "2016-11-08 00:00:00",
            "category": "30100-0000",
            "shortName": "",
            "registerNo": "2016SR322156"
        }
    ],
    "totalElements": 14
});

// 查询作品著作权
mock.onGet(`${rootUrl}/zcc/copyrightList`).reply(200, {
  "code": "200",
    "elements": [
        {
            "owner": "小米科技有限责任公司",
            "name": "米兔趣味童年",
            "publishDate": "2018-07-09 00:00:00",
            "finishDate": "2018-07-09 00:00:00",
            "category": "美术",
            "registerNo": "国作登字-2018-F-00576287",
            "registerDate": "2018-07-09 00:00:00"
        },
        {
            "owner": "小米科技有限责任公司",
            "name": "爱的梦想（客服之歌）",
            "publishDate": "2018-05-18 00:00:00",
            "finishDate": "2018-05-18 00:00:00",
            "category": "文字",
            "registerNo": "国作登字-2018-A-00548611",
            "registerDate": "2018-05-18 00:00:00"
        }
    ],
    "totalElements": 143
});

// 查询论文列表
mock.onGet(`${rootUrl}/zcc/paperList`).reply(200, {
  "totalElements": 10,
  "elements": [
      {
          "name": "论文名称",
          "paperAbstract": "摘要",
          "authors": "作者",
          "journalName":"期刊",
          "journalNo": "时间编号，如2002年04期",
          "unit":"单位"
      },
      {
          "name": "论文名称",
          "paperAbstract": "摘要",
          "authors": "作者",
          "journalName":"期刊",
          "journalNo": "时间编号，如2002年04期",
          "unit":"单位"
      },
      {
          "name": "论文名称",
          "paperAbstract": "摘要",
          "authors": "作者",
          "journalName":"期刊",
          "journalNo": "时间编号，如2002年04期",
          "unit":"单位"
      }
  ]
});

// 查询论文列表
mock.onPost(`${rootUrl}/zcc/projectList`).reply(200, {
  "totalElements": 10,
    "elements": [
        {
            "name": "项目名称",
            "member": "人员",
            "unit": "单位",
            "abstractCh":"项目中文简介",
            "year": "年份",
            "projType":"类型，如：国家自然科学基金"
        },
        {
            "name": "项目名称",
            "member": "人员",
            "unit": "单位",
            "abstractCh":"项目中文简介",
            "year": "年份",
            "projType":"类型，如：国家自然科学基金"
        },
        {
            "name": "项目名称",
            "member": "人员",
            "unit": "单位",
            "abstractCh":"项目中文简介",
            "year": "年份",
            "projType":"类型，如：国家自然科学基金"
        }
    ]
});

export default mock;
