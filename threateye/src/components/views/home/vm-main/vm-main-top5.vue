<template>
  <el-col class="vm-main-top5">
     <table class="vm-thead">
       <thead>
          <th>序号</th>
          <th>IP</th>
          <th>IP标签</th>
          <th>关联威胁</th>
          <th>威胁等级</th>
       </thead>
     </table>
    <ul class="vm-list">
      <li class="item" v-for="(item,index) in tableData" :key="index">
        <span class="t_span t_id">{{item.id}}</span>
        <span class="t_span t_ip">{{item.ip}}</span>
        <span class="t_span t_label">
          <button class="t_label_btn" v-for="(it,idx) in item.label" :key="idx">{{it}}</button>
        </span>
        <span class="t_span t_threat">{{item.threat}}</span>
        <span class="t_span t_rank">{{item.rank}}</span>
      </li>
    </ul>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'vm-main-top5',
    data() {
      return {
        tableData: [{
          id:'01',
          ip: '192.163.2.2',
          label: ['恶意地址','恶意地址','恶意地址'],
          threat: '木马/Virut',
          rank:'高危'
        }, {
          id:'02',
          ip: '192.163.2.2',
          label: ['恶意地址','恶意地址','恶意地址'],
          threat: '木马/Virut',
          rank:'高危'
        }, {
          id:'03',
          ip: '192.163.2.2',
          label: ['恶意地址','恶意地址','恶意地址'],
          threat: '木马/Virut',
          rank:'高危'
        }, {
          id:'04',
          ip: '192.163.2.2',
          label: ['恶意地址','恶意地址','恶意地址'],
          threat: '木马/Virut',
          rank:'高危'
        },{
          id:'05',
          ip: '192.163.2.2',
          label: ['恶意地址','恶意地址','恶意地址'],
          threat: '木马/Virut',
          rank:'高危'
        }]
      }
    }
  }
</script>
<style lang="less">
  .vm-main-top5{
    margin-top: 50px;
    .vm-thead{
      background: #F4F4F4;
      width: 100%;
      th{
        height: 36px;
        text-align: left;
        &:nth-child(1){
          width: 10%;
          text-align: center;
        }
        &:nth-child(2){
          width: 18%;
        }
        &:nth-child(3){
          width: 42%;
        }
        &:nth-child(4){
          width: 18%;
        }
        &:nth-child(5){
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
          font-size: 12px;
          text-align: left;
          font-family: PingFangSC-Regular;
          &.t_id{
            width: 10%;
            text-align: center;
          }
          &.t_ip{
            width: 18%;
          }
          &.t_label{
            width: 42%;
            .t_label_btn{
              margin-right: 5px;
              padding: 3px 5px 5px;
              background: #5389E0;
              border-radius: 2px;
              border-width: 0;
              outline: none;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FFFFFF;
            }
          }
          &.t_threat{
            width: 18%;
          }
          &.t_rank{
            width: 12%;
            color: #DC5F5F;
          }
        }
      }
    }
  }

</style>
