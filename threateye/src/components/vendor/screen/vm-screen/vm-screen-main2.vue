<template>
    <ul class="vm-screen-main2">
      <li v-for="(item,index) in data" :key="index" class="item">
        <i class="t-arrow"></i><span>{{item.content}}</span>
        <span class="t-time">{{item.time}}</span>
      </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main2",
      data(){
          return{
            data:[
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'}
            ]
          }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main2{
  padding: 0 16px 16px;
  .item{
    height: 56px;
    border: 1px solid #007AFF;
    margin-bottom: 6px;
    background-image:
      linear-gradient(90deg, rgba(0,122,255,0.36) 0%,
      rgba(0,122,255,0.00) 100%);
    text-align: left;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    padding: 5px 16px;
    .t-arrow{
      display: inline-block;
      background-image: url("../../../../assets/images/screen/aside-arrow.png");
      width: 14px;
      height: 14px;
      margin-right: 8px;
      background-size: 14px;
    }
    .t-time{
      display: block;
      opacity: 0.36;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #FFFFFF;
    }
  }
}
</style>
