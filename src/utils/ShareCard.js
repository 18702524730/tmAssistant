const { payUrl, wxUrl } = CONFIG;
import interfaces from '../api/interfaces.js';
// import bgPath_ from '../assets/img/placeUrl/card_bg.jpg';
import qs from 'qs';

const sharCard = {
  /**
   * 初始化调用此方法
   *
   */
  async initShare(scene, path, callback) {
  	let bgPath = await this.getBgPath();
    // let bgPath = 'https://testossfile.ipsebe.com/5A4F12080691A2A0C06DE6545A308B3F.jpg';
    console.log(bgPath);
  	let text = 'sfsfsfsf'
    var self = this;

    wx.getSavedFileList({
      success: function (res) {
        console.log("len:" + res.fileList.length)
        if (res.fileList.length > 0) {
          for (var i = 0; i < res.fileList.length; i++) {
            wx.removeSavedFile({
              filePath: res.fileList[i].filePath,
              complete: function (res) {
              }
            })
          }
        }
      }
    })

    wx.getSystemInfo({
	    //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
	    success: function (res) {
	    	// console.log(res)
	    	var context = wx.createCanvasContext("mycanvas");
    		context.drawImage(bgPath, 0, 0, res.windowWidth, res.windowWidth);
    		context.setFontSize(14);
		    context.setFillStyle("#2F80F6");
		    context.save();
		    // context.translate(86, 360);//必须先将旋转原点平移到文字位置
		    context.translate(res.windowWidth * 165/750, res.windowWidth * 630/750);
		    context.fillText('请长按识别二维码，确认订单信息', 0, 0);//必须为（0,0）原点
		    context.restore();
		    context.stroke();

	    	const url = `${wxUrl}/weixin/miniApp/createwxaqrcode.do`;
    		wx.request({
		      url,
		      method: 'POST',
		      header: interfaces.createAuthHeader(),
		      data: {
		      	// miniAppSessionId: wx.getStorageSync('sessionId'),
            miniAppSessionId: 'wx05d45b713ed26a0e_wEJGOoAHCQN0lDzPOrZLglmKHJadYWzy',
		      	miniAppType: 6, // 2为拾贝微商城 3为推单助手wepy.$instance.globalData.miniAppType,
		      	qrcodeType: 2, // 1接口A,2 接口B,3 接口C 接口ABC的参数必传其一
		      	scene: scene,
		      	path: path, // 2接口B不能带参数，需传scene。接口A和接口C需要带参数
		      	width: 430,
		      	auto_color: false,
		      	line_color: {"r":"47","g":"128","b":"246"}
		    	},
		    	success(re){
						self.downImg({
		          url: re.data.imageurl,
		          fun(down) {
	            	context.drawImage(down.tempFilePath, res.windowWidth * 145/750, res.windowWidth * 145/750, res.windowWidth * 460/750, res.windowWidth * 460/750);
					      wx.drawCanvas({
					        canvasId: "mycanvas",
					        actions: context.getActions()
					      });
					      callback && callback(re.data.imageurl);
		          }
		        })
		    	},
		    	fail(err){
		    	}
		    });
	    }
		})
  },
  // 获取图片临时路径
  async getBgPath () {
    let bgData = await WXP.getImageInfo({
      src: 'https://testossfile.ipsebe.com/5A4F12080691A2A0C06DE6545A308B3F.jpg'
    });
    return bgData.path;
  },
  // 下载头像
  downImg(obj) {
    wx.downloadFile({
      url: obj.url,
      success: obj.fun
    })
  },
  /**
   *
   * 点击生成卡片调用此方法
   *
   */
  canavsToImg() {
    var self = this;
    self.hasFileTem();
  },
  hasFileTem(){
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var checkVer = function(){
        	var ret = true;
	        var version0 = res.version.split('.')[0];
	        var version1 = res.version.split('.')[1];
	        var version2 = res.version.split('.')[2];
	        if (version0 < 6) {
	        	ret = false;
	        }else if(version0 == 6){
	        	if (version1 < 5) {
	        		ret = false;
	        	}else if(version1 == 5 && version2<16){
	        		ret = false;
	        	}
	        }
	        return ret;
        }
        console.log(res.version)
        // canvas转换为图片会遇到兼容性问题，我遇到的是背景图在ios系统中，微信 6.5.16 以下的版本都不兼容。安卓是 .16以下的版本也不兼容背景图。
        if ((res.platform == "ios" && !checkVer()) || (res.platform == "android" && !checkVer()) ) {
          /*wx.previewImage({
            urls: [imgUrl]
          })*/
        } else {
        	console.log('ok')
          self.pre();
        }
      }
    })
  },
  pre(){
    console.log(this);
    wx.hideLoading()
    // 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success(res) {
        wx.previewImage({
          urls: [res.tempFilePath]
        })
      }
    });
  }
}

export default sharCard;