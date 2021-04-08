export default {
  data () {
    return {
      shareImage: '',
      codeImgUrl: '',
      storeInfo: {},
      imageSize: ''
    }
  },
  methods: {
    // 模拟分享
    imitation() {
      let sense, path;
      if (this.$route.query.productNum) {
        sense = this.storeInfo.storeCode + "_" + this.$route.query.productNum
        path = 'pages/store/serviceDetail'
      } else {
        sense = this.storeInfo.storeCode
        path = 'pages/store/index'
      }
      console.log('placeUrl_sense:', sense)
      console.log('placeUrl_path:', path)
      wx.navigateToMiniProgram({
        appId: 'wx10617813540e0d66', //C端
        path: path,
        extraData: {
          scene: sense
        },
        envVersion: 'trial'
      });
    },
    image() {
      var imageSize = {};
      var originalScale = 1.78; //图片高宽比
      //获取屏幕宽高
      wx.getSystemInfo({
        success: function(res) {
          var windowWidth = res.windowWidth;
          var windowHeight = res.windowHeight;
          imageSize.width = res.windowWidth;
          imageSize.height = res.windowHeight;
          var windowscale = windowHeight / windowWidth; //屏幕高宽比
          if (originalScale < windowscale) {
            //图片高宽比小于屏幕高宽比
            //图片缩放后的宽为屏幕宽
            imageSize.imageWidth = windowWidth;
            imageSize.imageHeight = windowWidth * originalScale;
            imageSize.chaHeight = windowHeight - imageSize.imageHeight;
          } else {
            //图片高宽比大于屏幕高宽比
            //图片缩放后的高为屏幕高
            imageSize.imageHeight = windowHeight;
            imageSize.imageWidth = windowHeight / originalScale;
            imageSize.chaWidth = windowWidth - imageSize.imageWidth;
          }
        }
      });
      this.imageSize = imageSize
    },
    // 图片预览
    preViewPic () {
      wx.previewImage({
        urls: [this.shareImage],
      });
    },
    // 缓存网络图片
    async downPic (arr) {
      let newArr = [];
      let imgData, pathArr, newUrl;

      for (let item of arr) {
        pathArr = item.split('/')
        pathArr[2].indexOf('sebe360test') != -1 ? pathArr[2] = 'ossfile.ipsebe.com' : pathArr[2] = 'testossfile.ipsebe.com'

        newUrl = pathArr.join('/')  // `https://testossfile.ipsebe.com/${pathArr[pathArr.length - 1]}`

        imgData = await WXP.getImageInfo({
          src: newUrl // 分享商品背景图地址
        });
        newArr.push(imgData.path);
      }
      return newArr;
    },
    // 绘制商品卡片
    async drawSharePic2(item) {
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      await this.getCodeImg("pages/store/serviceDetail", item.productNum);
      wx.showLoading({
        title: "正在生成图片...",
        mask: true
      });
      let oldPicArr = [
        'https://testossfile.ipsebe.com/15F0634237B29FEB66234269F96D7D76.jpg', // bgUrl
        'https://testossfile.ipsebe.com/18E88F2F952E143FD34A96F7218028C0.png', // wyUrl
        this.$storage.get('storeInfo').avatar, // avaUrl
        item.picture
      ]
      let picArr = await this.downPic(oldPicArr)

      //y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
      let yOffset = 0;
      const goodsTitle = item.introduce || "";
      let goodsTitleArray = [];
      //为了防止标题过长，分割字符串,每行18个
      for (let i = 0; i < goodsTitle.length / 16; i++) {
        if (i > 2) {
          break;
        }
        goodsTitleArray.push(goodsTitle.substr(i * 16, 16));
      }
      const price = item.salePrice;
      const storeName = this.storeInfo.storeName || this.$storage.get("storeInfo").storeName;

      const canvasCtx = wx.createCanvasContext("shareCanvas");

      canvasCtx.setFillStyle("white");
      canvasCtx.fillRect(0, 0, 375*scale, 667*scale);
      canvasCtx.drawImage(picArr[0], 0, 0, 375*scale, 667*scale);

      // 接口传入的图片,店铺logo
      canvasCtx.drawImage(picArr[2], 37*scale, 52.5*scale, 75*scale, 75*scale);
      // canvasCtx.drawImage(logo, 150, 143, 75, 75);
      // 绘制屋檐的图片
      canvasCtx.drawImage(picArr[1], -11*scale, 20*scale, 396*scale, 642*scale);
      canvasCtx.setFontSize(14*scale);
      canvasCtx.setFillStyle("#333");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText(storeName, 118*scale, 95*scale);
      // 接口传入的图片,商品图片
      canvasCtx.drawImage(picArr[3], 37*scale, 145*scale, 300*scale, 300*scale);
      // 绘制商品标题
      canvasCtx.setFontSize(16*scale);
      canvasCtx.setFillStyle("#333333");
      canvasCtx.setTextAlign("left");
      yOffset = 475*scale;
      canvasCtx.fillText(item.productName, 37*scale, yOffset);
      yOffset += 26*scale;
      goodsTitleArray.forEach(function(value) {
        canvasCtx.setFontSize(12*scale);
        canvasCtx.setFillStyle("#999");
        canvasCtx.setTextAlign("left");
        canvasCtx.fillText(value, 37*scale, yOffset);
        yOffset += 21;
      });
      //绘制最底部文字
      canvasCtx.setFontSize(12*scale);
      canvasCtx.setFillStyle("#8E9DB4");
      canvasCtx.setTextAlign("center");
      canvasCtx.fillText("注：长按识别图中二维码", 187*scale, 634*scale);
      // 绘制价格
      yOffset += 17*scale;
      canvasCtx.setFontSize(12*scale);
      canvasCtx.setFillStyle("#F64744");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText("￥", 37*scale, yOffset);
      canvasCtx.setFontSize(24*scale);
      canvasCtx.setFillStyle("#F64744");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText(price, 48*scale, yOffset);
      // 绘制二维码
      canvasCtx.drawImage(this.codeImgUrl, 247*scale, 488*scale, 90*scale, 90*scale);
      canvasCtx.draw();

      let that = this;
      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375*scale,
          height: 667*scale,
          destWidth: 1125*scale,
          destHeight: 2001*scale,
          fileType: "jpg",
          quality: 0.3,
          canvasId: "shareCanvas",
          success: res => {
            this.shareImage = res.tempFilePath;
            wx.hideLoading();
            // this.savePicToAlbum(res.tempFilePath);
          },
          fail: function(res) {
            wx.hideLoading();
          }
        });
      }, 1500);
    },
    // 获取验证码
    async getCodeImg(path, num) {
      let scene, miniAppType;
      if (path == 'pages/authorize/authorize') {
        scene = `memberId=${num}`
        miniAppType = 5
      } else {
        miniAppType = 6
        num ? scene = this.storeInfo.storeCode + "_" + num :
              scene = this.storeInfo.storeCode
      }
      let data = await this.API.store.createwxaqrcode({
        miniAppSessionId: "wx10617813540e0d66_b1KmeZ6KzV1PYPkLD1x3PWVIsS14lsY6",
        miniAppType, // 2为拾贝微商城 3为推单助手wepy.$instance.globalData.miniAppType,
        qrcodeType: 2, // 1接口A,2 接口B,3 接口C 接口ABC的参数必传其一
        scene,
        path, // 2接口B不能带参数，需传scene。接口A和接口C需要带参数
        width: 210,
        auto_color: false,
        line_color: { r: "47", g: "128", b: "246" }
      });
      let codeUrlData = await WXP.getImageInfo({
        src: data.imageurl //服务器返回的图片地址
      });
      this.codeImgUrl = codeUrlData.path;
    },
    // 保存图片到手机
    savePicToAlbum(tempFilePath) {
      let that = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath || that.shareImage,
                  success(res) {
                    wx.showToast({
                      title: "保存成功"
                    });
                  },
                  fail(res) {
                    console.log(res);
                  }
                });
              },
              fail() {
                // 用户拒绝授权,打开设置页面
                wx.openSetting({
                  success: function(data) {
                    console.log("openSetting: success");
                  },
                  fail: function(data) {
                    console.log("openSetting: fail");
                  }
                });
              }
            });
          } else {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath || that.shareImage,
              success(res) {
                wx.showToast({
                  title: "保存成功"
                });
              },
              fail(res) {
                console.log(res);
              }
            });
          }
        },
        fail(res) {
          console.log(res);
        }
      });
    },
    Point(x, y) {
      return { x: x, y: y };
    },
    // 绘制圆角矩形
    drawRoundedRect(rect, r, ctx, shadow, fillStyle) {
      var ptA = this.Point(rect.x + r, rect.y);
      var ptB = this.Point(rect.x + rect.width, rect.y);
      var ptC = this.Point(rect.x + rect.width, rect.y + rect.height);
      var ptD = this.Point(rect.x, rect.y + rect.height);
      var ptE = this.Point(rect.x, rect.y);

      ctx.beginPath();

      ctx.moveTo(ptA.x, ptA.y);
      ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
      ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
      ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
      ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
      ctx.fillStyle = fillStyle ? fillStyle : "#fff";
      ctx.setShadow(0, 15, 28, shadow);
      // ctx.stroke(); // 线框
      ctx.fill(); // 填充
    },

    Rect(x, y, w, h) {
      return { x: x, y: y, width: w, height: h };
    },
    // 绘制邀请好友的卡片
    async drawSharePicFn () {
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      await this.getCodeImg("pages/authorize/authorize", this.$route.query.memberId);
      let oldPicArr = [
        'https://testossfile.ipsebe.com/79BE737C5DB5B68C68D3A1114335C50F.jpg',
        'https://testossfile.ipsebe.com/C5EC74375596C19267B55A3E667C04C2.png',
        this.$storage.get('auth').avatar
      ];
      let picArr = await this.downPic(oldPicArr)
      const ctx = wx.createCanvasContext('shareCanvas');
      // 绘制全局背景图
      ctx.drawImage(picArr[0], 0, 0, 375*scale, 667*scale);
      // 绘制头像
      ctx.drawImage(picArr[2], 148*scale, 291*scale, 80*scale, 80*scale);
      // 绘制中间背景图
      ctx.drawImage(picArr[1], 0, 25*scale, 375*scale, 618*scale);
      // 绘制昵称  nickName
      ctx.setFontSize(18*scale);
      ctx.setFillStyle('#333');
      ctx.setTextAlign('center');
      ctx.fillText(this.$storage.get('auth').nickname, 187*scale, 385*scale);
      // 绘制邀请用语
      ctx.setFontSize(15*scale);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('center');
      ctx.fillText('我在【拾贝宝】开店赚钱，邀请你', 187*scale, 418*scale);
      ctx.setFontSize(15*scale);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('center');
      ctx.fillText('一起加入哦！', 187*scale, 438*scale);
      // 绘制二维码图片 
      ctx.drawImage(this.codeImgUrl, 132*scale, 450*scale, 110*scale, 110*scale);
      //绘制最底部文字
      ctx.setFontSize(12*scale);
      ctx.setFillStyle('#999');
      ctx.setTextAlign('center');
      ctx.fillText('长按识别二维码', 187*scale, 575*scale);

      ctx.draw()

      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout( () => {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 375*scale,
            height: 667*scale,
            destWidth: 1125*scale,
            destHeight: 2001*scale,
            fileType: 'jpg',
            quality: 0.3,
            canvasId: 'shareCanvas',
            success: res => {
                this.shareImage = res.tempFilePath
                wx.hideLoading();
                this.$storage.set('invitPic', res.tempFilePath)
            },
            fail: function (res) {
                wx.hideLoading();
            }
        })
      }, 1500);   
    },
    // 绘制分享店铺的卡片
    async drawSharePic() {
      console.log('sdas', this.storeInfo)
      console.log('drawSharePic 商品')
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      this.shareDiaState = false;
      await this.getCodeImg("pages/store/index");
      // wx.showLoading({
      //   title: "正在生成图片...",
      //   mask: true
      // });
      console.log('下载中')
      let oldPicArr = [
        'https://testossfile.ipsebe.com/79BE737C5DB5B68C68D3A1114335C50F.jpg', // bgurl
        'https://testossfile.ipsebe.com/AADAA0395D0811D98BA67B27D7F30777.png', // wyurl
        this.$storage.get('storeInfo').avatar
      ]
      let picArr = await this.downPic(oldPicArr)
      console.log('生成中')
      //y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
      let yOffset = 0;
      const goodsTitle = "邀请您参观TA的店~";
      let goodsTitleArray = [];
      //为了防止标题过长，分割字符串,每行18个
      for (let i = 0; i < goodsTitle.length / 17; i++) {
        if (i > 2) {
          break;
        }
        goodsTitleArray.push(goodsTitle.substr(i * 17, 17));
      }

      const storeName = this.storeInfo.storeName;

      const canvasCtx = wx.createCanvasContext("shareCanvas");
      // ctx.textBaseline = 'middle'
      //绘制背景

      canvasCtx.setFillStyle("white"); // 0px 30px 56px 0px rgba(61,82,190,0.17);

      canvasCtx.fillRect(0, 0, 375*scale, 667*scale);
      // 绘制背景图
      canvasCtx.drawImage(picArr[0], 0, 0, 375*scale, 667*scale);
      //绘制尾部

      var rectBot = this.Rect(35*scale, 235*scale, 306*scale, 402*scale);
      this.drawRoundedRect(
        rectBot,
        4,
        canvasCtx,
        "rgba(64,85,196,0.14)",
        "rgba(255,255,255,0.6)"
      );

      // 绘制boxshadow
      var rect = this.Rect(18*scale, 111*scale, 340*scale, 506*scale); //      canvasCtx.fillRect(18, 111, 340, 506);
      this.drawRoundedRect(rect, 4, canvasCtx, "rgba(61,82,190,0.17)");
      // canvasCtx.draw(true)

      // 绘制灰色背景
      canvasCtx.fillStyle = "#F6F9FF";
      canvasCtx.setShadow(0, 0, 0, "#fff");
      canvasCtx.fillRect(18*scale, 111*scale, 340*scale, 148*scale);

      // 接口传入的图片,店铺logo
      canvasCtx.drawImage(picArr[2], 150*scale, 143*scale, 75*scale, 75*scale);
      // canvasCtx.drawImage(logo, 150, 143, 75, 75);
      //绘制屋檐的图片 https://testossfile.ipsebe.com/4B5498BD5AE7C25C0C2826A182BACF38.png
      canvasCtx.drawImage(picArr[1], 8*scale, 45*scale, 360*scale, 215*scale);
      canvasCtx.setFontSize(13*scale);
      canvasCtx.setFillStyle("#666");
      canvasCtx.setTextAlign("center");
      canvasCtx.fillText(storeName, 187*scale, 240*scale);
      //绘制商品标题
      yOffset = 300*scale;
      goodsTitleArray.forEach(function(value) {
        canvasCtx.setFontSize(20*scale);
        canvasCtx.setFillStyle("#333333");
        canvasCtx.setTextAlign("center");
        canvasCtx.fillText(value, 187*scale, yOffset);
        yOffset += 21*scale;
      });
      //绘制最底部文字
      canvasCtx.setFontSize(13*scale);
      canvasCtx.setFillStyle("#bbb");
      canvasCtx.setTextAlign("center");
      canvasCtx.fillText("长按识别图中二维码", 187*scale, 586*scale);
      // 绘制二维码
      yOffset += 5*scale;
      canvasCtx.drawImage(this.codeImgUrl, 83*scale, yOffset, 210*scale, 210*scale);
      canvasCtx.draw();
      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375*scale,
          height: 667*scale,
          destWidth: 1125*scale,
          destHeight: 2001*scale,
          fileType: "jpg",
          quality: 0.3,
          canvasId: "shareCanvas",
          success: res => {
            this.shareImage = res.tempFilePath;
            console.log(this.shareImage)
            this.$storage.set('storePic', res.tempFilePath)
            wx.hideLoading();
            // 这里保存图片
            // this.savePicToAlbum(res.tempFilePath);
          },
          fail: function(res) {
            console.log(res);
            wx.hideLoading();
          }
        });
      }, 1500);
    }
  },
}