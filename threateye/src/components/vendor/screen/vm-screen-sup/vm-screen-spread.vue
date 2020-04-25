<template>
    <div class="vm-screen-spread">
      <ul class="spread-list">
        <li class="item">
          <div class="its it1">
            <h4 class="s_name">资产名称</h4>
            <h2 class="s_content">上汽荣威</h2>
          </div>
          <div class="its it2">
            <h4 class="s_name">资产数</h4>
            <h2 class="s_content">129,640</h2>
          </div>
          <div class="its it3">
            <h4 class="s_name">风险资产数</h4>
            <h2 class="s_content">3,690</h2>
          </div>
          <div class="its it4">
            <h4 class="s_name">外联资产数</h4>
            <h2 class="s_content">8,842</h2>
          </div>
          <div class="fs">
            <i class="fs-img"></i>
          </div>
        </li>
        <li class="item">
          <div class="its it1">
            <h4 class="s_name">资产名称</h4>
            <h2 class="s_content">上汽荣威</h2>
          </div>
          <div class="its it2">
            <h4 class="s_name">资产数</h4>
            <h2 class="s_content">129,640</h2>
          </div>
          <div class="its it3">
            <h4 class="s_name">风险资产数</h4>
            <h2 class="s_content">3,690</h2>
          </div>
          <div class="its it4">
            <h4 class="s_name">外联资产数</h4>
            <h2 class="s_content">8,842</h2>
          </div>
          <div class="fs">
            <i class="fs-img"></i>
          </div>
        </li>
        <li class="item">
          <div class="its it1">
            <h4 class="s_name">资产名称</h4>
            <h2 class="s_content">上汽荣威</h2>
          </div>
          <div class="its it2">
            <h4 class="s_name">资产数</h4>
            <h2 class="s_content">129,640</h2>
          </div>
          <div class="its it3">
            <h4 class="s_name">风险资产数</h4>
            <h2 class="s_content">3,690</h2>
          </div>
          <div class="its it4">
            <h4 class="s_name">外联资产数</h4>
            <h2 class="s_content">8,842</h2>
          </div>
          <div class="fs">
            <i class="fs-img"></i>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-spread"
    }
</script>

<style scoped lang="less">
.vm-screen-spread{
  .spread-list{
    font-size: 0;
    .item{
      width: 376px;
      height: 136px;
      display: inline-block;
      margin-bottom: 10px;
      position: relative;
      &:nth-child(odd){
        float: left;

      }
      &:nth-child(even){
        float: right;
      }
      .its{
        width: 186px;
        height: 66px;
        position: absolute;
        background-repeat: no-repeat;
        background-size: 186px 66px;
        &.it1{
          left: 0;
          top: 0;
          text-align: left;
          padding-left: 16px;
          background-image: url("../../../../assets/images/screen/spread/bg1.png");
        }
        &.it2{
          top: 0;
          right: 0;
          text-align: right;
          padding-right: 16px;
          background-image: url("../../../../assets/images/screen/spread/bg2.png");
        }
        &.it3{
          left: 0;
          bottom: 0;
          text-align: left;
          padding-left: 16px;
          background-image: url("../../../../assets/images/screen/spread/bg3.png");
        }
        &.it4{
          bottom: 0;
          right: 0;
          text-align: right;
          padding-right: 16px;
          background-image: url("../../../../assets/images/screen/spread/bg4.png");
        }
      }
      .fs{
        position: absolute;
        width: 32px;
        height: 32px;
        left: 172px;
        top: 52px;
        background-image: linear-gradient(180deg, #00D7E9 0%, #007AFF 100%);
        border-radius: 100%;
        padding: 6px;
        .fs-img{
          width: 20px;
          height: 20px;
          background-size: 20px;
          display: block;
          background-repeat: no-repeat;
          background-image: url("../../../../assets/images/screen/spread/fs.png");
        }
      }
      .s_name{
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
        height: 32px;
        line-height: 32px;
      }
      .s_content{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #00D6E9;
      }
    }
  }
}
</style>
