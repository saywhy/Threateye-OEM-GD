<template>
  <div id="syslog_set">
    <div class="search_box">
      <el-button class="btn_i"
                 @click="open_add">添加SYSLOG配置</el-button>
    </div>
    <div class="syslog_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="syslog_set.data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="alert_detail">
        <el-table-column prop="ip"
                         label="Syslog服务器IP"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="port"
                         label="端口"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="transport"
                         label='传输协议'
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status"
                         label='状态'
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='edit_box(scope.row)'>编辑</el-button>
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='del_box(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="syslog_set.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="syslog_set.count">
      </el-pagination>
    </div>
    <!-- 添加p配置 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="syslog_pop.add.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加SYSLOG配置</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_top">
            <span>是否启用:</span>
            <el-switch v-model="syslog_pop.add.switch">
            </el-switch>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">SYSLOG服务器IP</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入SYSLOG服务器IP"
                      v-model="syslog_pop.add.ip"
                      clearable>
            </el-input>
          </div>
        </div>
        <div class="content_space"></div>
        <div class="content_item">
          <div class="item_top">
            <span>状态:</span>
            <el-radio v-model="syslog_pop.add.radio"
                      label="1"
                      class="r_radio_item">UDP</el-radio>
            <el-radio v-model="syslog_pop.add.radio"
                      label="2"
                      class="r_radio_item">DCP</el-radio>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">端口</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入端口"
                      v-model="syslog_pop.add.port"
                      clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑配置 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="syslog_pop.edit.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑SYSLOG配置</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_top">
            <span>是否启用:</span>
            <el-switch v-model="syslog_pop.edit.switch">
            </el-switch>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">SYSLOG服务器IP</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入SYSLOG服务器IP"
                      v-model="syslog_pop.edit.ip"
                      clearable>
            </el-input>
          </div>
        </div>
        <div class="content_space"></div>
        <div class="content_item">
          <div class="item_top">
            <span>状态:</span>
            <el-radio v-model="syslog_pop.edit.radio"
                      label="1"
                      class="r_radio_item">UDP</el-radio>
            <el-radio v-model="syslog_pop.edit.radio"
                      label="2"
                      class="r_radio_item">DCP</el-radio>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">端口</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入端口"
                      v-model="syslog_pop.edit.port"
                      clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import vmEmergePicker from "@/components/common/vm-emerge-picker";
export default {
  components: {
    vmEmergePicker,
  },
  name: "syslog_set",
  data () {
    return {
      syslog_set: {
        data: [{
          ip: '192.168.1.184',
          port: '514',
          transport: 'udp',
          status: '启用',
        }],
        pageNow: 1,
        count: 1002,
      },
      syslog_pop: {
        add: {
          show: false,
          switch: true,
          radio: '2',
          ip: '',
          port: ''
        },
        edit: {
          show: false,
          switch: true,
          radio: '2',
          ip: '',
          port: ''
        }
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
    del_box () {
    },
    alert_detail () { },
    handleSelectionChange () { },
    handleSizeChange () { },
    handleCurrentChange () { },
    open_add () {
      this.syslog_pop.add.show = true
    },
    edit_box () {
      this.syslog_pop.edit.show = true
    },
    closed_add_box () {
      this.syslog_pop.add.show = false
    },
    closed_edit_box () {
      this.syslog_pop.edit.show = false
    }
  }
};
</script>

<style scoped lang="less">
#syslog_set {
  text-align: left;
  .search_box {
    margin-bottom: 24px;
    .btn_i {
      padding: 0;
      width: 177px;
      height: 42px;
      background: #0070ff;
      color: #fff;
    }
  }
  .btn_edit {
    padding: 0;
    background: #5389e0;
    border-radius: 2px;
    width: 72px;
    height: 30px;
  }
  .syslog_table {
    padding-right: 24px;
  }
  .pagination_box {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
<style lang='less'>
@import '../../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../../assets/css/less/reset_css/reset_pop.less';
@import '../../../../../assets/css/less/report_less/rewrite_radio.less';
#syslog_set {
  .add_box {
    .el-dialog {
      width: 840px;
      .content {
        display: flex;
        .content_space {
          width: 20px;
        }
        .content_item {
          flex: 1;
          .item_top {
            margin: 37px 0;
          }
        }
      }
      .btn_box {
        margin-top: 36px;
      }
    }
    .el-switch__core {
      width: 40px !important;
    }
  }
}
</style>