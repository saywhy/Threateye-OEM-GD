<template>
  <el-col class="vm-move-threat vm-move-threat-middle">
    <el-table class="common-table" ref="multipleTable" :data="tableData">
      <el-table-column prop="pid" label="排名" width="40" align="center"></el-table-column>
      <el-table-column prop="assets" label="风险资产" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="index" label="风险指数">
        <template slot-scope="scope">
          <div class="sc_index"></div>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'bom-left',
    data() {
      return {
        tableData: [{
          pid:1,
          assets: '192.168.1.193',
          index: '6'
        },{
          pid:2,
          assets: '192.168.1.193',
          index: '8'
        }, {
          pid:3,
          assets: '192.168.1.193',
          index: '7'
        }, {
          pid:4,
          assets: '192.168.1.193',
          index: '4'
        },{
          pid:5,
          assets: '192.168.1.193',
          index: '5'
        }]
      }
    }
  }
</script>
<style lang="less">
</style>
