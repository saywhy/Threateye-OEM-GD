<template>
  <el-col class="vm-move-threat">
    <el-table class="common-table"
              ref="multipleTable"
              @row-click="detail_click"
              :data="tableData">
      <el-table-column label="告警时间"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.alert_time | time}}
        </template>
      </el-table-column>
      <el-table-column prop="category"
                       label="告警类型"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="indicator"
                       label="威胁指标"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="src_ip"
                       label="源地址"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="dest_ip"
                       label="目的地址"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="application"
                       label="应用"
                       width="60"
                       show-overflow-tooltip></el-table-column>
      <el-table-column label="威胁等级"
                       show-overflow-tooltip>
        <template slot-scope="scope">
                <span class="btn_alert_background"
                      :class="{'high_background':scope.row.degree =='高',
                      'mid_background':scope.row.degree =='中',
                      'low_background':scope.row.degree =='低'}">
                  {{ scope.row.degree | degree_sino }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bom-right',
  props: {
    bom_right: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tableData () {
      let tableData = this.bom_right;
      return tableData;
    }
  },
  methods: {
    //进入详情页面
    detail_click (val) {
      this.$router.push({ path: "/detail/network", query: { detail: val.id, type: 'alert' } });
    },
  }
}
</script>
<style lang="less">
</style>
