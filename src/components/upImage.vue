<template>
  <div class="add_tit_wrap">
    <div class="page">
      <div class="weui-uploader__bd">
      <!-- 有图片显示图片 -->
        <div class="weui-uploader__imgUrl" :style="'width:'+wids+'rpx;height:'+higs+'rpx;'" id="uploaderimgUrl" v-if="imgUrl">
          <block>
            <div class="weui-uploader__file" @click="doClick">
              <image class="weui-uploader__img" :style="'width:'+wids+'rpx;height:'+higs+'rpx;'" :src="imgUrl" mode="aspectFit" />
            </div>
            <!-- <div class="remove row-center" @click="moveImg">
              <img src="../assets/img/businessSettled/close.png" alt="">
            </div> -->
          </block>
        </div>
        <!-- 没有图片显示上传 -->
        <div class="weui-uploader__input-box" :style="'width:'+wids+'rpx;height:'+higs+'rpx;'" v-if="!imgUrl">
          <div class="weui-uploader__input" :style="'width:'+wids+'rpx;height:'+higs+'rpx;'" @click="showActionList"></div>
        </div>
      </div>
    </div>

    <div class="pick_wrap" v-if="showList">
      <div class="pick_bg" @click="hideFn()"></div>
      <div class="pick_fixed" :class="{'move': showList, 'moveDown': !showList}">
        <div class="pick_item" v-for="(item, index) in list" :key="index" @click="selectFn(item)">{{ item.name }}</div>
        <div class="cancel" @click="hideFn()">取消</div>
      </div>
    </div>
  </div>

</template>
<script>
  import { mapState, mapActions } from 'vuex'
  const { cartUrl, wxUrl, userUrl, indexUrl } = CONFIG;
  export default{
    props:{
      list: {
        type: Array,
        default: [
          {
            id: 1,
            name: '拍照'
          },
          {
            id: 2,
            name: '从相册选择'
          }
        ]
      },
      wids:{
        type: String,
        default: '160'
      },
      higs:{
        type: String,
        default: '160'
      },
      // 上传文件url
      url:{
        type: String,
        default: `${indexUrl}/file/upload.htm`
      },
      // 接口参数字段名
      uploadKey: {
        type: String,
        default: 'fileData'
      },
      // 上传文件url对应的字段名
      valueName: {
        type: String,
        default: ''
      },
      // 点击图片跳转路径
      toUrl:{
        type: String,
        default: ''
      },
      imgUrl:{
        type: String,
        default: ''
      }
    },
    data(){
      return{
      //   imgUrl:''
        showList:false
      }
    },
    methods :{
      ...mapActions('operation', [
        'updateImgUrl',
      ]),
      selectFn(item){
        if(item.id === 0){// 自定义
          this.$emit('customize');
        }
        if(item.id === 1){//拍照
          this.chooseImg('camera');
        }
        if(item.id === 2){//相册
          this.chooseImg('album');
        }
        this.hideFn();
      },
      hideFn(){
        this.showList = false;
      },
      showActionList(){
        setTimeout(()=>{
          this.$emit('showActionList');
          this.showList = true;
        }, 100)
      },
      async chooseImg (type) {
        let url = await this.API.common.uploadImg(type);
        this.updateImgUrl({url, valueName: this.valueName})
        this.$emit('setUpImage', {url, valueName: this.valueName});
      },
      doClick(){
        setTimeout(()=>{
          this.$emit('doClick', this.imgUrl, this.valueName);
        }, 100)
      }
    },
    mounted(){
    }
  }
</script>
<style lang="scss">
.page{
  width:160px;height:160px;margin:auto;
  .weui-uploader__imgUrl{width:160px;height:160px;position: relative;
    image{width:160px;height:160px;vertical-align: middle;border:1px dashed #eee;}
  }
  .remove{width:100%;height:100%;position: absolute;top:0;left:0;background-color:rgba(0,0,0,0.3);text-align: center;
    image{width:40px;height:40px;}
  }
  .weui-uploader__input-box,.weui-uploader__input{width:160px;height:160px;border:1px dashed #eee;}
}
 @keyframes moveUp {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 0;
    }
  }
  @keyframes moveDown {
    0% {
      bottom: 0;
    }
    100% {
      bottom: -100%;
    }
  }
  .pick_bg {width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: rgba(0,0,0,.5); z-index: 1; }
  .pick_fixed {
    width:100%;  background: #f7f7f7; position: fixed; left: 0; bottom: -350rpx; z-index: 10;
    &.move {animation: moveUp 0.2s ease-out; animation-fill-mode: forwards;}
    &.moveDown {animation: moveDown 0.2s ease-out; animation-fill-mode: forwards; }
    .pick_item {
      width: 100%; height: 105rpx; line-height: 105rpx; border-bottom:1px solid #E5E5E5; text-align: center; font-size: 32rpx; color: #333; background: #fff;
      &:last-child {border-bottom:none;};
    }
    .cancel {width: 100%; height: 105rpx; line-height: 105rpx; font-size: 32rpx; color: #333; background: #fff; text-align: center;}
  }
</style>
