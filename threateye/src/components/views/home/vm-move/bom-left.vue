<template>
  <el-col class="vm-move-threat">
    <el-table class="common-table" ref="multipleTable" :data="tableData">
      <el-table-column prop="pid" label="排名" width="40" align="center"></el-table-column>
      <el-table-column prop="norm" label="威胁指标" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="type" label="威胁类型" width="90"></el-table-column>
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
          norm: '82.202.221.163',
          type: '僵尸网络C&C'
        },{
          pid:2,
          norm: '82.202.221.163',
          type: '僵尸网络C&C'
        }, {
          pid:3,
          norm: 'Trojan-DownloasxAASDDASderDownloasxAASDDASder',
          type: '僵尸网络C&C'
        }, {
          pid:4,
          norm: 'DownloasxAASDDASderDownloasxAASDDASder',
          type: '僵尸网络C&C'
        },{
          pid:5,
          norm: 'reaDownloasxAASDDASderDownloasxAASDDASder',
          type: '僵尸网络C&C'
        }]
      }
    }
  }
</script>
<style lang="less">
</style>
