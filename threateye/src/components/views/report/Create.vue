<template>
  <div id="report_create">
    <div class="r_top">
      <div class="r_content_top">
        <h3 class="title">报表生成</h3>
      </div>
      <el-form class="r_content_main">
        <el-row type="flex"
                class="r_main_list">
          <el-col :span="3">
            <span class="title">时间范围</span>
          </el-col>
          <el-col :span="21">
            <div class="r_time">
              <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"
                class="r_main_list">
          <el-col :span="3">
            <span class="title">发送格式</span>
          </el-col>
          <el-col :span="21">
            <div class="r_radio">
              <el-radio v-model="report.type"
                        label="doc"
                        class="r_radio_item">Word</el-radio>
              <el-radio v-model="report.type"
                        label="csv"
                        class="r_radio_item">Execl</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"
                class="r_main_list r_special_list">
          <el-col :span="3">
            <span class="title">报表名称</span>
          </el-col>
          <el-col :span="21">
            <el-input class="report-input"
                      placeholder="请输入报表名称"
                      v-model="report.name"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <div class="r_btn_group">
            <el-button class="b_btn b_ok"
                       @click="create">确定</el-button>
            <el-button class="b_btn b_cancel">取消</el-button>
          </div>
        </el-row>
      </el-form>
    </div>
    <div class="r_middle">
      <div class="r_btn_middle_group">
        <el-button class="b_btn b_download">下载</el-button>
        <el-button class="b_btn b_delete">删除</el-button>
      </div>
    </div>
    <div class="r_bottom">
      <el-row class="common-table-pattern">
        <el-col :span="24">
          <el-table class="common-table"
                    ref="multipleTable"
                    :data="report_lsit.data"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange">
            <el-table-column label="全选"
                             width="40"></el-table-column>
            <el-table-column align='left'
                             type="selection"
                             width="40"></el-table-column>
            <el-table-column label="序号"
                             width="80">
              <template slot-scope="scope">
                {{(report_data.page-1)*(report_data.rows) + scope.row.index_cn}}
              </template>
            </el-table-column>
            <el-table-column prop="create_time"
                             label="日期"></el-table-column>
            <el-table-column prop="report_name"
                             label="名称"></el-table-column>
            <el-table-column label='时间范围'>
              <template slot-scope="scope">
                <span>{{scope.row.stime}}</span>
                <span>至</span>
                <span>{{scope.row.etime}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="report_type"
                             label="格式"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24"
                class="e-pagination">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="report_lsit.pageNow"
                         :page-sizes="[10,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="report_lsit.count">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import VmEmergePicker from "@/components/common/vm-emerge-picker";
export default {
  name: "report_create",
  data () {
    return {
      report: {
        name: '',
        type: 'doc',
        start_time: '',
        end_time: '',
      },
      report_data: {
        page: 1,
        rows: 10
      },
      report_lsit: {},
    }
  },
  components: { VmEmergePicker },
  mounted () {
    this.get_data()
  },
  methods: {
    // 生成报表
    create () {
      console.log(this.report);
      if (this.report.name == '') {
        this.$message(
          {
            message: '请输入报表名称',
            type: 'error',
          }
        );
        return false
      }
      if (this.report.start_time == '' || this.report.end_time == '') {
        this.$message(
          {
            message: '请选择时间范围',
            type: 'error',
          }
        );
        return false
      }
      if (this.report.type == 'doc') {
        this.$axios.get('/api/yiiapi/report/create-echarts-img', {
          params: {
            stime: this.report.start_time,
            etime: this.report.end_time,
            report_name: this.report.name,
            report_type: 'doc',
          }
        })
          .then(response => {
            let { status, data } = response.data;
          })
          .catch(error => {
            console.log(error);
          })
      }
      if (this.report.type == 'csv') {
        this.$axios.post('/api/yiiapi/report/create-report', {
          stime: this.report.start_time / 1000,
          etime: this.report.end_time / 1000,
          report_name: this.report.name,
          report_type: 'csv',
        })
          .then(response => {
            let { status, data } = response.data;
            if (data.status == 0) {
              this.$message(
                {
                  message: '报表生成成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: data.msg,
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })
      }


    },
    // 获取列表
    get_data () {
      this.$axios.get('/api/yiiapi/report/list', {
        params: {
          page: this.report_data.page,
          rows: this.report_data.rows,
        }
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(status);
          this.report_lsit = data
          this.report_lsit.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    changeTime (data) {
      console.log(data);
      this.report.start_time = data[0].valueOf()
      this.report.end_time = data[0].valueOf()
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      // this.multipleSelection = val;
    },
    // 分页
    handleSizeChange (val) {
      this.report_data.rows = val;
      this.get_data();
    },
    handleCurrentChange (val) {
      this.report_data.page = val
      this.get_data();
    },
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/css/less/report_less/rewrite_radio.less';
@import '../../../assets/css/less/common-table-pattern.less';
#report_create {
  padding: 24px;
  .r_top {
    background: #fff;
    font-family: PingFangSC-Medium;
    border-bottom: 1px solid #ececec;

    .r_content_top {
      height: 80px;
      line-height: 80px;
      text-align: left;
      border-bottom: 1px solid #ececec;
      .title {
        font-size: 18px;
        color: #333333;
        font-weight: 600;
        padding: 0 24px;
      }
    }
    .r_content_main {
      padding: 0 24px;
      text-align: left;
      .r_main_list {
        height: 62px;
        line-height: 60px;
        border-bottom: 1px solid #ececec;
        .title {
          font-size: 14px;
          color: #333;
          font-weight: 600;
        }
        .r_time {
          line-height: 58px;
        }
        .r_radio {
          .r_radio_item {
            font-size: 14px;
            color: #333;
          }
        }
        &.r_special_list {
          border-width: 0;
          height: auto;
          min-height: 164px;
          position: relative;
          .report-input {
            width: 240px;
          }
          .r_btn_group {
            position: absolute;
            right: 0;
            bottom: 24px;
            text-align: right;
            height: 42px;
            z-index: 999;
            font-size: 0;
            /deep/ .b_btn {
              width: 136px;
              height: 42px;
              font-size: 16px;
              vertical-align: text-bottom;
              border: 1px solid #0070ff;
              &.b_ok {
                background: #0070ff;
                color: #fff;
              }
              &.b_cancel {
                background: #fff;
                color: #0070ff;
                margin-left: 24px;
              }
            }
          }
        }
      }
    }
  }
  .r_middle {
    height: 90px;
    width: 100%;
    background: #fff;
    position: relative;
    text-align: left;
    padding: 0 24px;
    .r_btn_middle_group {
      position: absolute;
      top: 24px;
      height: 42px;
      z-index: 999;
      font-size: 0;
      .b_btn {
        width: 148px;
        height: 42px;
        font-size: 16px;
        vertical-align: text-bottom;
        border: 1px solid #0070ff;
        &.b_download {
          background: #0070ff;
          color: #fff;
        }
        &.b_delete {
          background: #fff;
          color: #0070ff;
          margin-left: 8px;
        }
      }
    }
  }
  .r_bottom {
    background: #fff;
    padding: 0 24px;
    min-height: 441px;
  }
}
</style>
