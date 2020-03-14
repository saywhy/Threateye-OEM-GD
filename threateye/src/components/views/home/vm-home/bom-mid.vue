<template>
  <el-col class="vm-move-threat vm-move-threat-middle">
    <el-table class="common-table"
              ref="multipleTable"
              @row-click="detail_click"
              :data="tableData">
      <el-table-column prop="id"
                       label="排名"
                       width="60"
                       align="center"></el-table-column>
      <el-table-column prop="asset_ip"
                       label="风险资产"
                       show-overflow-tooltip></el-table-column>
      <el-table-column label="风险指数">
        <template slot-scope="scope">
          <el-progress :show-text="false"
                       :percentage="scope.row.indicator"></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bom-mid',
  props: {
    bom_mid: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tableData () {
      let tableData = this.bom_mid;

      /*tableData = [
        {asset_ip:'192.168.1.193',indicator:21},
        {asset_ip:'192.168.1.192',indicator:50},
      ]*/

      let that = this;
      tableData.map(function (v, k) {
        that.$set(v, 'id', k + 1);
      });
      return tableData;
    }
  },
  methods: {
    //进入详情页面
    detail_click (val) {
      console.log(val);
      this.$router.push({        path: '/detail/assets', name: 'detail_assets',
        query: { asset_ip: val.asset_ip, status: val.status }      });
    },
  }
}
</script>
<style lang="less">
</style>
