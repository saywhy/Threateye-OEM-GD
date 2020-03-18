<template>
  <div id="sandbox">
    <div class="container">
      <div class="invest_box">
        <el-tabs v-model="activeName"
                 class="reset_tab">
          <el-tab-pane label="沙箱"
                       class="tabs-item"
                       name="first">
            <div class="top">
              <uploader :options="options"
                        :autoStart='false'
                        :fileStatusText='fileStatusText'
                        @file-added="onFileAdded"
                        @file-success="onFileSuccess"
                        @file-progress="onFileProgress"
                        @file-error="onFileError"
                        class="uploader-example">
                <uploader-unsupport></uploader-unsupport>
                <img class="upload_img"
                     src="@/assets/images/setting/upload_s.png"
                     alt="">
                <uploader-drop>
                  <uploader-btn class="select_btn">点击上传</uploader-btn>
                  <span>请选择需要扫描上传的文件(最大100M)</span>
                </uploader-drop>
                <uploader-list></uploader-list>
              </uploader>
            </div>
            <div class="sandbox_table">
              <el-table ref="multipleTable"
                        class="reset_table"
                        align="center"
                        :data="sandbox_list.data"
                        tooltip-effect="dark"
                        style="width: 100%">
                <el-table-column label="结果"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span :class="scope.row.result==0?'color_red':''">{{scope.row.result_cn}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{scope.row.created_at*1000 | formatDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="扫描状态"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{scope.row.status=='1'?'扫描中':"扫描结束"}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="upload_name"
                                 label='文件名'
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column label='扫描详情'>
                  <template slot-scope="scope">
                    <img src="@/assets/images/common/download.png"
                         class="img_icon"
                         v-if="scope.row.status!=1"
                         alt=""
                         @click.stop='download(scope.row)'>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <img src="@/assets/images/common/delete.png"
                         class="img_icon"
                         v-if="scope.row.status!=1"
                         alt=""
                         @click.stop='del_box(scope.row)'>
                  </template>
                </el-table-column>

              </el-table>
              <el-pagination class="pagination_box"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="sandbox_list.pageNow"
                             :page-sizes="[10,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="sandbox_list.count">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: "sandbox",
  data () {
    return {
      activeName: 'first',
      options: {
        target: '/yiiapi/sandbox/upload',
        chunkSize: '10048000',   //分块大小
        testChunks: false,     //是否开启服务器分片校验
        parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
          return parsedTimeRemaining
            .replace(/\syears?/, '年')
            .replace(/\days?/, '天')
            .replace(/\shours?/, '小时')
            .replace(/\sminutes?/, '分钟')
            .replace(/\sseconds?/, '秒')
        }
      },
      fileStatusText: {
        success: '成功',
        error: '错误',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待'
      },
      sandbox_list: {
      },
      sandbox_data: {
        page: 1,
        rows: 10
      }
    };
  },
  mounted () {
    this.get_data();
  },
  methods: {
    // 上传
    onFileAdded (file) {
      console.log(file);
      file.pause()
      if (file.size > 100 * 1024 * 1024) {
        this.$message({
          message: '上传文件大小不能超过 100MB!',
          type: 'warning'
        });
        setTimeout(() => {
          file.cancel()
        }, 100)
      } else {
        setTimeout(() => {
          file.resume();
        }, 100)
      }
    },
    onFileSuccess (rootFile, file, response, chunk) {
      if (JSON.parse(response).status == 0) {
        console.log(file);
        this.$axios.get('/yiiapi/sandbox/move-file', {
          params: {
            upload_name: file.name,
          }
        })
          .then(response => {
            let { status, data } = response.data;
            if (status == 0) {
              file.cancel()
              this.get_data();
              this.$message(
                {
                  message: '上传成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: response.data.msg,
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })

      }
      console.log(chunk);
    },
    onFileProgress (file) { },
    onFileError () { },
    // 获取列表
    get_data () {
      this.$axios.get('/yiiapi/sandbox/list', {
        params: {
          page: this.sandbox_data.page,
          rows: this.sandbox_data.rows,
        }
      })
        .then(response => {
          let { status, data } = response.data;
          if (status == 0) {
            this.sandbox_list = data
            this.sandbox_list.data.forEach((item, index) => {
              switch (item.result) {
                case '0':
                  item.result_cn = '发现威胁'
                  break;
                case '1':
                  item.result_cn = '未发现威胁'
                  break;
                case '2':
                  item.result_cn = ''
                  break;
                default:
                  break;
              }
            });

          }
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 下载
    download (item) {
      console.log(item);
      var url1 = '/yiiapi/sandbox/download-file?id=' + item.id;
      window.location.href = url1;
    },
    // 删除
    del_box (item) {
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.delete('/yiiapi/sandbox/del', {
          data: {
            id: item.id
          }
        })
          .then(response => {
            let { status, data } = response.data;
            if (status == 0) {
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
    // 分页
    handleSizeChange (val) {
      this.sandbox_data.rows = val;
      this.sandbox_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.sandbox_data.page = val
      this.get_data();
    },
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped lang="less">
#sandbox {
  padding: 16px 0 16px 16px;
  .container {
    padding: 20px 36px 20px 20px;
    background: #fff;
    border-radius: 2px;
    .top {
      background: #f8f8f8;
      // height: 160px;
      margin-bottom: 16px;
      padding: 10px 500px;
      /deep/ .uploader-example {
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        .uploader-drop {
          border: 0;
          background: none;
        }
        .uploader-list {
          overflow: auto;
          .uploader-file {
            height: 30px;
            line-height: 30px;
            border: 0;
            .uploader-file-icon {
              display: none;
            }
            .uploader-file-actions {
              display: none;
            }
          }
        }
      }

      .select_btn {
        border: 0;
      }
      .uploader-btn {
        border: 0;
        background: none;
        color: #0070ff;
        cursor: pointer;
      }
      .uploader-btn:hover {
        background: none;
        color: #0070ff;
        cursor: pointer;
      }
      .upload_img {
        width: 72px;
        height: 72px;
        margin-top: 35px;
      }
    }
    .color_red {
      color: #ff5f5c;
    }
    .img_icon {
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>

