<template>
  <el-col class="vm-move-threat">
    <el-table class="common-table" ref="multipleTable" :data="tableData">
      <el-table-column label="告警时间" width="140">
        <template slot-scope="scope">
             {{scope.row.alert_time | time}}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="告警类型" width="70" show-overflow-tooltip></el-table-column>
      <el-table-column prop="indicator" label="威胁指标" width="70" show-overflow-tooltip></el-table-column>
      <el-table-column prop="src_ip" label="源地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dest_ip" label="目的地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="application" label="应用" width="40"></el-table-column>
      <el-table-column prop="degree" label="告警等级" width="70"></el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'bom-right',
    props: {
      bom_right: {
        type: Array,
        default:() => []
      }
    },
    computed:{
      tableData(){
        let tableData = this.bom_right;
        return tableData;
      }
    }
  }
</script>
<style lang="less">
</style>
