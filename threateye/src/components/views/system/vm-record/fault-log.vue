<template>
  <div id="fault_log">
    <div class="fault_top">
      <el-button class="btn_i"
                 @click="faultlog_testing">故障检测</el-button>
      <el-button class="btn_i"
                 @click="faultlog_download">下载</el-button>
      <el-button class="btn_o"
                 @click="faultlog_del">删除</el-button>
    </div>
    <div class="fault_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                :data="fault_list.data"
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
        <el-table-column label="时间"
                         width="150"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.time*1000 |formatDate }}</template>
        </el-table-column>
        <el-table-column prop="file"
                         label="日志文件"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="fault_list.pageNow"
                     :page-sizes="[10,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="fault_list.count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: "fault_log",
  data () {
    return {
      fault_list: {},
      fault_data: {
        page: 1,
        rows: 10
      },
      select_list: []
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data()
  },

  methods: {
    // 获取列表
    get_data () {
      this.$axios.get('/yiiapi/faultlog/list', {
        params: {
          page: this.fault_data.page,
          rows: this.fault_data.rows
        }
      })
        .then(response => {
          console.log(response);
          this.fault_list = response.data.data
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 故障检测
    faultlog_testing () {
      this.$axios.get('/yiiapi/faultlog/testing')
        .then(response => {
          console.log(response);
          if (response.data.status == 0) {
            this.get_data()
            this.$message({
              type: 'success',
              message: '检测成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 下载
    faultlog_download () {
      console.log(this.select_list);
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请先选中需下载的信息',
            type: 'error',
          }
        );
        return false
      }
      this.$confirm('此操作下载信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id_list = []
        this.select_list.forEach(element => {
          id_list.push(element.id)
        });
        console.log(id_list);
        var id_list_str = JSON.stringify(id_list)
        var url2 = "/yiiapi/faultlog/download?id=" + id_list_str;
        window.location.href = url2;
        this.select_list = []
      }).catch(() => {
        this.select_list = []
        this.$message({
          type: 'info',
          message: '已取消下载'
        });
      });
    },
    // 删除
    faultlog_del () {
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请先选中需删除的信息',
            type: 'error',
          }
        );
        return false
      }
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id_list = []
        this.select_list.forEach(element => {
          id_list.push(element.id)
        });
        console.log(id_list);
        this.$axios.delete('/yiiapi/faultlog/del', {
          data: {
            id: id_list
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '删除成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '删除失败',
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // / faultlog / list
    // 分页
    handleSizeChange (val) {
      this.fault_data.rows = val;
         this.fault_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.fault_data.page = val
      this.get_data();
    },
    // 全选择
    handleSelectionChange (val) {
      this.select_list = val
    },
    add_box () {
    },
    edit_box () {
    },
    alert_detail () { },
    closed_add_box () {
    },
    closed_edit_box () {
    }
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
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