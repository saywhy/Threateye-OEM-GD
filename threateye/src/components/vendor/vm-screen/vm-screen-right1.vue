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
          <h2>3248</h2>
          <h5>威胁次数</h5>
        </div>
        <ul class="state-list">

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
    height: 50px;
    line-height: 50px;
    text-align: left;
    .t-info{
      margin-right: 20px;
      .t-arrow{
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 8px;
        background-size: 18px;
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
    border: 1px solid red;
    height: 190px;
    position: relative;
    .disk{
      width: 162px;
      height: 162px;
      margin: 14px;
      background-image: url("../../../assets/images/screen/state/disk.png");
      background-repeat: no-repeat;
      background-size: 162px;
    }
    .state-list{
      
    }
  }
}
</style>
