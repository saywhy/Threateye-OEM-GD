<template>
  <el-col class="vm-move-threat">
    <el-table class="common-table" ref="multipleTable" :data="tableData">
      <el-table-column prop="time" label="告警时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="告警类型" width="70" ></el-table-column>
      <el-table-column prop="norm" label="威胁指标" show-overflow-tooltip></el-table-column>
      <el-table-column prop="s_address" label="源地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="d_address" label="目的地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="apply" label="应用" show-overflow-tooltip></el-table-column>
      <el-table-column prop="rank" label="告警等级" width="70"></el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'bom-left',
    data() {
      return {
        tableData: [{
          time:'19.11.07 17:32:24',
          type: '钓鱼仿冒',
          norm: 'amazazonbdss.com',
          s_address:'192.168.110.124',
          d_address:'192.168.102',
          apply:'http',
          rank:'高危'
        },{
          time:'19.11.07 17:32:24',
          type: '钓鱼仿冒',
          norm: 'amazazonbdss.com',
          s_address:'192.168.110.124',
          d_address:'192.168.102',
          apply:'http',
          rank:'高危'
        }, {
          time:'19.11.07 17:32:24',
          type: '钓鱼仿冒',
          norm: 'amazazonbdss.com',
          s_address:'192.168.110.124',
          d_address:'192.168.102',
          apply:'http',
          rank:'高危'
        },{
          time:'19.11.07 17:32:24',
          type: '钓鱼仿冒',
          norm: 'amazazonbdss.com',
          s_address:'192.168.110.124',
          d_address:'192.168.102',
          apply:'http',
          rank:'高危'
        },{
          time:'19.11.07 17:32:24',
          type: '钓鱼仿冒',
          norm: 'amazazonbdss.com',
          s_address:'192.168.110.124',
          d_address:'192.168.102',
          apply:'http',
          rank:'高危'
        }]
      }
    }
  }
</script>
<style lang="less">
</style>
