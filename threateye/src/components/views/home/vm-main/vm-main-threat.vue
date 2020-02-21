<template>
  <el-col class="vm-main-threat">
     <table class="vm-thead">
       <thead>
          <th>告警时间</th>
          <th>告警类型</th>
          <th>威胁指标</th>
          <th>风险资产</th>
          <th>攻击阶段</th>
          <th>威胁等级</th>
       </thead>
     </table>
    <ul class="vm-list">
      <li class="item" v-for="(item,index) in tableData" :key="index">
        <span class="t_span t_time" :title="item.time">{{item.time}}</span>
        <span class="t_span t_type" :title="item.type">{{item.type}}</span>
        <span class="t_span t_target" :title="item.target">{{item.target}}</span>
        <span class="t_span t_capital" :title="item.capital">{{item.capital}}</span>
        <span class="t_span t_stage" :title="item.stage">{{item.stage}}</span>
        <span class="t_span t_rank" :title="item.rank">{{item.rank}}</span>
      </li>
    </ul>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'vm-main-threat',
    data() {
      return {
        tableData: [{
          time:'2019-11-07 17:32:24',
          type: '钓鱼仿冒',
          target: 'amazazonb.com',
          capital: 'amazazonb.com',
          stage: '垃圾邮件',
          rank:'高危'
        }, {
          time:'2019-11-07 17:32:24',
          type: '钓鱼仿冒',
          target: 'amazazonb.com',
          capital: '34534',
          stage: '提权',
          rank:'高危'
        }, {
          time:'2019-11-07 17:32:24',
          type: '垃圾邮件',
          target: 'werwer',
          capital: 'amazazonb.com',
          stage: '防御逃逸',
          rank:'高危'
        }, {
          time:'2019-11-07 17:32:24',
          type: '钓鱼仿冒',
          target: 'amazazonb.com',
          capital: '34534',
          stage: '提权',
          rank:'高危'
        },{
          time:'2019-11-07 17:32:24',
          type: '钓鱼仿冒',
          target: 'werwer',
          capital: 'amazazonb.com',
          stage: '防御逃逸',
          rank:'高危'
        }]
      }
    }
  }
</script>
<style lang="less">
  .vm-main-threat{
    margin-top: 50px;
    .vm-thead{
      background: #F4F4F4;
      width: 100%;
      th{
        height: 36px;
        text-align: left;
        &:nth-child(1){
          width: 25%;
        }
        &:nth-child(2){
          width: 15%;
          text-align: center;
        }
        &:nth-child(3){
          width: 18%;
        }
        &:nth-child(4){
          width: 18%;
        }
        &:nth-child(5){
          width: 12%;
        }
        &:nth-child(6){
          width: 12%;
        }
      }

    }
    .vm-list{
      .item{
        list-style: none;
        font-size: 0;
        height: 38px;
        line-height: 36px;
        border-bottom: 1px solid #ececec;
        .t_span{
          display: inline-block;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.t_time{
            width: 25%;
          }
          &.t_type {
            width: 15%;
            text-align: center;
          }

          &.t_target{
            width: 18%;
          }
          &.t_capital{
            width: 18%;

          }
          &.t_stage{
            width: 12%;
          }
          &.t_rank {
            width: 12%;
          }
        }
      }
    }
  }

</style>
