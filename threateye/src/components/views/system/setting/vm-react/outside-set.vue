
<template>
  <div id="outside_set">
    <div class="set_top">
      <p>
        <span>是否启用:</span>
        <el-switch v-model="outside_set.switch">
        </el-switch>
      </p>
      <p class="top_tips">本功能实现和第三方设备如防火墙的联动，第三方设备通过URL地址获取恶意IP列表以及恶意域名列表做告警提示或者拦截。</p>
      <div class="malice_list">
        <div class="list_left">
          <p class="item_title">恶意IP列表 URL：</p>
          <p v-for="item in outside_set.ip_list"
             class="item_list">{{item.name}}</p>
        </div>
        <div class="list_right">
          <p class="item_title">恶意IP列表 URL：</p>
          <p v-for="item in outside_set.url_list"
             class="item_list">{{item.name}}</p>
        </div>
      </div>
    </div>
    <el-button class="btn_i"
               @click="add_box">创建账号</el-button>
    <div class="outside_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="outside_set.data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="alert_detail">
        <el-table-column prop="user"
                         label="用户名"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="pswd"
                         label="密码"
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
                     :current-page="outside_set.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="outside_set.count">
      </el-pagination>
    </div>
    <!-- 创建账号 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="outside_pop.add.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">创建用户</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">用户名</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入用户名"
                    v-model="outside_pop.add.user"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">密码</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入密码"
                    v-model="outside_pop.add.pswd"
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
    <!-- 编辑账号 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="outside_pop.edit.show">
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
                    v-model="outside_pop.edit.user"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">密码</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入密码"
                    v-model="outside_pop.edit.pswd"
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
  name: "outside_set",
  data () {
    return {
      outside_set: {
        switch: true,
        ip_list: [{ name: 'https://1.2.3.4/malicus_192.168.1.1.68' }, { name: 'https://1.2.3.4/malicious_192.168.1.1.68' }],
        url_list: [{ name: 'https://1.2.3.4/malicious_threateye.hoohoolab.com/#/app/set_black_list/threateye.hoohoolab.com/#/app/set_black_list' }],
        data: [{
          user: 'admin',
          pswd: '000WESA1111RDCF00000',
        }],
        pageNow: 1,
        count: 1002,
      },
      outside_pop: {
        add: {
          show: false,
          user: '',
          pswd: '',
        },
        edit: {
          show: false,
          user: '',
          pswd: '',
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
    handleSelectionChange () { },
    handleSizeChange () { },
    handleCurrentChange () { },
    alert_detail () { },
    add_box () {
      this.outside_pop.add.show = true
    },
    closed_add_box () {
      this.outside_pop.add.show = false
    },
    edit_box () {
      this.outside_pop.edit.show = true
    },
    closed_edit_box () {
      this.outside_pop.edit.show = false

    },
  }
};
</script>

<style scoped lang="less">
#outside_set {
  text-align: left;
  .set_top {
    margin-top: 12px;
    border-bottom: 1px solid #ececec;
    .top_tips {
      margin: 17px 0 24px 0;
      font-size: 14px;
      color: #999999;
    }
    .malice_list {
      display: flex;
      margin-bottom: 36px;
      .item_title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #ececec;
        padding: 0 16px;
      }
      .item_list {
        padding: 0 16px;
      }
      .list_left {
        width: 320px;
        margin-right: 36px;
        background: #f8f8f8;
        word-break: break-all;
        white-space: pre-wrap;
        word-wrap: break-word;
        padding-bottom: 16px;
      }
      .list_right {
        width: 720px;
        padding-bottom: 16px;
        background: #f8f8f8;
        word-break: break-all;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
  .outside_table {
    padding-right: 24px;
  }
  .btn_i {
    width: 136px;
    height: 42px;
    padding: 0;
    background: #0070ff;
    color: #fff;
    margin: 24px 0;
  }
  .btn_edit {
    padding: 0;
    background: #5389e0;
    border-radius: 2px;
    width: 72px;
    height: 30px;
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
#outside_set {
  .add_box {
    .el-dialog {
      width: 440px;
      .content_item {
        margin-top: 24px;
      }
      .btn_box {
        margin-top: 24px;
      }
    }
  }
}
</style>