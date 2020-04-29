<template>
  <el-col class="vm-move-threat">
    <el-table class="common-table"
              ref="multipleTable"
              @row-click="detail_click"
              :row-style="{cursor:'pointer'}"
              @mousedown.native="mousedown"
              @mouseup.native="mouseup"
              :data="tableData">
      <el-table-column label="告警时间"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.alert_time | time}}
        </template>
      </el-table-column>
      <el-table-column prop="category"
                       label="告警类型"
                       show-overflow-tooltip>
        <template slot-scope="scope"
                  class="cursor_text">
          <span>{{ scope.row.category}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="indicator"
                       label="威胁指标"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="src_ip"
                       label="源地址"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="dest_ip"
                       label="目的地址"
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
  data () {
    return {
      detail_click_val: {},
      oldPositon: {
        x: '',
        y: ''
      },
      newPositon: {
        x: '',
        y: ''
      }
    }
  },
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
      this.detail_click_val = val
    },
    mousedown (event) {
      this.oldPositon = {
        x: '',
        y: ''
      }
      this.newPositon = {
        x: '',
        y: ''
      }
      this.oldPositon.x = event.clientX;
      this.oldPositon.y = event.clientY;
    },
    mouseup (event) {
      this.newPositon.x = event.clientX;
      this.newPositon.y = event.clientY;
      if (this.oldPositon.x == this.newPositon.x) {
        setTimeout(() => {
          this.$router.push({ path: "/detail/network", query: { detail: this.detail_click_val.id, type: 'alert' } });
        }, 10);
      } else {
        console.log('复制');
      }
    },
  }
}
</script>
<style lang="less">
</style>
