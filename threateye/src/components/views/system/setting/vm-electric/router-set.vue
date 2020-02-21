<template>
  <div id="router_set">
    <div class="router_top">
      <el-button type="primary"
                 class="btn_i"
                 @click="add_box">新增</el-button>
      <el-button type="primary"
                 class="btn_i">删除</el-button>
      <el-button type="primary"
                 class="btn_o">刷新</el-button>
    </div>
    <div class="router_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="router_data.data"
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
        <el-table-column prop="index"
                         label="序号"
                         width="50"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="des_addr"
                         label="目的地址"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="subnet_mask"
                         label="子网掩码"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="download_addr"
                         label="下载地址"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='edit_box(scope.row)'>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="router_data.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="router_data.count">
      </el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="router_state.add">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">新增路由</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">目的地址</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入目的地址"
                    v-model="router_add.des_addr"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">子网掩码</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入子网掩码"
                    v-model="router_add.subnet_mask"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">下载地址</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入下载地址"
                    v-model="router_add.download_addr"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="router_state.edit">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑路由</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">目的地址</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入目的地址"
                    v-model="router_edit.des_addr"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">子网掩码</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入子网掩码"
                    v-model="router_edit.subnet_mask"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">下载地址</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入下载地址"
                    v-model="router_edit.download_addr"
                    clearable>
          </el-input>
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
export default {
  name: "router_set",
  data () {
    return {
      router_data: {
        data: [
          {
            index: "01",
            des_addr: "0.0.0.0",
            subnet_mask: "0.0.0.0",
            download_addr: "192.168.88.1"
          },
          {
            index: "02",
            des_addr: "0.0.0.0",
            subnet_mask: "0.0.0.0",
            download_addr: "192.168.88.1"
          },
          {
            index: "03",
            des_addr: "0.0.0.0",
            subnet_mask: "0.0.0.0",
            download_addr: "192.168.88.1"
          },
          {
            index: "04",
            des_addr: "0.0.0.0",
            subnet_mask: "0.0.0.0",
            download_addr: "192.168.88.1"
          },
          {
            index: "05",
            des_addr: "0.0.0.0",
            subnet_mask: "0.0.0.0",
            download_addr: "192.168.88.1"
          }
        ],
        pageNow: 1,
        count: 102,
        pageNow: 1
      },
      router_state: {
        add: false,
        edit: false,
        import: false
      },
      router_add: {
        des_addr: "",
        subnet_mask: "",
        download_addr: ""
      },
      router_edit: {
        des_addr: "",
        subnet_mask: "",
        download_addr: ""
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
    alert_detail () { },

    handleSelectionChange () { },
    handleSizeChange () { },
    handleCurrentChange () { },
    add_box () {
      this.router_state.add = true;
    },
    edit_box (row) {
      this.router_state.edit = true;
      console.log(row);
    },
    closed_add_box () {
      this.router_state.add = false;
    },
    closed_edit_box () {
      this.router_state.edit = false;
    }
  }
};
</script>
<style lang='less'>
@import '../../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../../assets/css/less/reset_css/reset_pop.less';
#router_set {
  .el-dialog {
    width: 440px !important;
    .el-dialog__body {
      width: 440px;
      .content {
        padding: 24px 0;
        .content_item {
          margin-bottom: 24px;
          .title {
            font-size: 12px;
            color: #999999;
          }
          .select_box {
            width: 100%;
            height: 38px;
            margin-top: 6px;
            .el-input__inner {
              background: #f8f8f8;
              border: 0;
            }
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
#router_set {
  padding-right: 24px;
  .router_top {
    .btn_i {
      padding: 0;
      background: #0070ff;
      color: #fff;
      width: 148px;
      height: 42px;
    }

    .btn_o {
      padding: 0;
      background: #fff;
      border-color: #0070ff;
      color: #0070ff;
      width: 148px;
      height: 42px;
    }
  }
  .router_table {
    margin-top: 24px;
    .btn_edit {
      padding: 0;
      background: #5389e0;
      border-radius: 2px;
      width: 72px;
      height: 30px;
    }
    .pagination_box {
      margin-top: 24px;
      text-align: center;
    }
  }
}
</style>
