<template>
  <div id="fault_log">
    <div class="fault_top">
      <el-button class="btn_i">故障检测</el-button>
      <el-button class="btn_i">下载</el-button>
      <el-button class="btn_o">删除</el-button>
    </div>
    <div class="fault_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="fault_log.data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="alert_detail">
        <el-table-column label="全选"
                         prop="type"
                         width="50">
        </el-table-column>
        <el-table-column type="selection"
                         width="50">
        </el-table-column>
        <el-table-column prop="time"
                         label="时间"
                         width="200"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="file"
                         label="日志文件"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="fault_log.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="fault_log.count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "fault_log",
  data () {
    return {
      fault_log: {
        data: [
          {
            time: '2019.11.03 15:24:55',
            file: 'wdjawljjdasjdjkadaolsdjaksdjassdhsaldasdhaakjshda',
          }
        ],
        pageNow: 1,
        count: 1002,
      }

    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () { },

  methods: {
    add_box () {
    },
    edit_box () {
    },
    alert_detail () { },
    handleSelectionChange () { },
    handleSizeChange () { },
    handleCurrentChange () { },
    closed_add_box () {
    },
    closed_edit_box () {
    }
  }
};
</script>

<style scoped lang="less">
#fault_log {
  text-align: left;
  .fault_top {
    margin-bottom: 24px;
    .btn_i {
      width: 148px;
      height: 42px;
      color: #fff;
      background: #0070ff;
    }
    .btn_o {
      width: 148px;
      height: 42px;
      color: #0070ff;
      border-color: #0070ff;
      background: #fff;
    }
  }
  .fault_table {
    padding-right: 24px;
  }
  .pagination_box {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#fault_log {
}
</style>
