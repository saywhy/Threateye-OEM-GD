<template>
  <div id="audit_log">
    <div class="search_box">
      <el-input class="search_key"
                placeholder="搜索关键词"
                v-model="key"
                clearable>
        <i slot="prefix"
           class="el-input__icon el-icon-search"></i>
      </el-input>
      <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>
      <el-button class="btn_i"> 搜索</el-button>
      <span class="reset">重置</span>
      <el-button class="btn_right">下载</el-button>
    </div>
    <p class="line"></p>
    <div class="audit_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="audit_log.data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="alert_detail">
        <el-table-column prop="index"
                         label="序号"
                         width="50"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="time"
                         label="时间"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="user"
                         label="用户标识"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description"
                         label='描述'
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="host_ip"
                         label='主机地址'
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="audit_log.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="audit_log.count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vmEmergePicker from "@/components/common/vm-emerge-picker";
export default {
  components: {
    vmEmergePicker,
  },
  name: "audit_log",
  data () {
    return {
      key: '',
      audit_log: {
        data: [{
          index: '01',
          time: '2019-11-12 22:09:55',
          user: 'admin',
          description: '删除yara文件失败，原因为：请求超时',
          host_ip: '127.0.0.1',
        }],
        pageNow: 1,
        count: 1002,
      },
      changeTime: ''
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
#audit_log {
  .search_box {
    .search_key {
      width: 240px;
      height: 38px;
    }
    .btn_i {
      margin-left: 24px;
      padding: 0;
      width: 102px;
      height: 38px;
      background: #0070ff;
      color: #fff;
    }
    .btn_right {
      padding: 0;
      width: 148px;
      height: 38px;
      background: #0070ff;
      color: #fff;
      float: right;
      margin-right: 24px;
    }

    .reset {
      margin-left: 24px;
      font-size: 16px;
      color: #0070ff;
    }
  }
  .line {
    margin: 16px 0 24px 0;
    width: 100%;
    height: 1px;
    background-color: #ececec;
  }
  .audit_table {
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
#audit_log {
}
</style>
