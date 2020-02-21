<template>
  <div class="vm-main-tabs" v-cloak>
    <el-row :gutter="20" type="flex" class="va-main-1" justify="space-between">
      <el-col v-for="(item,index) in tabsData.data" class="va-tabs" :key="index"
              :class="{active:index == tabsData.activeIndex}">
        <div class="va-tabs-item" @click="tabsData.activeIndex = index">
          <i class="vat-img"></i>
          <span class="vat-title">{{item.title}}</span>
          <span class="vat-count">{{item.count}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-main-tabs',
    data(){
      return {
        tabsData: {
          activeIndex: 0,
          data: [
            {title: '综合评分', count: 88},
            {title: '告警总数', count: 167},
            {title: '七天内新告警树', count: 8},
            {title: '风险资产总数', count: 136},
            {title: '七天内新风险资产数', count: 12}
          ]
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-main-tabs{
    .va-tabs{
      .va-tabs-item{
        background: #fff;
        border-radius: 4px;
        height: 124px;
        line-height: 124px;;
        text-align: left;
        position: relative;
        cursor: pointer;
        .vat-img{
          width: 36px;
          height: 36px;
          background-size: 36px;
          margin-left: 10px;
          display: inline-block;
          vertical-align: middle;
          background-repeat: no-repeat;
        }
        .vat-title{
          width: 110px;
          font-size: 18px;
          color: #333;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
          font-family: PingFangSC-Regular;
        }
        .vat-count{
          position: absolute;
          font-family: PingFangSC-Medium;
          font-size: 48px;
          color: #333;
          text-align: right;
          right: 10px;
        }
      }
      &:nth-child(1){
        .vat-img{
          background-image: url("../../../../assets/images/home/tabs/tabs1.png");
        }
      }
      &:nth-child(2){
        .vat-img{
          background-image: url("../../../../assets/images/home/tabs/tabs2.png");
        }
      }
      &:nth-child(3){
        .vat-img{
          background-image: url("../../../../assets/images/home/tabs/tabs3.png");
        }
      }
      &:nth-child(4){
        .vat-img{
          background-image: url("../../../../assets/images/home/tabs/tabs4.png");
        }
      }
      &:nth-child(5){
        .vat-img{
          background-image: url("../../../../assets/images/home/tabs/tabs5.png");
        }
      }

      &.active{
        .va-tabs-item{
          background-color: #5389E0;
          box-shadow: 0 0 10px 6px rgba(46,63,96,0.16);
          background-size: inherit;
          background-repeat: no-repeat;
          background-position: bottom right;
          .vat-title{
            color: #fff;
          }
          .vat-count{
            color: #fff;
          }
        }
        &:nth-child(1){
          .va-tabs-item{
            background-image: url("../../../../assets/images/home/tabsBg/bg1.png");
            .vat-img{
              background-image: url("../../../../assets/images/home/tabsAt/at1.png");
            }
          }
        }
        &:nth-child(2){
          .va-tabs-item{
            background-image: url("../../../../assets/images/home/tabsBg/bg2.png");
            .vat-img{
              background-image: url("../../../../assets/images/home/tabsAt/at2.png");
            }
          }
        }
        &:nth-child(3){
          .va-tabs-item{
            background-image: url("../../../../assets/images/home/tabsBg/bg3.png");
            .vat-img{
              background-image: url("../../../../assets/images/home/tabsAt/at3.png");
            }
          }
        }
        &:nth-child(4){
          .va-tabs-item{
            background-image: url("../../../../assets/images/home/tabsBg/bg4.png");
            .vat-img{
              background-image: url("../../../../assets/images/home/tabsAt/at4.png");
            }
          }
        }
        &:nth-child(5){
          .va-tabs-item{
            background-image: url("../../../../assets/images/home/tabsBg/bg5.png");
            .vat-img{
              background-image: url("../../../../assets/images/home/tabsAt/at5.png");
            }
          }
        }
      }
    }
  }
</style>
