<template>
    <div class="vm-screen-right1">
      <div class="state-top">
        <span class="t-info">
          <i class="t-arrow"></i><span class="t-name">攻击源：124</span>
        </span>
        <span class="t-info">
          <i class="t-arrow"></i><span class="t-name">攻击目标：124</span>
        </span>
      </div>
      <div class="state-content">
        <div class="disk">
          <h2 class="disk-num">3248</h2>
          <h5 class="disk-times">威胁次数</h5>
        </div>
        <ul class="state-list">
          <li class="item it0">
            <i class="t-arrow"></i><span class="t-name">漏洞风险</span>
            <span class="t-num">87</span>
          </li>
          <li class="item it1">
            <i class="t-arrow"></i><span class="t-name">弱密码</span>
            <span class="t-num">11</span>
          </li>
          <li class="item it2 active">
            <i class="t-arrow"></i><span class="t-name">Web文明传输</span>
            <span class="t-num">812</span>
          </li>
          <li class="item it3">
            <i class="t-arrow"></i><span class="t-name">配置风险</span>
            <span class="t-num">124</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-right1",
      data(){
          return{
            data:[
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'}
            ]
          }
      },
      mounted() {

      },
      methods:{

      }
    }
</script>

<style scoped lang="less">
.vm-screen-right1{
  padding: 0 16px 16px;
  .state-top{
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: left;
    .t-info{
      margin-right: 20px;
      .t-arrow{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 8px;
        background-size: 14px;
        vertical-align: text-top;
        background-image: url("../../../assets/images/screen/aside-arrow.png");
      }
      .t-name{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
      }
    }
  }
  .state-content{
    height: 190px;
    position: relative;
    border: 1px solid #000f40;
    .disk{
      width: 162px;
      height: 162px;
      margin: 14px 0;
      background-image: url("../../../assets/images/screen/state/disk.png");
      background-repeat: no-repeat;
      background-size: 162px;
      padding: 45px 0;
      .disk-num{
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #00D7E9;
      }
      .disk-times{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
    .state-list{
      position: absolute;
      top:14px;
      left: 136px;
      color: #fff;
      .item{
        text-align: left;
        width: 328px;
        height: 39px;
        line-height: 39px;
        background-repeat: no-repeat;
        background-size: 328px 39px;
        margin-bottom: 2px;
        position: relative;
        cursor: pointer;
        .t-arrow{
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 8px;
          background-size: 14px;
          vertical-align: text-top;
          background-image: url("../../../assets/images/screen/aside-arrow.png");
        }
        .t-name{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
        }
        .t-num{
          position: absolute;
          top: 3px;
        }
        &.it0{
          padding-left: 40px;
          background-image: url("../../../assets/images/screen/state/st0.png");
          .t-num{
            right: 56px;
          }
        }
        &.it1{
          padding-left: 50px;
          background-image: url("../../../assets/images/screen/state/st1.png");
          .t-num{
            right: 30px;
          }
        }
        &.it2{
          padding-left: 50px;
          background-image: url("../../../assets/images/screen/state/st2.png");
          .t-num{
            right: 30px;
          }
        }
        &.it3{
          padding-left: 40px;
          background-image: url("../../../assets/images/screen/state/st3.png");
          .t-num{
            right: 56px;
          }
        }
        &.active{
          &.it0{
            background-image: url("../../../assets/images/screen/state/st0_a.png");
          }
          &.it1{
            background-image: url("../../../assets/images/screen/state/st1_a.png");
          }
          &.it2{
            background-image: url("../../../assets/images/screen/state/st2_a.png");
          }
          &.it3{
            background-image: url("../../../assets/images/screen/state/st3_a.png");
          }
          .t-arrow{
            background-image: url("../../../assets/images/screen/aside-arrow.png");
          }
        }
      }

    }
  }
}
</style>
