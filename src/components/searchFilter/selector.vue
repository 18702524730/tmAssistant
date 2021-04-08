<template>
  <div class="selector_boxs selector_open">
    <div class="row-center selector_box">
      <div class="row-center filter" @click="showPanel(item, index)" v-for="(item, index) in list" :key="index">
        <span>{{(item.selected && item.selected.name) || item.options && item.options[0].name}}</span>
        <img src="~assets/img/find/arrow_down.png">
      </div>
    </div>
    <div class="selector_option" :class="{'show': isShow}">
      <span :class="{cur: curIndex === idx}" v-for="(it, idx) in curPanelList.options" :key="idx" @click="change(curPanelList.key, it, idx, curPanelIndex)">{{it.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      isShow: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        /*isShow: false,
        list: [
          {
            name: '所有专利',
            key: 'key',
            selected: {
              name: '发明专利',
              id: 1
            },
            options: [
              {
                name: '发明专利',
                id: 1
              },
              {
                name: '实用新型专利',
                id: 2
              },
              {
                name: '外观设计专利',
                id: 3
              },
            ]
          },
          {
            name: '所有单位',
            options: [
              {
                name: '发明专利',
                id: 1
              },
              {
                name: '实用新型专利',
                id: 2
              },
              {
                name: '外观设计专利',
                id: 3
              },
            ]
          }
        ],*/
        curIndex: '',
        curPanelList: [],
        curPanelIndex: ''
      }
    },
    methods: {
      showPanel(item, index) {
        this.curIndex = '';
        this.$emit('update:isShow', true);
        this.curPanelIndex = index;
        this.curPanelList = this.list[index];
        let selected = this.curPanelList.selected;
        if (selected) {
          this.curPanelList.options.some((it, idx) => {
            if (it.id == selected.id) {
              this.curIndex = idx;
              return true;
            }
          });
        }
      },
      change (key, item, idx, index) {
        this.curIndex = idx;
        this.curPanelList.selected = item;
        this.$emit('change', key, item, index);
        this.$emit('update:isShow', false);
      },
    },
    watch: {
      isShow() {
        if (!this.isShow) {
          this.curIndex = '';
        }
      }
    }
  }
</script>

<style lang="scss">
.selector_boxs{
  font-size: 28px;background-color: #fff;height: 80px;position: relative;z-index: 2;
  .selector_box {
    background-color: #fff;position: relative;z-index: 2;height: 80px;padding: 20px 0;
    .filter{
      flex: 1;height: 40px;
      img{width: 40px;height: 40px;}
    }
  }
  .selector_option{
    position: relative;z-index: 1;padding: 25px 40px 15px 40px;border-top: 1px solid #eee;background-color: #fff;transform: translateY(-100%);
    animation: moveUp 0.2s ease-out;max-height:660px;overflow-y:auto;
    span{display: block;height: 70px;line-height: 70px;}
    .cur{color: #3576FF;background: #fff url(~assets/img/find/gou.png) right center no-repeat;background-size: 30px 24px;}
    span:last-child{margin-bottom: 0;}
  }
  .show{transform: translateY(0);animation: moveDown 0.2s ease-out;}
}
@keyframes moveDown {
  from {
    transform: translateY(-100%)
  }
  to {
    transform: translateY(0)
  }
}
@keyframes moveUp {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(-100%)
    }
  }
</style>
