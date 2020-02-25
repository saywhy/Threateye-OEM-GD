<template>
  <div id="user_management">
    <div class="user_title">
      <el-button type="primary"
                 class="btn_i"
                 @click="add_box">新增</el-button>
      <el-button type="primary"
                 class="btn_o">删除</el-button>
    </div>
    <div class="user_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="user_data.data"
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
        <el-table-column type="index"
                         label="序号"
                         width="50"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="class"
                         label="部门"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="email_addr"
                         label="邮箱"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="role"
                         label="角色"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="creatorname"
                         label="创建人"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updated_at"
                         label="创建时间"
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
                     :current-page="user_data.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="user_data.count">
      </el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="user_state.add">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加用户</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">用户名</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入用户名"
                    v-model="user_add.username"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">密码</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入密码"
                    v-model="user_add.password"
                    show-password>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">部门</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入部门"
                    v-model="user_add.class"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">邮箱</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入邮箱"
                    v-model="user_add.email"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色</span>
          </p>
          <el-select class="select_box"
                     v-model="user_add.role"
                     placeholder="请选择角色">
            <el-option v-for="item in user_add.role_list"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
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
               :visible.sync="user_state.edit">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑用户</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">用户名</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入用户名"
                    v-model="user_edit.name"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">部门</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入部门"
                    v-model="user_edit.class"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">邮箱</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入邮箱"
                    v-model="user_edit.email"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色</span>
          </p>
          <el-select class="select_box"
                     v-model="user_edit.role"
                     placeholder="请选择角色">
            <el-option v-for="item in user_edit.role_list"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
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
  name: "user_management",
  data () {
    return {
      user_data: {},
      user_state: {
        add: false,
        edit: false
      },
      user_add: {
        username: "",
        password: "",
        class: "",
        email: "",
        role: "",
        role_list: []
      },
      user_edit: {
        name: "",
        class: "",
        email: "",
        role: "",
        role_list: [
          {
            name: "admin"
          },
          {
            name: "user"
          }
        ]
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
    this.role_list();
  },

  methods: {
    // 获取用户列表
    get_data () {
      this.$axios.get('/api/yiiapi/user/page', {
        params: {
          page: 1,
          rows: 10,
        }
      })
        .then(response => {
          console.log(response);
          this.user_data = response.data
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 获取角色列表
    role_list () {
      this.$axios.get('/api/yiiapi/user/role-list')
        .then(response => {
          console.log(response);
          this.user_add.role_list = response.data
        })
        .catch(error => {
          console.log(error);
        })
    },

    // 添加用户
    add_user () {
      this.$axios.post('/api/yiiapi/user-add', {
        data: {
          username: this.user_add.username,
          password: this.user_add.password,
          role: $scope.selectValue,
          allow_ip: $scope.newUser.allow_ip,
          page: $scope.pages.pageNow
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },
    add_box () {
      this.user_state.add = true;
    },
    edit_box () {
      this.user_state.edit = true;
    },
    alert_detail () { },
    handleSelectionChange () { },
    handleSizeChange () { },
    handleCurrentChange () { },
    closed_add_box () {
      this.user_state.add = false;
    },
    closed_edit_box () {
      this.user_state.edit = false;
    }
  }
};
</script>

<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#user_management {
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
#user_management {
  padding-right: 24px;
  .user_title {
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
  .user_table {
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

