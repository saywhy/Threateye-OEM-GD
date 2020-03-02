<template>
  <el-col class="vm-move-threat">
    <el-table class="common-table" ref="multipleTable" :data="tableData">
      <el-table-column prop="id" label="排名" width="40" align="center"></el-table-column>
      <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="category" label="威胁类型" width="100"></el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'bom-left',
    props: {
      bom_left: {
        type: Array,
        default:() => []
      }
    },
    computed:{
      tableData(){
        let tableData = this.bom_left;
        let that = this;
        tableData.map(function (v,k) {
           that.$set(v,'id',k+1);
        });
        return tableData;
      }
    }
  }
</script>
<style lang="less">
</style>
