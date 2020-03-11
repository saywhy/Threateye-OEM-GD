<template>
  <div id="invest_ioc"
       class="common_invest"
       v-loading.fullscreen.lock="ioc_data.loading">
    <div class="invest_box">
      <div class="invest_top">
        <div class="invest_upload">
          <el-upload class="upload-demo"
                     :before-upload="onBeforeUpload"
                     :on-change="onChange"
                     :on-success='onsuccess'
                     :on-error='onerror'
                     accept=".txt,.ioc"
                     drag
                     action="/yiiapi/investigate/upload-file"
                     multiple>
            <img class="upload_img"
                 src="@/assets/images/setting/upload_s.png"
                 alt="">
            <div class="el-upload__text">
              <em>点击上传</em>
            </div>
            <div slot="tip"
                 class="el-upload__tip">
              <span>请选择 .txt
                <span @click="download_template"
                      class="common_color">(下载模板)</span> 或者 .ioc的格式文件搜索
              </span>
            </div>
          </el-upload>
        </div>
        <div>
          <el-button class="btn_down"
                     @click="download_list">下载</el-button>
          <el-button class="btn_del"
                     @click="del_list">删除</el-button>
        </div>

      </div>
      <div class="invest_bom">
        <el-table ref="multipleTable"
                  class="reset_table"
                  align="center"
                  :data="ioc_list.data"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
          <el-table-column label="全选"
                           prop="type"
                           width="50">
          </el-table-column>
          <el-table-column type="selection"
                           :selectable="checkSelectable"
                           width="50">
          </el-table-column>
          <el-table-column label="序号"
                           width="60">
            <template slot-scope="scope">
              {{(ioc_data.page-1)*(ioc_data.rows) + scope.row.index_cn}}
            </template>
          </el-table-column>
          <el-table-column prop="upload_file_name"
                           label="文件名"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="进度"
                           width="100"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.create_percent+'%' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态"
                           width="100"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.create_status ==0?"失败":'成功' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time"
                           width="180"
                           label="创建时间"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination_box"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="ioc_list.pageNow"
                       :page-sizes="[10,50,100]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next"
                       :total="ioc_list.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import VmEmergePicker from "@/components/common/vm-emerge-picker";
export default {
  name: "invest_ioc",
  components: {
    VmEmergePicker
  },
  data () {
    return {
      select_list: [],
      ioc_list: {
        count: 0,
        pageNow: 1,
      },
      ioc_data: {
        page: 1,
        rows: 10,
        loading: false
      }
    };
  },
  mounted () {
    this.get_data()
  },
  methods: {
    // 获取列表
    get_data () {
      this.ioc_data.loading = true
      this.$axios.get('/yiiapi/investigate/ioc-scanning-list', {
        params: {
          page: this.ioc_data.page,
          rows: this.ioc_data.rows,
        }
      })
        .then(response => {
          this.ioc_data.loading = false
          let { status, data } = response.data;
          console.log(data);
          this.ioc_list = data
          this.ioc_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
          console.log(status);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 上传
    onChange (params) {
      console.log(params);
      if (params.status == 'fail') {
        this.$message(
          {
            message: '上传失败',
            type: 'error',
          }
        );
      }
    },
    onsuccess (params) {
      console.log(params);
      if (params.status == 1) {
        this.$message(
          {
            message: params.msg,
            type: 'error',
          }
        );
      } else if (params.status == 0) {
        this.get_data();
        this.$message(
          {
            message: '上传成功',
            type: 'success',
          }
        );
      }
    },
    onerror (params) {
      if (params.status == 'fail') {
        this.$message(
          {
            message: '上传失败',
            type: 'error',
          }
        );
      }
    },
    onBeforeUpload () {
    },
    // 全选择
    handleSelectionChange (val) {
      this.select_list = val
    },
    // 分页
    handleSizeChange (val) {
      this.ioc_data.rows = val;
      this.ioc_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.ioc_data.page = val
      this.get_data();
    },
    // 下载模板
    download_template () {
      console.log('1231');
      var url1 = "/yiiapi/investigate/download-ioc-template";
      window.location.href = url1;
    },
    // 禁止选中的项目
    checkSelectable (row) {
      return row.create_status == "1"
    },
    // 下载列表
    download_list () {
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
      var id_list = []
      this.select_list.forEach(element => {
        id_list.push(element.id)
      });
      console.log(id_list);
      var id_list_str = JSON.stringify(id_list)
      var url1 = "/yiiapi/investigate/ioc-scanning-download?id=" + id_list_str;
      window.location.href = url1;

    },
    // 删除列表
    del_list () {
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
        this.$axios.delete('/yiiapi/investigate/ioc-scanning-del', {
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
    // 重置
    reset () {
      this.flow_search.direction = '0'
      this.flow_search.host_ip = ''
    },
  },
}
</script>
<style scoped lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
#invest_ioc {
  .invest_upload {
    overflow: auto;
    margin-bottom: 24px;
    /deep/ .upload-demo {
      // float: left;
      margin-bottom: 10px;
      .el-upload-list__item:focus {
        outline: 0;
      }
      .el-upload {
        float: left;
        .el-upload-dragger {
          width: 164px;
          height: 88px;
          background: #f8f8f8;
          border: 0;
          .upload_img {
            margin-top: 20px;
            width: 27px;
          }
        }
      }
      .el-upload__tip {
        float: left;
        width: 164px;
        height: 88px;
        margin: 0 10px;
        font-size: 14px;
        color: #999999;
        .common_color {
          color: #0070ff;
          cursor: pointer;
        }
      }
      .el-upload-list {
        float: left;
        .el-upload-list__item:first-child {
          margin-top: 0;
        }
      }
    }
  }
  .btn_down {
    padding: 0;
    width: 148px;
    height: 42px;
    background: #0070ff;
    color: #fff;
  }
  .btn_del {
    padding: 0;
    width: 148px;
    height: 42px;
    background: #fff;
    border-color: #0070ff;
    color: #0070ff;
  }
}
</style>


