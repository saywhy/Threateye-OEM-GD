<template>
  <div id="system_control_licence"
       class="container">
    <div class="content_box">
      <p class="title">系统版本号：V1.0</p>
      <el-button class="btn_i"
                 @click="online_active">在线激活</el-button>
      <el-button class="btn_o">导入许可证</el-button>
      <div class="licence_table">
        <el-table ref="multipleTable"
                  class="reset_table"
                  align="center"
                  :data="licence.data"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  @row-click="alert_detail">
          <el-table-column prop="index"
                           label="序号"
                           width="50"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="CDK"
                           label="序列号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="organize"
                           label="受保护机构"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="start_time"
                           label='授权时间'
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="end_time"
                           label='授权到期时间'
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="thraet"
                           label='威胁情报'
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="status"
                           label='许可证状态'
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination_box"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="licence.pageNow"
                       :page-sizes="[10,50,100]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next"
                       :total="licence.count">
        </el-pagination>

      </div>
      <!-- 添加licence -->
      <el-dialog class="add_box pop_box"
                 :visible.sync="licence_pop.add">
        <img src="@/assets/images/emerge/closed.png"
             @click="closed_add_box"
             class="closed_img"
             alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">添加白名单</span>
        </div>
        <div class="content">
          <div class="content_item">
            <p>
              <span class="title">序列号</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入序列号"
                      v-model="licence_pop.cdk"
                      clearable>
            </el-input>
          </div>
          <div class="content_item">
            <p>
              <span class="title">机器码：false</span>
            </p>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_add_box"
                     class="cancel_btn">取消</el-button>
          <el-button class="ok_btn">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "system_control_licence",
  data () {
    return {
      licence: {
        data: [{
          index: '01',
          CDK: 'W2X3V-9Q39V-CEXYF-DI7LS-B9QBM',
          organize: '核信息院',
          start_time: '2017-11-30 00:00:00',
          end_time: '2024-03-01 00:00:00',
          thraet: '基础版',
          status: '已授权',
        }],
        pageNow: 1,
        count: 1002,
      },
      licence_pop: {
        add: false,
        cdk: ""
      }
    };
  },
  methods: {
    handleSelectionChange () {

    },
    handleSizeChange () {

    },
    handleCurrentChange () {

    },
    alert_detail () {

    },
    online_active () {
      this.licence_pop.add = true;
    },
    closed_add_box () {
      this.licence_pop.add = false;
    }
  }
}
</script>
<style scoped lang='less'>
@import '../../../../assets/css/less/system/setting/common_box.less';
#system_control_licence {
  .content_box {
    padding-right: 24px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      margin-bottom: 24px;
    }
    .btn_i {
      width: 148px;
      height: 42px;
      background: #0070ff;
      color: #fff;
    }
    .btn_o {
      width: 148px;
      height: 42px;
      background: #fff;
      border-color: #0070ff;
      color: #0070ff;
    }
    .licence_table {
      margin-top: 24px;
    }
    .pagination_box {
      margin-top: 24px;
      text-align: center;
    }
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#system_control_licence {
  .el-dialog {
    width: 440px;
    .content_item {
      margin-top: 24px;
      .select_box {
        width: 100%;
        height: 38px;
        margin-top: 6px;
        .el-input__inner {
          background: #f8f8f8;
          border: 0;
        }
      }
      .title {
        font-size: 12px;
        color: #999999;
      }
    }
    .btn_box {
      margin-top: 24px;
    }
  }
}
</style>
