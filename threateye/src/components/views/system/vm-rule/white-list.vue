<template>
  <div id="white_list">
    <div class="btn_box">
      <el-button class="btn_i"
                 @click="open_add_box">添加白名单</el-button>
      <el-button class="btn_i">下载模板</el-button>
      <el-button class="btn_o">批量导入</el-button>
      <el-button class="btn_o">删除</el-button>
    </div>
    <div class="user_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="white_list.data"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="alert_detail">
        <el-table-column label="全选"
                         prop=""
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
        <el-table-column prop="indication"
                         label="指标"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="type"
                         label="类型"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="time"
                         label='创建时间'
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="white_list.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="white_list.count">
      </el-pagination>
    </div>
    <!-- 添加白名单 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="white_add.add">
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
            <span class="title">指标</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入指标"
                    v-model="white_add.indication"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">类型</span>
          </p>
          <el-select class="select_box"
                     v-model="white_add.type"
                     placeholder="请选择类型">
            <el-option v-for="item in white_add.type_list"
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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "white_list",
  data () {
    return {
      white_list: {
        data: [{
          index: '01',
          indication: '**745554354309***',
          type: 'URL',
          time: '2019.11.03 15: 24: 05',
        }],
        pageNow: 1,
        count: 1002,
      },
      white_add: {
        add: false,
        type_list: [],
        indication: '',
        type: ''
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
    open_add_box () {
      this.white_add.add = true;
    },
    closed_add_box () {
      this.white_add.add = false;
    },
    uploadSuccess () {
      console.log("1111");
      this.monitor_state.import_loading = false;
    },
    handleSelectionChange () {
    },
    alert_detail () {

    },
    handleSizeChange () {

    },
    handleCurrentChange () {

    }
  }
};
</script>

<style scoped lang="less">
#white_list {
  padding-right: 24px;
  .btn_box {
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
      border: 1px solid #0070ff;
      color: #0070ff;
    }
    margin-bottom: 24px;
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#white_list {
  .add_box {
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
      }
      .btn_box {
        margin: 0;
        margin-top: 24px;
      }
    }
  }
}
</style>
