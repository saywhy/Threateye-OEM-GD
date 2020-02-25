<template>
  <div id="role_management">
    <div class="role_title">
      <el-button type="primary"
                 class="btn_i"
                 @click="add_box">新增</el-button>
      <el-button type="primary"
                 class="btn_o">删除</el-button>
    </div>
    <div class="role_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="role_data.data"
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
        <el-table-column prop="name"
                         label="角色名称"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="describe"
                         label="角色描述"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="time"
                         label="创建时间"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="founder"
                         label="创建人"
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
                     :current-page="role_data.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="role_data.count">
      </el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="role_state.add">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加角色</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">角色名称</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入用户名"
                    v-model="role_add.name"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色描述</span>
          </p>
          <el-input class="select_box"
                    type="textarea"
                    :rows="2"
                    autosize
                    resize='none'
                    placeholder="请输入角色描述"
                    v-model="role_add.describe">
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
               :visible.sync="role_state.edit">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑角色</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">角色名称</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入用户名"
                    v-model="role_edit.name"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色描述</span>
          </p>
          <el-input class="select_box"
                    type="textarea"
                    :rows="4"
                    autosize
                    resize='none'
                    placeholder="请输入角色描述"
                    v-model="role_edit.describe">
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
  name: "role_management",
  data () {
    return {
      role_data: {
        data: [
          {
            index: "01",
            name: "admin",
            describe: "系统管理员",
            founder: "system",
            time: "2019.11.03 15:24"
          }
        ],
        pageNow: 1,
        count: 102
      },
      role_state: {
        add: false,
        edit: false
      },
      role_add: {
        name: "",
        describe: ""
      },
      role_edit: {
        name: "",
        describe: ""
      }
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data();
  },

  methods: {
    get_data () {
      this.$axios.get('/api/yiiapi/user/role-list')
        .then(response => {
          console.log(response);
          this.role_data = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    add_box () {
      this.role_state.add = true;
    },
    edit_box () {
      this.role_state.edit = true;
    },
    alert_detail () { },
    handleSelectionChange () { },
    handleSizeChange () { },
    handleCurrentChange () { },
    closed_add_box () {
      this.role_state.add = false;
    },
    closed_edit_box () {
      this.role_state.edit = false;
    }
  }
};
</script>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#role_management {
  .el-dialog {
    width: 440px;
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
            min-height: 38px;
            margin-top: 6px;
            .el-input__inner {
              background: #f8f8f8;
              border: 0;
            }
            .el-textarea__inner {
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
#role_management {
  padding-right: 24px;
  .role_title {
    margin-bottom: 24px;
    .btn_i {
      background: #0070ff;
      color: #fff;
      width: 148px;
      height: 42px;
    }

    .btn_o {
      background: #fff;
      border-color: #0070ff;
      color: #0070ff;
      width: 148px;
      height: 42px;
    }
  }
  .role_table {
    .btn_edit {
      padding: 0;
      background: #5389e0;
      border-radius: 2px;
      width: 72px;
      height: 30px;
    }
  }
  .pagination_box {
    margin-top: 24px;
    text-align: center;
  }
}
</style>
